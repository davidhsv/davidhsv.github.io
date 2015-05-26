jQuery(document).ready(function() {
    var etapa = 1;
    var qtdVezesChegouPerto = -1;
    var DELAY = 800;
    jQuery($("#img_banner_")).mouseover(function() {
        if (etapa == 2) {
            return;
        }
        $("#img_banner_")
            .fadeTo('slow', 0.3, function() {
                $(this).css('background-image', 'url(http://davidhsv.github.io/ne10/bannerlateral/bg2.jpg)');
            })
            .fadeTo('slow', 1);
        etapa = 2;
        $("#sombaixo_").fadeOut(DELAY / 5);
        $("#textocima_").fadeOut(DELAY / 5);
        $("#textobaixo_").fadeOut(DELAY / 5);
        $("#somcima_").fadeOut(DELAY / 5);
        $("#carro_").fadeOut(DELAY / 5);
    });
    jQuery(window).scroll(function() {
        if (etapa > 1) {
            return;
        }
        //se tela < banner, mostrar bg2
        if (qtdVezesChegouPerto >= 3 && 
        	!$("#textocima_").is(":visible")
        	&& !$("#textobaixo_").is(":visible")) {
        	$("#img_banner_")
        	    .fadeTo('slow', 0.3, function() {
        	        $(this).css('background-image', 'url(http://davidhsv.github.io/ne10/bannerlateral/bg2.jpg)');
        	    })
        	    .fadeTo('slow', 1);
        	etapa = 2;
        	$("#sombaixo_").fadeOut(DELAY / 5);
        	$("#textocima_").fadeOut(DELAY / 5);
        	$("#textobaixo_").fadeOut(DELAY / 5);
        	$("#somcima_").fadeOut(DELAY / 5);
        	$("#carro_").fadeOut(DELAY / 5);
        } else if ($(window).height() < 450) {
            //mostra bg2
            $("#img_banner_").css("background-image", "url(http://davidhsv.github.io/ne10/bannerlateral/bg2.jpg)");
        } else {
            var $h1 = $("#img_banner_");
            var $carro = $("#carro_");
            var scrollTop = $h1.offset().top - $(window).scrollTop();
            var scrollBottom = $(window).scrollTop() + $(window).height() - ($h1.offset().top + 446);
            var espaco_disponivel = $(window).height() - 446;
            if (scrollBottom < espaco_disponivel / 2 && scrollBottom > 0) {
                if (etapa == -2) {
                    $("#sombaixo_").finish();
                    $("#textocima_").finish();
                    $("#textobaixo_").finish();
                    $("#somcima_").finish();
                }
                //escostando em baixo
                // 45 + 65 + 65*proporcao
                var proporcao = scrollBottom / (espaco_disponivel / 2);
                var top = 45 + 85 + 85 * (1 - proporcao);
                $carro.css("top", top);
                $("#sombaixo_").css("top", 178 + top);
                if (scrollBottom > 0 && scrollBottom < 70) {
                	if (!$("#textocima_").is(":visible")) {
                		qtdVezesChegouPerto++;
                	}
                    $("#sombaixo_").fadeIn(DELAY);
                    $("#textocima_").fadeIn(DELAY);
                } else {
                    $("#textocima_").fadeOut(DELAY / 5);
                    $("#sombaixo_").fadeOut(DELAY / 5);
                }
                etapa = -1;
            } else if (scrollTop < espaco_disponivel / 2 && scrollTop > 0) {
                if (etapa == -1) {
                    $("#sombaixo_").finish();
                    $("#textocima_").finish();
                    $("#textobaixo_").finish();
                    $("#somcima_").finish();
                }
                var proporcao = scrollTop / (espaco_disponivel / 2);
                var top = 45 + 0 + 85 * proporcao;
                $carro.css("top", top);
                $("#somcima_").css("top", -18 + top);
                if (scrollTop > 0 && scrollTop < 70) {
                	if (!$("#textobaixo_").is(":visible")) {
                		qtdVezesChegouPerto++;
                	}
                    $("#textobaixo_").fadeIn(DELAY);
                    $("#somcima_").fadeIn(DELAY);
                } else {
                    $("#textobaixo_").fadeOut(DELAY / 5);
                    $("#somcima_").fadeOut(DELAY / 5);
                }
                etapa = -2;
            } else {
                etapa = -3;
                //resetar para posicoes iniciais (se já não está no bg2)
                $("#sombaixo_").finish();
                $("#textocima_").finish();
                $("#textobaixo_").finish();
                $("#somcima_").finish();
            }
        }
    });
});