import React from "react";
import {connect} from "react-redux";
import { Textbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import "babel-polyfill";
import axios from "axios";

class FormUpload extends React.Component{
    constructor(props){
        super(props);
        this.state = {
                name:'',
                description:'',
                files:[],
                hasNameError: true,
                validate: false,
            };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        let newState = Object.assign({}, this.state, nextProps.dataPost);
        this.setState(newState) ;
        $('#photos-wrapper').imagesPosLib({
            urlUpload : baseUploadApiPublic + 'upload',
            source : 'props',
            gallery : 'photo',
            usePosEditor : false,
            list: nextProps.dataPost.files,
            useImageDefault : false
        })
        return true;
    }

    toggleValidating(validate) {
        this.setState({ validate });
    }

    async submit(e){
        e.preventDefault();
        this.toggleValidating(true);
        const {
            hasNameError
        } = this.state;
        if (!hasNameError) {
            let listFile = $('#photos-wrapper').getListPhotos();
            if(listFile.length > 0){
                this.state.files = listFile;
                this.setState(this.state);

                let response = null;
                let data = [];
                axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
                await axios.post('/documents/store',this.state)
                    .then(xhr => {
                        response = xhr.data;
                    }).catch(err => {
                        console.error("fail")
                    });
                if(response && response.result == true) {
                    data = response.data;
                }
                this.props.dispatch({type:'FETCH_DOCUMENTS'});
                this.setState({
                    name:'',
                    description:'',
                    files:[]
                })
                $('#photos-wrapper').imagesPosLib({
                    urlUpload : baseUploadApiPublic + 'upload',
                    source : 'props',
                    gallery : 'photo',
                    usePosEditor : false,
                    list: [],
                    useImageDefault : false
                })
            }else{
                showPropzyAlert('Vui l??ng nh???p ??t nh???t 1 t???p');
            }
        }
    }
    handleChange(val,e){
        // this.state[e.target.name] = e.target.value;
        // console.log(dataPost)
        this.setState({
            [e.target.name]: e.target.value
        });
        // this.props.dispatch({type:'SET_DATAPOST',dataPost:this.state})
    }
    componentDidMount() {
        $('#photos-wrapper').imagesPosLib({
            urlUpload : baseUploadApiPublic + 'upload',
            source : 'props',
            gallery : 'photo',
            usePosEditor : false,
            list: [],
            useImageDefault : false
        })
    }
    render(){
        const {validate,name} = this.state;
        return (
            <form >
                <div className="box box-primary" >
                    <div className="box-body">
                        <div className="form-group">
                            <label>T??n:</label>
                            <input type="hidden" value={this.props.dataPost.id} />
                            <Textbox name="name"
                                     value={name}
                                     validate={validate}
                                     validationCallback={res =>
                                         this.setState({ hasNameError: res, validate: false })
                                     }
                                     onChange={this.handleChange}
                                     onBlur={(e) => {console.log(e)}}
                                     type="text"
                                     validationOption={{
                                         name: 'name', //Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                                         check: true, //Optional.[Bool].Default: true. To determin if you need to validate.
                                         required: true,
                                         msgOnError:"T??n t??i li???u kh??ng ???????c ????? tr???ng"
                                     }}
                                     classNameInput="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>M?? t???:</label>
                            <Textbox
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange}
                                type="text"
                                className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>T???p:</label>
                            <div id="photos-wrapper"></div>
                        </div>
                    </div>
                    <div className="box-footer">
                        <button type="button" onClick={this.submit.bind(this)} className="btn btn-success" >L??u</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default connect(function(state){
    return {
        selectedItem: state.FormUpload.selectedItem,
        dataPost: state.FormUpload.dataPost
    }
})(FormUpload);