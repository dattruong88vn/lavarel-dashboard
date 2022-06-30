var startApp = function () {
    var cart = Cart.getCart();
    $.each($('.save-listing'), function (key, val) {
        // check trùng roy mới push
        cart.fav.push(JSON.parse($(val).attr("object")));
    });
    App.Feature.setCookie("mycart", JSON.stringify(cart));
    if (cart.fav.length > 0) {
        var uniq = deduplicate(Cart.getCart().fav, 'id');
        cart.fav = uniq;
        Cart.updateCart(cart);
    }
    location.href = '/yeu-thich';
};

function deduplicate(arr, comp) {
    const unique = arr
        .map(e => e[comp])
        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)
        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);

    return unique;
}