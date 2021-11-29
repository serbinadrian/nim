function themeInit() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey) {
            $("#app").toggleClass('light-theme');
            $("#app").toggleClass('dark-theme');
        }
    });

}

function rightCLick() {
    const menuArea = document.querySelector(".chat-block");
    const menu = document.querySelector(".right-click-menu");
    menuArea.addEventListener("contextmenu", event => {
        event.preventDefault();
        menu.style.top = `${event.clientY}px`;
        menu.style.left = `${event.clientX}px`;
        menu.classList.add("active");
    }, false);

    document.addEventListener("click", event => {
        if (event.button !== 2) {
            menu.classList.remove("active");
        }
    }, false);

    menu.addEventListener("click", event => {
        event.stopPropagation();
    }, false);
}

function checkWidth() {
    if ($("#app").width() < 990) {
        return true;
    }
    return false;
}

function hideChatShowBlank() {
    $('#app-current-chat').removeClass('flex');
    $('#app-current-chat').addClass('hide');

    $("#application-blank").addClass('flex');
    $("#application-blank").removeClass('hide');
}

function ShowChatHideBlank() {
    $('#app-current-chat').addClass('flex');
    $('#app-current-chat').removeClass('hide');

    $("#application-blank").removeClass('flex');
    $("#application-blank").addClass('hide');
}

function showChatList() {
    $('#app-chats').removeClass('hide');
    $('#app-chats').addClass('show');
}

function hideChatList() {
    $('#app-chats').addClass('hide');
    $('#app-chats').removeClass('show');
}

function showBackBtn() {
    $('#back-to-chats').removeClass('hide');
    $('#back-to-chats').addClass('show');
}

function hideBackBtn() {
    $('#back-to-chats').addClass('hide');
    $('#back-to-chats').removeClass('show');
}

function niceScrollChatsLight() {


    $('#chats').niceScroll({
        cursorcolor: "#376B5A",
        cursorwidth: "5px",
        cursorborder: "none",
        cursorborderradius: "5px",
        autohidemode: true,
        railpadding: {
            top: 20,
            right: 3,
            left: 3,
            bottom: 20
        }
    });
}

function niceScrollChatBlockLight() {
    $('#chat-block').niceScroll({
        cursorcolor: "#376B5A",
        cursorwidth: "5px",
        cursorborder: "none",
        cursorborderradius: "5px",
        autohidemode: true,
        railpadding: {
            top: 0,
            right: 3,
            left: 3,
            bottom: 0
        }
    });
}

$(document).ready(function() {
    alert("use CTRL key to switch theme");
    alert("сurrent mode: application width/height: 100%");
    themeInit();
    rightCLick()
    niceScrollChatsLight();
    niceScrollChatBlockLight();

    window.onresize = function() {

        if (checkWidth()) {
            hideChatShowBlank();
            showChatList();
            $("#back-to-chats").click(function() {
                hideBackBtn()
                hideChatShowBlank();
                showChatList();
            });
            $('#chats').click(function() {
                showBackBtn()
                ShowChatHideBlank();
                hideChatList();

                niceScrollChatBlockLight();
            });
        } else {
            ShowChatHideBlank();
            showChatList();
            hideBackBtn()
        }
    }

});
