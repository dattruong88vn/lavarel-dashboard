<?php
namespace App\Libraries;
 /**
 *	Usage
 *
 *		$cache = new Cache($config->config_values['cache']);
 *		$registry->oCache = $cache;	
 *	
 *	Add something to the cache (returns TRUE if successful)
 *
 *		$this->oCache->set( (string)$id, (mixed)$data, (array)$tags, (int)$lifetime )
 *
 *	Get something from the cache (returns FALSE if fail)
 *
 *		$this->oCache->get( (string)$id );
 *
 *	Delete an item
 *
 *		$this->oCache->delete( (string)$id );
 *
 *	Delete an item by tag
 *
 *		$this->oCache->delete_by_tag( (string|array)$tags );
 *
 *	Delete all
 *
 *		$this->oCache->delete_all();
 *
 *	Cleanup dead files (intended for use in cron/scheduled job)
 *
 *		$this->oCache->cleanup();
 *
 */

/*
 |--------------------------------------------------------------------------
| File and Directory Modes
|--------------------------------------------------------------------------
|
| These prefs are used when checking and setting modes when working
| with the file system.  The defaults are fine on servers with proper
| security, but you may wish (or even need) to change the values in
| certain environments (Apache running a separate process for each
        | user, PHP under CGI with Apache suEXEC, etc.).  Octal values should
| always be used to set the mode correctly.
|
*/
define('FILE_READ_MODE', 0644);
define('FILE_WRITE_MODE', 0666);
define('DIR_READ_MODE', 0755);
define('DIR_WRITE_MODE', 0777);

/*
 |--------------------------------------------------------------------------
| File Stream Modes
|--------------------------------------------------------------------------
|
| These modes are used when working with fopen()/popen()
|
*/

define('FOPEN_READ',                            'rb');
define('FOPEN_READ_WRITE',                      'r+b');
define('FOPEN_WRITE_CREATE_DESTRUCTIVE',        'wb'); // truncates existing file data, use with care
define('FOPEN_READ_WRITE_CREATE_DESTRUCTIVE',   'w+b'); // truncates existing file data, use with care
define('FOPEN_WRITE_CREATE',                    'ab');
define('FOPEN_READ_WRITE_CREATE',               'a+b');
define('FOPEN_WRITE_CREATE_STRICT',             'xb');
define('FOPEN_READ_WRITE_CREATE_STRICT',        'x+b');


class CacheManager {

	var $_life_time = 600;
	var $_cache_path;
	var $_cache_handler_filepath;

	function __construct($cfg)
	{
		$path = '';
		if (isset($cfg['cache_path']))
			$path = $cfg['cache_path'];
		
		$life_time = '';
		if (isset($cfg['life_time']))
			$life_time = $cfg['life_time'];
		
		$this->_default_life_time = ($life_time == '') ? 60 : intval($life_time);
		$this->_cache_path = ($path == '') ? __SITE_PATH.'/cache/' : $path;
		
		// Setup cache handler
		$this->_cache_handler_filepath = $this->_cache_path.'cache_handler';
	}
	
	public function set($id, $data, $tags = array(), $lifetime = NULL)
	{
		// Set lifetime
		if($lifetime === NULL)
		{
			$lifetime = $this->_life_time;
		}
		
		// Serialize the data for saving
		$data = serialize($data);
		
		// Make a unique MD5
		$file_name = md5(time().$id);
		$info['CACHE_NAME'] = $file_name;
		
		// The ID
		$info['CACHE_ID'] = $id;
		
		// Log the lifetime
		$info['CACHE_LIFETIME'] = $lifetime;
		
		// Log the time of creation
		$info['CACHE_BIRTH'] = time();
		
		// Log the tags
		$info['CACHE_TAGS'] = $tags;
				
		// Write the data to a cache file
		$cache_filepath = $this->_cache_path.$file_name;
		if(!write_file($cache_filepath, $data))
		{
            die("Unable to write cache file: ".$cache_filepath);
		}
		
		// Save to cache handler
		if($this->_save_to_handler($id, $info, $tags)){
			return TRUE;
		} else {
			return FALSE;
		}
	}
	
