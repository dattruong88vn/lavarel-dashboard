var imageEditor = (function(){

    var modalId = 'imageEditorModal';
    var imageEditorZoomId = 'imageEditorZoom';
    var imageId = 'imageEditor';
    var image = null;
    var imageLoaded = false;
    var canvasId = 'imageEditorCanvas';
    var canvas = null;
    var canvasWidth = 1000;
    var canvasHeight = $(window).height() - 240;
    var transparentCorners = false;
    var borderColor = 'red';
    var cornerColor = 'green';
    var padding = 100;
    var zoom = 1;
    var coords = null;
    var areaSelection = null;
    var undoButton = '.imageAction[data-action="undo"]';
    var redoButton = '.imageAction[data-action="redo"]';
    var saveButton = '.imageAction[data-action="save"]';
    var cancelButton = '.imageAction[data-action="cancel"]';
    var state = null;
    var undo = [];
    var redo = [];
    var imageEditorOrginalSizeId = 'imageEditorOrginalSize';
    var imageEditorHeightId = 'imageEditorHeight';
    var imageEditorWidthId = 'imageEditorWidth';
    var loadFromJSON = true;
    var brightness = null;

    var imageAction = {
        undo: function(){
            replay(undo, redo, redoButton, undoButton);
        },        
        redo: function(){
            replay(redo, undo, undoButton, redoButton);
        },
        save: function(){
            if(canvas.currentAction){
                disableSaveCancel();
                action();
            }
        },
        cancel: function(){
            hideAreaSelection();
            disableSaveCancel();
            canvas.currentAction = null;
            showRightPanelTools();
        },
        crop: function(){
            showAreaSelection();
            enableSaveCancel();
            canvas.currentAction = 'cropImage';
            hideRightPanelTools();
        },
        blur: function(){
            showAreaSelection();
            enableSaveCancel();
            canvas.currentAction = 'blurImage';
            hideRightPanelTools();
        },
        blurImage: function (){
            disableSaveCancel();
            fabric.Image.fromURL(getSelectedData(), function(obj) {
                canvas.add(obj);
                obj.filters.push(new fabric.Image.filters.Blur({
                    blur: 5
                }));
                obj.applyFilters();
                var coordsZoom = areaSelection.getBoundingRect(true);
                obj.set({
                    top: coordsZoom.top,
                    left: coordsZoom.left
                });
                canvas.renderAll();
                coords = image.getBoundingRect();
                loadImage(getCanvasData());
                showRightPanelTools();
            });
        },
        rotateLeft90: function(){
            var f = function(){
                image.set({
                    angle: image.angle - 90
                });
                canvas.remove(image);
                canvas.clear();
                canvas.renderAll();
                canvas.add(image);
                canvas.centerObject(image);
                fitWorkspace();
                canvas.renderAll();
                saveState();
            }
            if(loadFromJSON){
                f();
            }else{
                setTimeout(f,100);
            }
        },
        rotateRight90: function(){
            var f = function(){
                image.set({
                    angle: image.angle + 90
                });
                canvas.remove(image);
                canvas.clear();
                canvas.renderAll();
                canvas.add(image);
                canvas.centerObject(image);
                fitWorkspace();
                canvas.renderAll();
                saveState();
            }
            if(loadFromJSON){
                f();
            }else{
                setTimeout(f,100);
            }           
        },
        flipX: function(){
            var f = function(){
                image.set({
                    flipX: !image.flipX
                });
                canvas.remove(image);
                canvas.clear();
                canvas.renderAll();
                canvas.add(image);
                canvas.centerObject(image);
                fitWorkspace();
                canvas.renderAll();
                saveState();
            }
            if(loadFromJSON){
                f();
            }else{
                setTimeout(f,100);
            }           
        },
        flipY: function(){
            var f = function(){
                image.set({
                    flipY: !image.flipY
                });
                canvas.remove(image);
                canvas.clear();
                canvas.renderAll();
                canvas.add(image);
                canvas.centerObject(image);
                fitWorkspace();
                canvas.renderAll();
                saveState();
            }           ;
            if(loadFromJSON){
                f();
            }else{
                setTimeout(f,100);
            }           
        },
        cropImage: function (){
            disableSaveCancel();
            loadImage(getSelectedData());
            showRightPanelTools();
        },
        publishImage: function (){
            ajaxStart();
            $.ajax({
                url : '/pos/image/dataUrl2image',
                data : JSON.stringify({dataURL: getCanvasData()}),
                type : 'POST',
            }).done(function(response) {
                if (hasValue(response.result)) {
                    updateImageSrc(response.data.link);
                    $('#' + modalId).modal('hide');
                    showPropzyAlert('Hình đã được cập nhật');
                } else {
                    showPropzyAlert('Có lỗi upload hình.');
                }
                ajaxEnd();
            });
        },
        cancelPublishImage: function(){
            $('#' + modalId).modal('hide');
        },
        brightnessImage: function(val){
            disableSaveCancel();
            image.filters[0]['brightness'] = parseInt(val)/100;
            image.applyFilters();
            canvas.renderAll();
        }
    };

    function action(){
        if(!canvas.currentAction){
            canvas.currentAction = 'publishImage';
        }
        imageAction[canvas.currentAction]();
    }

    function initBrightness(){
        brightness = new fabric.Image.filters.Brightness({
            brightness: 0
        });
    }

    function getCanvasData(){
        setCoords();
        areaSelection.set({
            visible: false
        });
        coords = image.getBoundingRect();
        var imageSrc = canvas.toDataURL({
            format:'png',
            left: coords.left,
            top: coords.top,
            width: coords.width,
            height: coords.height,
            multiplier: 1/zoom
        });
        coords.width = coords.width/zoom;
        coords.height = coords.height/zoom;
        return imageSrc;
    }

    function getSelectedData(){
        setCoords();
        areaSelection.set({
            visible: false
        });
        coords = areaSelection.getBoundingRect();
        var imageSrc = canvas.toDataURL({
            format:'png',
            left: coords.left,
            top: coords.top,
            width: coords.width,
            height: coords.height,
            multiplier: 1/zoom
        });
        coords.width = coords.width/zoom;
        coords.height = coords.height/zoom;
        return imageSrc;
    }

    function hideAreaSelection(){
        areaSelection.set({
            visible: false
        });
        canvas.discardActiveObject();
        canvas.renderAll();
    }

    function showAreaSelection(){
        areaSelection.set({
            visible: true
        });
        canvas.bringToFront(areaSelection);
        canvas.setActiveObject(areaSelection);
        canvas.centerObject(areaSelection);        
    }

    function initAreaSelection(){
        if(!imageLoaded){
            setTimeout(initAreaSelection, 100);
            return;
        }
        areaSelection = new fabric.Rect({
            fill: 'rgba(0,0,0,0.5)',
            width: image.width/2,
            height: image.height/2,
            visible: false,
            stroke: 'red',
            strokeWidth: 5,
            transparentCorners: transparentCorners,
            borderColor: borderColor,
            cornerColor: cornerColor,
        });
        canvas.add(areaSelection);
    }

    function updateImageSrc(link, type) {
		var currentImageSrc = $('img#imageEditor').attr('src');
		$('a.file-preview-thumbnail[href="' + currentImageSrc + '"] img').attr('src', link);
		$('a.file-preview-thumbnail[href="' + currentImageSrc + '"]').css('background-image', 'url(' + link + ')');
		$('a.file-preview-thumbnail[href="' + currentImageSrc + '"]').data('file-name', link);
		$('a.file-preview-thumbnail[href="' + currentImageSrc + '"]').attr('href', link);
    }
    
    function enableSaveCancel(){
        // $(saveButton).prop('disabled',false);
        // $(cancelButton).prop('disabled',false);
        $(saveButton).show();
        $(cancelButton).show();
    }
    
    function disableSaveCancel(){
        // $(saveButton).prop('disabled',true);
        // $(cancelButton).prop('disabled',true);
        $(saveButton).hide();
        $(cancelButton).hide();
    }

    function setCoords(){
        canvas.forEachObject(function(obj) {
            obj.setCoords();
        });
    }

    function saveState() {
        redo = [];
        $(redoButton).prop('disabled', true);
        if (state) {
            undo.push(state);
            $(undoButton).prop('disabled', false);
        }
        state = JSON.stringify(canvas);
    }

    function replay(playStack, saveStack, buttonsOn, buttonsOff) {
        loadFromJSON = false;
        saveStack.push(state);
        state = playStack.pop();
        var on = $(buttonsOn);
        var off = $(buttonsOff);
        hideAreaSelection();
        disableSaveCancel();
        on.prop('disabled', true);
        off.prop('disabled', true);
        canvas.clear();
        canvas.loadFromJSON(state, function() {
            canvas.renderAll();
            on.prop('disabled', false);
            if (playStack.length) {
                off.prop('disabled', false);
            }
            fitWorkspace();
            loadFromJSON = true;
            canvas.renderAll();
        });
    }

    function resetAll(){
        disableSaveCancel();
        image = null;
        imageLoaded = false;
        brightness = null;
        if(canvas){
            try{
                canvas.clear();
                canvas.dispose();
                canvas.destroy();
                canvas = null;   
            }catch(ex){
    
            }
            $('#' + canvasId).siblings('.upper-canvas').remove();
            $('#' + canvasId).parent('.canvas-container').before($('#' + canvasId));
            $('.canvas-container').remove();
        }
        canvasWidth = 1000;
        canvasHeight = $(window).height() - 240;
        transparentCorners = false;
        borderColor = 'red';
        cornerColor = 'green';
        padding = 100;
        zoom = 1;
        coords = null;
        areaSelection = null;
        state = null;
        undo = [];
        redo = [];
    }

    function bindEvents(){
        $('body').on('click', '[data-fancybox-edit]', function() {
            var f = $.fancybox.getInstance();
            if (f) {
                f['close']();
            }
            showModal();
        });
        $('body').off('click', 'imageAction').on('click', '.imageAction', function(e) {
           var action = $(this).data('action');
           imageAction[action]();
        });
        $('body').off('change','#imageEditorWidth').on('change','#imageEditorWidth', function(e){
            var val = $(this).val();
            var f = function(val){
                image.set({
                    scaleX: val/image.width
                });
                if($('#isPercentage').is(':checked')){
                    image.set({
                        scaleY: val/image.width,
                    });
                }
                fitWorkspace();
                canvas.renderAll();
                canvas.centerObject(image);
                saveState();
                showImageInfomation();
            }
            if(loadFromJSON){
                f(val);
            }else{
                setTimeout(f,100);
            }
        });
        $('body').off('change','#imageEditorHeight').on('change','#imageEditorHeight', function(e){
            var val = $(this).val();
            var f = function(val){
                image.set({
                    scaleY: val/image.height
                });
                if($('#isPercentage').is(':checked')){
                    image.set({
                        scaleX: val/image.height
                    });
                }
                fitWorkspace();
                canvas.renderAll();
                canvas.centerObject(image);
                saveState();
                showImageInfomation();
            }
            if(loadFromJSON){
                f(val);
            }else{
                setTimeout(f,100);
            }
        });
        $('body').off('change','#imageEditorBrightness').on('change','#imageEditorBrightness', function(e){
            var val = $(this).val();
            var f = function(val){
                imageAction['brightnessImage'](val);
                saveState();
            }
            if(loadFromJSON){
                f(val);
            }else{
                setTimeout(f,100);
            }
        });
    }

    function showModal(){
        resetAll();
        ajaxStart();
        $.ajax({
            url : '/pos/image/url2base64',
            data : JSON.stringify({url: $('#' + imageId).attr('src')}),
            type : 'POST',
        }).done(function(response) {
            if (hasValue(response)) {
                loadCanvas();
                initAreaSelection();
                initBrightness();
                loadImage(response);
                $('#' + modalId).modal();
                log();
            } else {
                showPropzyAlert('Có lỗi upload hình.');
            }
            ajaxEnd();
        });
    }

    function log(){
        showZoomInfomation();
        showImageInfomation();
    }

    function hideRightPanelTools(){
        $('.right-panel').addClass('not-showed');
    }

    function showRightPanelTools(){
        $('.right-panel').removeClass('not-showed');
    }

    function showZoomInfomation(){
        $('#' + imageEditorZoomId).text((zoom * 100).toFixed(2) + ' %');
    }

    function showImageInfomation(){
        if(!imageLoaded){
            setTimeout(showImageInfomation, 100);
            return;
        }
        // $('#' + imageEditorOrginalSizeId).text(image.width + ' x ' + image.height);
        $('#' + imageEditorHeightId).val(Math.round(image.height*image.scaleY));
        $('#' + imageEditorWidthId).val(Math.round(image.width*image.scaleX));
    }

    function loadImage(dataSrc){
        imageLoaded = false;
        fabric.Image.fromURL(dataSrc, function(obj) {
            if(image){
                canvas.setActiveObject(image);
                canvas.remove(canvas.getActiveObject());
                canvas.renderAll();
                canvas.clear();
            }
            image = obj;
            image.set({
                transparentCorners: transparentCorners,
                borderColor: borderColor,
                cornerColor: cornerColor,
            });
            canvas.add(image);
            canvas.centerObject(image);
            image.filters.push(brightness);
            fitWorkspace();
            canvas.renderAll();
            saveState();
            imageLoaded = true;
        });
    }

    function fitWorkspace(){
        var imgWidth = image.width;
        var imgHeight = image.height;
        var zoomX = 1;
        var zoomY = 1;
        var x = canvasWidth/2;
        var y = canvasHeight/2;
        if(imgWidth > (canvasWidth - padding*2)){
            zoomX = (canvasWidth - padding*2)/ imgWidth;
        }
        if(imgHeight > (canvasHeight - padding*2)){
            zoomY = (canvasHeight - padding*2)/ imgHeight;
        }
        if(zoomX > zoomY) {
            zoom = zoomY;
        }else{
            zoom = zoomX;
        }
        canvas.zoomToPoint({ x: x, y: y}, zoom);
        canvas.calcOffset();
    }

    function loadCanvas(){
        canvas = new fabric.Canvas(
            canvasId,
            {
                width: canvasWidth,
                height: canvasHeight,                
                preserveObjectStacking: true
            }
        );
        canvas.set({
            currentAction: null
        });
        canvas.requestRenderAll();
        // saveState();
        canvas.on('object:modified', function() {
            setCoords();
            saveState();
            log();
        });
        canvas.on('object:selected', function(e) {
            e.target.set({
                transparentCorners: transparentCorners,
                borderColor: borderColor,
                cornerColor: cornerColor,
            });
        });
        canvas.on('mouse:wheel', function (opt) {
            var delta = opt.e.deltaY;
            var pointer = canvas.getPointer(opt.e);
            zoom = canvas.getZoom();
            zoom = zoom + delta / 2000;
            // if (zoom > 30) zoom = 30;
            if (zoom < 0.01) zoom = 0.01;
            canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();
            setCoords();
            log();
        });
        canvas.on('after:render', function(){
            this.calcOffset();
        });
        canvas.on('mouse:down', function (opt) {
            var evt = opt.e;
            if (evt.altKey === true) {
                this.isDragging = true;
                this.selection = false;
                this.lastPosX = evt.clientX;
                this.lastPosY = evt.clientY;
            }
        });
        canvas.on('mouse:move', function (opt) {
            if (this.isDragging) {
                var e = opt.e;
                this.viewportTransform[4] += e.clientX - this.lastPosX;
                this.viewportTransform[5] += e.clientY - this.lastPosY;
                this.requestRenderAll();
                this.lastPosX = e.clientX;
                this.lastPosY = e.clientY;
            }
        });
        canvas.on('mouse:up', function (opt) {
            this.isDragging = false;
            this.selection = true;
            log();
        });      
    }

    function init(){
        bindEvents();
    }

    return {
        init: init
    }
})();
$(document).ready(function(){
    //imageEditor.init();
});