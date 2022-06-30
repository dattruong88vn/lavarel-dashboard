Reference link: https://www.devaradise.com/react-project-folder-structure

### Structure:

    - assets
        - images
        - scss
        - ...
    - env
        .dev.env
        .prod.env
    - config
    - components
        - MyButton
            index.js
            index.scss
        - MyDatePicker
            index.js
            index.scss
      - ...

    - modules
        - Module1
            index.js
            index.scss
        - Module2
            index.js
            index.scss

    - pages
        - Lead
            - context (specific)
            index.js
            index.scss
        - Deal
            - context (specific)
            index.js
            index.scss

    - themes
        - Theme1
            - Header
                index.js
                index.scss
            - Footer
                index.js
                index.scss
            index.js
            index.scss
        - Theme2
            - Header
                index.js
                index.scss
            - Footer
                index.js
                index.scss
            index.js
            index.scss

    - services
        DealService.js
        LeadService.js

    - context (general)
        ThemeContext.js

    - utils

### limit rendering

    - use hook: Memo to check the params changing to only render for that component

### Create new Folder

    - CamelCase

### Create new File

    - index.js
    - index.scss

### Create new constants

    - General constant
        - CAPITAL params
    - Specific page constants
        - CAPITAL params

### import file

    - use absolute path
    - import library at first (order by file name)
    - import page (order by file name)
    - import module (order by file name)
    - import component (order by file name)
    - import scss (order by file name)

### declare params

    - Hooks / Function
        - at first lines
    - Notice about affected params scope
    - Props in component
        - order alphabet
        - action alphabet