	public function get($id)
	{
		// Get cache handler
		$handler = $this->_read_handler();
		
		// Is the ID a registered cache file?
		if(!isset($handler['cache_files'][$id])){
			return NULL;
		}
		
		$file = $handler['cache_files'][$id];
		
		// Get the UID of the cache file
		$uid = $file['CACHE_NAME'];
				
		// Get the lifetime of the file
		$lifetime = $file['CACHE_LIFETIME'];
		
		// Get the time of creation
		$birth = $file['CACHE_BIRTH'];
		
		// Is the file dead? - I think this is faster than testing time() against filemtime()
		$time_since_creation = (time() - $birth);
		
		if($time_since_creation < $lifetime){
			
			// File is alive
			$cached_data = read_file($this->_cache_path.$uid);
			
			if(!$cached_data){
			
				// File doesn't exist or can't be read
				$handler = $this->_delete_file($id);
				$this->_save_handler($handler);
				return FALSE;
				
			} else {
				
				// Return the data
				return unserialize($cached_data);
			
			}
			
		} else {
		
			// File is dead so let's remove it's handle and the file
			$handler = $this->_delete_file($id);
			$this->_save_handler($handler);
			return NULL;
			
		}
	}
	
	public function delete_all()
	{
		// Get cache handler
		$handler = $this->_read_handler();
		
		// If there are handles
		if(count($handler['cache_files'] > 0)){
			
			// For each handle delete it's file
			foreach($handler['cache_files'] as $cf)
			{
				@unlink($this->_cache_path.$cf['CACHE_NAME']);
			}
			
			// Write a new cache handler
			$this->_new_handler();
		}
		
	}
	
	public function delete_by_tag($tags)
	{
		// Open and read the cache handler
		$handler = $this->_read_handler();
		
		// If there are handles
		if(count($handler['cache_files']) > 0){
		
			if(is_array($tags) && count($tags) > 0){
				
				// Foreach tag, see if it exists, if so delete all files and handles linked to it then delete the tag
				foreach($tags as $tag){
					
					if(isset($handler['cache_tags'][$tag])){
						
						foreach($handler['cache_tags'][$tag] as $id=>$file)
						{	
							$handler = $this->_delete_file($id);
							$this->_save_handler($handler);
						}
						
					}
					
				}
				
			} else {
				
				if(isset($handler['cache_tags'][$tags])){
					
					// See if it exists, if so delete all files and handles linked to it then delete the tag
					foreach($handler['cache_tags'][$tags] as $id=>$file)
					{
						$handler = $this->_delete_file($id);
						$this->_save_handler($handler);
					}

				}
				
			}
		
		}
	}
	
	public function delete($id)
	{
		// Get cache handler
		$handler = $this->_read_handler();
		
		// If the handle doesn't exist then just return NULL
		if(!isset($handler['cache_files'][$id])){
			return NULL;
		} else {
			// The handle does exist so delete the file and the handle
			$handler = $this->_delete_file($id);
			
			// Save the cache handler
			if($this->_save_handler($handler)){
				return TRUE;
			} else {
				return FALSE;
			}
		}
	}
	
	public function cleanup()
	{
		// Get cache handler
		$handler = $this->_read_handler();
		
		// For each file, check if it's dead, if so remove it.
		if(count($handler['cache_files'])){
		
			// This function rebuilds the tag array
			$new_tags = array();
			
			foreach($handler['cache_files'] as $file)
			{
				// Test age
				$time_since_creation = (time() - $file['CACHE_BIRTH']);
				if($time_since_creation > $file['CACHE_LIFETIME']){

					// Remove the physical file
					@unlink($this->_cache_path.$file['CACHE_ID']);
					
					// Remove the handle reference
					unset($handler['cache_files'][$file['CACHE_ID']]);
					
				} else {
				
					// File is still alive so let's add it's tags to the new tag array
					if(count($file['CACHE_TAGS']) > 0){
						foreach($file['CACHE_TAGS'] as $tag)
						{
							$new_tags[$tag][$file['CACHE_ID']] = $file['CACHE_NAME'];
						}
					}
									
				}
			}
			
			// Overwrite the old tags
			$handler['cache_tags'] = $new_tags;
			
			// Save
			$this->_save_handler($handler);
		
		}
	}
	
