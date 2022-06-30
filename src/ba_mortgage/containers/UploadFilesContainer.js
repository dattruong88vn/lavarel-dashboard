import React, { Component } from 'react';

import { connect } from 'react-redux';
// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Set initial files, type 'local' means this is a file
            // that has already been uploaded to the server (see docs)
            files: [{
                source: 'index.html'
            }],
            isDone:true
        };
        this.doneAction = this.doneAction.bind(this);
        this.handleInit = this.handleInit.bind(this);
    }

    doneAction(){
        // if(this.pond.getFiles().filter(x=>x.status !== 5).length !== 0){
        let _files = this.pond.getFiles();
        let filesUpdate = _files.map(function(file,index){
            return {link : file.serverId};
        });
        console.log(filesUpdate);
        let _info = {...this.props.info};
        let _indexObj = {...this.props.indexFiles}
        let _profileInfo = _info.profiles[_indexObj.indexProfile].childs[_indexObj.indexChild].profileInfos[_indexObj.indexPI];
        console.log(_profileInfo);
        _profileInfo.photoGcns = _profileInfo.photoGcns.concat(filesUpdate);
        this.props.dispatch({type:'FETCH_INFO_MORTGAGE',payload:_info});
        //serverId
        // console.log(this.pond.getFiles());
        showPropzyAlert("Thao tác thành công");
        $('#uploadFiles').modal("hide");
        // }else{
        //     showPropzyAlert("Tải file chưa hoàn tất");
        // }
        
    }

    handleInit() {
        console.log('FilePond instance has initialised', this.pond);
    }

    componentDidMount(){
    }

    render() {
        let _serverApi = `/user/upload-avatar-get-url`;
        return (
            <div id="uploadFiles" data-backdrop="static" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        <h4 className="modal-title">Tải ảnh lên</h4> 
                    </div>
                    <div className="modal-body">
                        <FilePond
                            ref={ref => this.pond = ref}
                            oninit={() => this.handleInit() }
                            onupdatefiles={(fileItems) => {
                                // console.log(fileItems)
                                // Set current file objects to this.state
                                // let currentFiles = [...this.props.files];
                                // console.log("curent files");
                                // console.log(currentFiles);
                                // let newFiles = fileItems.map(fileItem => fileItem.file);
                                
                                // console.log(newFiles);
                                this.props.dispatch({type:'SET_FILES',files:fileItems.map(fileItem => fileItem.file)})
                            }}
                            onaddfilestart={(file) => this.setState({
                                isDone: false
                            })}
                            onprocessfiles={(error, file) => this.setState({
                                isDone: true
                            })}
                            files={this.props.files}
                            allowMultiple={true}
                            server='/user/upload-mortgage-get-url'
                            labelIdle='Kéo và thả hoặc <span class="filepond--label-action">Tải lên</span> tệp của bạn'
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        {this.state.isDone && <button className="btn btn-primary" onClick={this.doneAction}>Hoàn thành</button>}
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    files : state.mortgageReducer.files,
    initLoadFiles : state.mortgageReducer.initLoadFiles,
    info : state.mortgageReducer.info,
    indexFiles : state.mortgageReducer.indexFiles
});
const UploadFilesContainer = connect(mapStateToProps,null)(Section);
export default UploadFilesContainer;