<?php
 $pageTypeAgent  = 'CREATE'
?>
<div id="modal-create-agent" class="modal fade" role="dialog" aria-hidden="true" data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Tạo Môi Giới</h4>
			</div>
			<div class="modal-body message">
				@include('agent-manager.block-agent-create-template')
			</div>
		</div>

	</div>
</div>
@include('agent-manager.list-duplicate-agents-modal')
<script src="{{ loadAsset("/js/propzy-validator.js")}}"></script>
<script src="{{ loadAsset("/js/agent-manager/agent-create-in-modal.js")}}"></script>
{{--
<script src="{{ loadAsset("/js/pos/common/common-pos.js") }}"></script>--}}

<style>
	#modal-create-agent .checkbox label:after,
	#modal-create-agent .radio label:after {
		content: '';
		display: table;
		clear: both;
	}

	#modal-create-agent .checkbox .cr,
	#modal-create-agent .radio .cr {
		position: relative;
		display: inline-block;
		border: 1px solid #a9a9a9;
		border-radius: .25em;
		width: 1.3em;
		height: 1.3em;
		float: left;
		margin-right: .5em;
	}

	#modal-create-agent .radio .cr {
		border-radius: 50%;
	}

	#modal-create-agent .checkbox label,
	#modal-create-agent .radio label,
	#modal-create-agent label.checkbox,
	label.radio {
		min-height: auto;
		padding-left: 0;
		margin-bottom: 0;
		font-weight: 400;
		cursor: pointer;
	}

	#modal-create-agent label.checkbox.control-label,
	#modal-create-agent label.radio.control-label {
		padding-left: 15px;
	}

	#modal-create-agent .checkbox .cr .cr-icon,
	#modal-create-agent .radio .cr .cr-icon {
		position: absolute;
		font-size: .8em;
		line-height: 0;
		top: 50%;
		left: 20%;
		color: #3c8dbc;
	}

	#modal-create-agent .radio .cr .cr-icon {
		margin-left: 0.04em;
	}

	#modal-create-agent .checkbox input[type="checkbox"],
	#modal-create-agent .radio input[type="radio"] {
		display: none;
	}

	#modal-create-agent .checkbox input[type="checkbox"]+.cr>.cr-icon,
	#modal-create-agent .radio input[type="radio"]+.cr>.cr-icon {
		transform: scale(3) rotateZ(-20deg);
		opacity: 0;
		transition: all .3s ease-in;
	}

	#modal-create-agent .checkbox input[type="checkbox"]:checked+.cr>.cr-icon,
	#modal-create-agent .radio input[type="radio"]:checked+.cr>.cr-icon {
		transform: scale(1) rotateZ(0deg);
		opacity: 1;
	}

	#modal-create-agent .checkbox input[type="checkbox"]:disabled+.cr,
	#modal-create-agent .radio input[type="radio"]:disabled+.cr {
		opacity: .5;
	}
</style>