	private function _new_handler()
	{
		// Write a new cache handler
		$handler = serialize(array("cache_files"=>array(), "cache_tags"=>array()));
		if(!write_file($this->_cache_handler_filepath, $handler))
		{
//			log_message('error', "Unable to write a new handler: ".$this->_cache_handler_filepath);
			return FALSE;
		} else {
			return TRUE;
		}
	}
	
	private function _save_to_handler($id, $info, $tags)
	{
		// Open the cache handler
		$cache_handler = read_file($this->_cache_handler_filepath);
		
		// If we can't open the cache handler then write a new one
		if(!$cache_handler){
			$handler = serialize(array("cache_files"=>array(), "cache_tags"=>array()));
			if(!write_file($this->_cache_handler_filepath, $handler))
			{
//				log_message('error', "Unable to open cache handler or write a new handler: ".$this->_cache_handler_filepath);
                die("Unable to open cache handler or write a new handler: ".$this->_cache_handler_filepath);
			}
		}
		
		// Unserialize the cache handler data
		$handler = unserialize($cache_handler);
		
		// If the key already exists then overwrite it
		if(isset($handler["cache_files"][$id])){
		
			// Delete the old file and handle
			@unlink($this->_cache_path.$handler["cache_files"][$id]['CACHE_NAME']);
			unset($handler['cache_files'][$id]);
			
		}
		
		// Add the new handle
		$handler["cache_files"][$id] = $info;
		
		// Add the tags
		if(count($tags) > 0){
			foreach($tags as $tag)
			{
				if(isset($handler["cache_tags"][$tag])){
					$handler["cache_tags"][$tag][$id] = $info['CACHE_NAME'];
				} else {
					$handler["cache_tags"][$tag] = array($id=>$id);
				}
			}
		}
		
		if($this->_save_handler($handler)){
			return TRUE;
		} else {
			return FALSE;
		}
	}
	
	private function _save_handler($handler)
	{
// 		write_file($this->_cache_handler_filepath.'.txt', print_r($handler,TRUE));
		$handler = serialize($handler);
		if(!write_file($this->_cache_handler_filepath, $handler)){
//			log_message('error', "Unable to save the handler: ".$this->_cache_handler_filepath);
			return FALSE;
		} else {
			return TRUE;
		}
	}
	
	private function _read_handler()
	{
		$cache_handler = read_file($this->_cache_handler_filepath);
		if(!$cache_handler){
//			log_message('error', "Unable to open cache handler: ".$this->_cache_handler_filepath);
			return NULL;
		} else {
			$handler = unserialize($cache_handler);
			return $handler;
		}
	}
	
	private function _delete_file($id)
	{
		$handler = $this->_read_handler();
		
		// Remove the physical file
		@unlink($this->_cache_path.$handler['cache_files'][$id]['CACHE_NAME']);
		
		// Tags to remove links from
		$tags = $handler['cache_files'][$id]['CACHE_TAGS'];
		
		// Remove the handle reference
		unset($handler['cache_files'][$id]);
		
		if(count($tags) > 0){
			foreach($tags as $tag)
			{
				if(isset($handler['cache_tags'][$tag][$id])){
					unset($handler['cache_tags'][$tag][$id]);
					if(count($handler['cache_tags'][$tag]) == 0){
						unset($handler['cache_tags'][$tag]);
					}
				}
			}
		}
		
		return $handler;
	}
	

