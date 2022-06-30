function select2_search($el, term) {
    $el.select2('open');

    // Get the search box within the dropdown or the selection
    // Dropdown = single, Selection = multiple
    var $search = $el.data('select2').dropdown.$search || $el.data('select2').selection.$search;
    // This is undocumented and may change in the future
    $search.val(term);
    $search.trigger('input');
    setTimeout(function () {
        $('.select2-results__option').trigger("mouseup");
    }, 1000);
}