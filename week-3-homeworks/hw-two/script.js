$(document).ready(function() {
    $('#listProducts').on('click', function() {
        $.ajax({
            url: 'products.xml',
            type: 'GET',
            dataType: 'xml',
            success: function(xmlResponse) {
                const $targetWrapper = $('#productContainer').empty();
                
                $(xmlResponse).find('product').each(function() {
                    const $itemWrapper = $('<div>', {
                        class: 'product-card'
                    });

                    const $itemName = $('<h3>').text($(this).find('name').text());
                    
                    const $itemCost = $('<p>', {
                        class: 'price'
                    }).text($(this).find('price').text() + ' TL');
                    
                    const $itemRedirect = $('<a>', {
                        href: $(this).find('link').text(),
                        target: '_blank',
                        text: 'Ürüne Git'
                    });

                    $itemWrapper
                        .append($itemName)
                        .append($itemCost)
                        .append($itemRedirect);

                    $targetWrapper.append($itemWrapper);
                });
            },
            error: function(xhr, status, errorMsg) {
                console.error('Hata:', errorMsg);
                const $errorAlert = $('<p>').text('Ürünler yüklenirken bir hata oluştu.');
                $('#productContainer').empty().append($errorAlert);
            }
        });
    });
});
