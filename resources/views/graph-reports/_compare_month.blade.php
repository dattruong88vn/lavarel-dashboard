<div class="form-group">
	<div class="col-sm-4 col-centered">
		<select id="filter-time" class="form-control">
            <option value="month-select-group">SO SÁNH THÁNG</option>
            <option value="quarter-select-group">SO SÁNH QUÝ</option>
		</select>
	</div>
</div>


<script type="text/html" id="select-month-element">
	<div class="col-sm-12">
			@include('graph-reports._month_select')
	</div>
</script>

<script type="text/html" id="select-quarter-element">
	<div class="col-sm-12">
			@include('graph-reports._quarter_select')
	</div>
</script>

<script type="text/javascript">
	var numberCol = 0;
	var numberStartElement = 2;
	
	$(function(){
		var vsHtml = '<label class="control-label col-sm-1 text-center lbvs">VS</label>';
		function addSelectElement(target) {
			numberCol = $("#"+ target +"-container select").size();
			//if(numberCol > 0)  $("#"+ target +"-container").append(vsHtml)
			$("#"+ target +"-container").append($("#"+ target +"-element").html());
			$("#"+ target +"-container div:last select option:nth-child(" + (numberCol + 1) + ")").attr('selected','selected');
		}

		function removeLastSelectElement(target) {
			$("#"+ target +"-container > " + "div:last").remove();
			//$("#"+ target +"-container > " + "label:last").remove();
		}

		$(".btn-add").click(function() {
			target = $(this).attr("target");
			numberCol = $("#"+ target +"-container select").size();

			addSelectElement(target);
			//numberCol == 4 ? $(this).hide() : $(this).show();
			$(".btn-remove").show();
			reloadCompareData();
		});

		$(".btn-remove").click(function() {
			target = $(this).attr("target");
			numberCol = $("#"+ target +"-container select").size();

			removeLastSelectElement(target);
			//numberCol == 3 ? $(this).hide() : $(this).show();
			$(".btn-add").show();
			reloadCompareData();
		});

		$(".dynamic-select-group").on("change", "select", function(){
			reloadCompareData();
		});
		for(i = 0; i < numberStartElement; i++) { 
			addSelectElement("select-month");
			addSelectElement("select-quarter");
		}

		$("#filter-time").change(function(){
			$(".dynamic-select-group").hide();
			$("." + $(this).val()).show();
			reloadCompareData();
		});
	})
</script>