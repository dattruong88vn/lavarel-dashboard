function preparePostData() {
    var item = {
        streetName: $("#streetName").val().trim(),
        cityId: $("#cityName").val(),
        cityName: $("#cityName option:selected").text().trim(),
        wardId:$("#wardId").val().trim(),
        wardName: $("#wardId option:selected").html().trim(),
        districtId: $("#districtName").val(),
        districtName: $("#districtName option:selected").text().trim(),
        description: $("#description").val()

    };
    return item;
}
$("#cityName").change(function () {
    var cityId = $(this).val();
    getDistricts(cityId, "#districtName");
});