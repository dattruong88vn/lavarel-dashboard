<div id="imageEditorModal" class="modal" role="dialog" aria-hidden="false">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div id="loading-image-editor"><img src="{{loadAsset("images/loading-image-editor.gif")}}"></div>
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">	{{--				<span id="imageEditorZoom" style="display: inline;"></span>--}}
					<span id="editor-info-title">Propzy Image Editor</span>
				</h4>
				<div id="action-tool-top">
					<div class="element-action-top">
						<button class="element-action-top-button " id="editor-undo"><i class="fa fa-mail-reply"></i></button>
						<button class="element-action-top-button " id="editor-redo"><i class="fa fa-mail-forward"></i></button>
						<div class="ng-star-inserted">
							<button class="mat-icon-button" id="image-editor-zoom-minus">
									<i class="fa fa-minus"></i>
							</button>
							<div class="current">
								<div trans="">Zoom</div>
								<div class="value" id="image-editor-zoom-value">100%</div>
							</div>
							<button class="mat-icon-button" id="image-editor-zoom-plus">
								<i class="fa fa-plus"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-body image-editor-content">
				<img src="" id="imageEditorSrc" style="display: none"/>
				<div class="row">
					<div class="action-tool-images">
						<div class="blc-tool-wrapper">
							<div class="selection-tool-content"></div>
							<div class="final-action">
								<button id="editor-image-save" class="btn-image-action-final">
									Lưu
								</button>
								<button id="editor-image-cancel" class="btn-image-action-final">
									Hủy
								</button>
							</div>
						</div>
					</div>
					<div class="working-editor-content">
						<nav class="child-action-top-content">


						</nav>
						<div class="working-image-zone" id="working-image-zone">
							<canvas id="canvas-grid-image-zone"></canvas>
							<canvas id="canvas-working-image-zone"></canvas>
						</div>

					</div>
				</div>
			</div>
		</div>

	</div>
</div>

<script src="{{ loadAsset("/js/pos/common/imageEditor.js") }}"></script>
<script src="{{ loadAsset("/js/pos/common/icheck.min.js") }}"></script>

<script>
	$(document).ready(function(){
		$('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
			checkboxClass: 'icheckbox_minimal-blue',
			radioClass   : 'iradio_minimal-blue'
		});
	});
</script>
<style>
	.not-showed input,.not-showed label,.not-showed button{
		visibility: hidden;
	}
</style>