	// ------------------------------------------------------------------------

	/**
	 * Cache Info
	 *
	 * Not supported by file-based caching
	 *
	 * @param 	string	user/filehits
	 * @return 	mixed 	FALSE
	 */
	public function cache_info($type = NULL)
	{
		return get_dir_file_info($this->_cache_path);
	}

	// ------------------------------------------------------------------------

	/**
	 * Get Cache Metadata
	 *
	 * @param 	mixed		key to get cache metadata on
	 * @return 	mixed		FALSE on failure, array on success.
	 */
	public function get_metadata($id)
	{
		if ( ! file_exists($this->_cache_path.$id))
		{
			return FALSE;
		}

		$data = read_file($this->_cache_path.$id);
		$data = unserialize($data);

		if (is_array($data))
		{
			$mtime = filemtime($this->_cache_path.$id);

			if ( ! isset($data['ttl']))
			{
				return FALSE;
			}

			return array(
				'expire'	=> $mtime + $data['ttl'],
				'mtime'		=> $mtime
			);
		}

		return FALSE;
	}

	// ------------------------------------------------------------------------
	
	/**
	 * Is supported
	 *
	 * In the file driver, check to see that the cache directory is indeed writable
	 *
	 * @return boolean
	 */
	public function is_supported()
	{
		return is_really_writable($this->_cache_path);
	}
	
	// ------------------------------------------------------------------------
	
	
}

// ------------------------------------------------------------------------

/**
 * Read File
 *
 * Opens the file specfied in the path and returns it as a string.
 *
 * @access	public
 * @param	string	path to file
 * @return	string
 */
if ( ! function_exists('read_file'))
{
    function read_file($file)
    {
        if ( ! file_exists($file))
        {
            return FALSE;
        }

        if (function_exists('file_get_contents'))
        {
            return file_get_contents($file);
        }

        if ( ! $fp = @fopen($file, FOPEN_READ))
        {
            return FALSE;
        }

        flock($fp, LOCK_SH);

        $data = '';
        if (filesize($file) > 0)
        {
            $data =& fread($fp, filesize($file));
        }

        flock($fp, LOCK_UN);
        fclose($fp);

        return $data;
    }
}

// ------------------------------------------------------------------------

/**
 * Write File
 *
 * Writes data to the file specified in the path.
 * Creates a new file if non-existent.
 *
 * @access	public
 * @param	string	path to file
 * @param	string	file data
 * @return	bool
 */
if ( ! function_exists('write_file'))
{
    function write_file($path, $data, $mode = FOPEN_WRITE_CREATE_DESTRUCTIVE)
    {
        if ( ! $fp = @fopen($path, $mode))
        {
            return FALSE;
        }

        flock($fp, LOCK_EX);
        fwrite($fp, $data);
        flock($fp, LOCK_UN);
        fclose($fp);

        return TRUE;
    }
}

// ------------------------------------------------------------------------

/**
 * Delete Files
 *
 * Deletes all files contained in the supplied directory path.
 * Files must be writable or owned by the system in order to be deleted.
 * If the second parameter is set to TRUE, any directories contained
 * within the supplied base directory will be nuked as well.
 *
 * @access	public
 * @param	string	path to file
 * @param	bool	whether to delete any directories found in the path
 * @return	bool
 */
if ( ! function_exists('delete_files'))
{
    function delete_files($path, $del_dir = FALSE, $level = 0)
    {
        // Trim the trailing slash
        $path = rtrim($path, DIRECTORY_SEPARATOR);

        if ( ! $current_dir = @opendir($path))
        {
            return FALSE;
        }

        while (FALSE !== ($filename = @readdir($current_dir)))
        {
            if ($filename != "." and $filename != "..")
            {
                if (is_dir($path.DIRECTORY_SEPARATOR.$filename))
                {
                    // Ignore empty folders
                    if (substr($filename, 0, 1) != '.')
                    {
                        delete_files($path.DIRECTORY_SEPARATOR.$filename, $del_dir, $level + 1);
                    }
                }
                else
                {
                    unlink($path.DIRECTORY_SEPARATOR.$filename);
                }
            }
        }
        @closedir($current_dir);

        if ($del_dir == TRUE AND $level > 0)
        {
            return @rmdir($path);
        }

        return TRUE;
    }
}

// ------------------------------------------------------------------------

/**
 * Get Filenames
 *
 * Reads the specified directory and builds an array containing the filenames.
 * Any sub-folders contained within the specified path are read as well.
 *
 * @access	public
 * @param	string	path to source
 * @param	bool	whether to include the path as part of the filename
 * @param	bool	internal variable to determine recursion status - do not use in calls
 * @return	array
 */
if ( ! function_exists('get_filenames'))
{
    function get_filenames($source_dir, $include_path = FALSE, $_recursion = FALSE)
    {
        static $_filedata = array();

        if ($fp = @opendir($source_dir))
        {
            // reset the array and make sure $source_dir has a trailing slash on the initial call
            if ($_recursion === FALSE)
            {
                $_filedata = array();
                $source_dir = rtrim(realpath($source_dir), DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;
            }

            while (FALSE !== ($file = readdir($fp)))
            {
                if (@is_dir($source_dir.$file) && strncmp($file, '.', 1) !== 0)
                {
                    get_filenames($source_dir.$file.DIRECTORY_SEPARATOR, $include_path, TRUE);
                }
                elseif (strncmp($file, '.', 1) !== 0)
                {
                    $_filedata[] = ($include_path == TRUE) ? $source_dir.$file : $file;
                }
            }
            return $_filedata;
        }
        else
        {
            return FALSE;
        }
    }
}

// --------------------------------------------------------------------

/**
 * Get Directory File Information
 *
 * Reads the specified directory and builds an array containing the filenames,
 * filesize, dates, and permissions
 *
 * Any sub-folders contained within the specified path are read as well.
 *
 * @access	public
 * @param	string	path to source
 * @param	bool	Look only at the top level directory specified?
 * @param	bool	internal variable to determine recursion status - do not use in calls
 * @return	array
 */
if ( ! function_exists('get_dir_file_info'))
{
    function get_dir_file_info($source_dir, $top_level_only = TRUE, $_recursion = FALSE)
    {
        static $_filedata = array();
        $relative_path = $source_dir;

        if ($fp = @opendir($source_dir))
        {
            // reset the array and make sure $source_dir has a trailing slash on the initial call
            if ($_recursion === FALSE)
            {
                $_filedata = array();
                $source_dir = rtrim(realpath($source_dir), DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;
            }

            // foreach (scandir($source_dir, 1) as $file) // In addition to being PHP5+, scandir() is simply not as fast
            while (FALSE !== ($file = readdir($fp)))
            {
                if (@is_dir($source_dir.$file) AND strncmp($file, '.', 1) !== 0 AND $top_level_only === FALSE)
                {
                    get_dir_file_info($source_dir.$file.DIRECTORY_SEPARATOR, $top_level_only, TRUE);
                }
                elseif (strncmp($file, '.', 1) !== 0)
                {
                    $_filedata[$file] = get_file_info($source_dir.$file);
                    $_filedata[$file]['relative_path'] = $relative_path;
                }
            }

            return $_filedata;
        }
        else
        {
            return FALSE;
        }
    }
}

// --------------------------------------------------------------------

/**
 * Get File Info
 *
 * Given a file and path, returns the name, path, size, date modified
 * Second parameter allows you to explicitly declare what information you want returned
 * Options are: name, server_path, size, date, readable, writable, executable, fileperms
 * Returns FALSE if the file cannot be found.
 *
 * @access	public
 * @param	string	path to file
 * @param	mixed	array or comma separated string of information returned
 * @return	array
 */
if ( ! function_exists('get_file_info'))
{
    function get_file_info($file, $returned_values = array('name', 'server_path', 'size', 'date'))
    {

        if ( ! file_exists($file))
        {
            return FALSE;
        }

        if (is_string($returned_values))
        {
            $returned_values = explode(',', $returned_values);
        }

        foreach ($returned_values as $key)
        {
            switch ($key)
            {
                case 'name':
                    $fileinfo['name'] = substr(strrchr($file, DIRECTORY_SEPARATOR), 1);
                    break;
                case 'server_path':
                    $fileinfo['server_path'] = $file;
                    break;
                case 'size':
                    $fileinfo['size'] = filesize($file);
                    break;
                case 'date':
                    $fileinfo['date'] = filemtime($file);
                    break;
                case 'readable':
                    $fileinfo['readable'] = is_readable($file);
                    break;
                case 'writable':
                    // There are known problems using is_weritable on IIS.  It may not be reliable - consider fileperms()
                    $fileinfo['writable'] = is_writable($file);
                    break;
                case 'executable':
                    $fileinfo['executable'] = is_executable($file);
                    break;
                case 'fileperms':
                    $fileinfo['fileperms'] = fileperms($file);
                    break;
            }
        }

        return $fileinfo;
    }
}

// --------------------------------------------------------------------

/**
 * Symbolic Permissions
 *
 * Takes a numeric value representing a file's permissions and returns
 * standard symbolic notation representing that value
 *
 * @access	public
 * @param	int
 * @return	string
 */
if ( ! function_exists('symbolic_permissions'))
{
    function symbolic_permissions($perms)
    {
        if (($perms & 0xC000) == 0xC000)
        {
            $symbolic = 's'; // Socket
        }
        elseif (($perms & 0xA000) == 0xA000)
        {
            $symbolic = 'l'; // Symbolic Link
        }
        elseif (($perms & 0x8000) == 0x8000)
        {
            $symbolic = '-'; // Regular
        }
        elseif (($perms & 0x6000) == 0x6000)
        {
            $symbolic = 'b'; // Block special
        }
        elseif (($perms & 0x4000) == 0x4000)
        {
            $symbolic = 'd'; // Directory
        }
        elseif (($perms & 0x2000) == 0x2000)
        {
            $symbolic = 'c'; // Character special
        }
        elseif (($perms & 0x1000) == 0x1000)
        {
            $symbolic = 'p'; // FIFO pipe
        }
        else
        {
            $symbolic = 'u'; // Unknown
        }

        // Owner
        $symbolic .= (($perms & 0x0100) ? 'r' : '-');
        $symbolic .= (($perms & 0x0080) ? 'w' : '-');
        $symbolic .= (($perms & 0x0040) ? (($perms & 0x0800) ? 's' : 'x' ) : (($perms & 0x0800) ? 'S' : '-'));

        // Group
        $symbolic .= (($perms & 0x0020) ? 'r' : '-');
        $symbolic .= (($perms & 0x0010) ? 'w' : '-');
        $symbolic .= (($perms & 0x0008) ? (($perms & 0x0400) ? 's' : 'x' ) : (($perms & 0x0400) ? 'S' : '-'));

        // World
        $symbolic .= (($perms & 0x0004) ? 'r' : '-');
        $symbolic .= (($perms & 0x0002) ? 'w' : '-');
        $symbolic .= (($perms & 0x0001) ? (($perms & 0x0200) ? 't' : 'x' ) : (($perms & 0x0200) ? 'T' : '-'));

        return $symbolic;
    }
}

// --------------------------------------------------------------------

/**
 * Octal Permissions
 *
 * Takes a numeric value representing a file's permissions and returns
 * a three character string representing the file's octal permissions
 *
 * @access	public
 * @param	int
 * @return	string
 */
if ( ! function_exists('octal_permissions'))
{
    function octal_permissions($perms)
    {
        return substr(sprintf('%o', $perms), -3);
    }
}