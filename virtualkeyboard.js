(function (factory) {
    try {
        const jQuery = require('jquery');
        factory(jQuery);
    } catch (e) {
        factory(jQuery);
    }
})(function ($) {

    const zhKeys = Object.keys(dictionary);

    //默认参数
    const options = {
        el: '',
        page: 1,
        num: 10,//拼音每页多少个字
        backgroundColor: "#DBDBDB",//键盘的背景颜色
        isRandom: true,//是否随机键盘
        hasSwitch: false,//有中英文切换按钮
        ZH: false,
        upperCase: false,//大写字母状态
        moveAble: false,//是否可以拖动
        offsetX: 0,
        offsetY: 0
    };
    //中英文切换按钮
    var en_btn = '<div class="switchLanguage" style="display:flex;justify-content: center;" >' +
        '<div class="switchActive">英</div>' +
        '<div class="switchInactive">/中</div>' +
        '</div>';
    var zh_btn = '<div class="switchLanguage" style="display:flex;justify-content: center;" >' +
        '<div class="switchInactive">英/</div>' +
        '<div class="switchActive">中</div>' +
        '</div>';
    //大小写切换按钮
    var upper_btn = '<div class="switchUpper">' +
        '<svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="781"><path d="M930.58019947 480.50282987L578.20031467 115.81538987a92.4569472 92.4569472 0 0 0-133.01716374 0L92.79555947 480.50282987a92.46465387 92.46465387 0 0 0 66.50087573 156.73830186h75.07840107v187.2952576c0 51.079824 41.39253653 92.48006827 92.48006826 92.4800672h369.66595094c51.07211733 0 92.48006827-41.4002432 92.4800672-92.4800672V637.2488384h75.0629888a92.48777493 92.48777493 0 0 0 66.516288-156.74600853z" fill="" p-id="782"></path></svg>' +
        '</div>'
    var lowwer_btn = '<div class="switchUpper">' +
        '<svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="751"><path d="M512.57150879 169.39927988l372.49700186 385.50836163h-177.11705391v295.73696425H317.19156172V554.90129141H140.07450781l372.49700098-385.50201152m-1e-8-76.20122726a76.20122813 76.20122813 0 0 0-54.80138232 23.25407432L85.27312461 501.95413848a76.20122813 76.20122813 0 0 0 54.8013832 129.15473027h100.91582578v219.53573701c0 42.08212793 34.11909932 76.20122813 76.20122813 76.20122812h390.76624511c42.08212793 0 76.20122813-34.11909932 76.20122813-76.20122812V631.10251865h100.91582578a76.20122813 76.20122813 0 0 0 54.8013832-129.15473027L567.372892 116.44577685a76.20122813 76.20122813 0 0 0-54.80138321-23.24772422z" fill="#231815" p-id="752"></path></svg>' +
        '</div>'
    //删除按钮
    var delete_btn = '<div class="deleteBtn">' +
        '<svg class="icon" style="width: 2.3em;height: 1.3em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="37577"><path d="M597.333 451.67l55.168-55.169a42.667 42.667 0 0 1 60.331 60.331L657.664 512l55.168 55.168a42.667 42.667 0 0 1-60.33 60.33l-55.169-55.167-55.168 55.168a42.667 42.667 0 0 1-60.33-60.331L537.003 512l-55.168-55.168a42.667 42.667 0 0 1 60.33-60.33l55.168 55.167zM874.581 832H376.32c-47.403 0-106.73-25.941-138.752-60.672L74.389 594.389c-42.325-45.866-42.346-118.869 0-164.778l163.2-176.939C269.525 218.027 329.045 192 376.32 192h498.24a106.667 106.667 0 0 1 106.773 106.837v426.326A106.752 106.752 0 0 1 874.581 832z m0-85.333c11.819 0 21.419-9.579 21.419-21.504V298.837c0-11.946-9.515-21.504-21.419-21.504H376.32c-23.467 0-60.224 16.064-76.01 33.195l-163.2 176.917c-12.182 13.227-12.16 35.883 0 49.11l163.2 176.917c15.85 17.195 52.437 33.195 76.01 33.195h498.24z" p-id="37578"></path></svg>' +
        '</div>';
    // 字母表
    var letterArray = [
        '<span class="letter">q</span>',
        '<span class="letter">w</span>',
        '<span class="letter">e</span>',
        '<span class="letter">r</span>',
        '<span class="letter">t</span>',
        '<span class="letter">y</span>',
        '<span class="letter">u</span>',
        '<span class="letter">i</span>',
        '<span class="letter">o</span>',
        '<span class="letter">p</span>',
        '<span class="letter">a</span>',
        '<span class="letter">s</span>',
        '<span class="letter">d</span>',
        '<span class="letter">f</span>',
        '<span class="letter">g</span>',
        '<span class="letter">h</span>',
        '<span class="letter">j</span>',
        '<span class="letter">k</span>',
        '<span class="letter">l</span>',
        '<span class="letter">z</span>',
        '<span class="letter">x</span>',
        '<span class="letter">c</span>',
        '<span class="letter">v</span>',
        '<span class="letter">b</span>',
        '<span class="letter">n</span>',
        '<span class="letter">m</span>'
    ];
    if (options.isRandom) {
        letterArray.sort(function () { return Math.random() > 0.5 ? -1 : 1; });
    }

    var letterArray1 = letterArray.slice(0, 10).join('');
    var letterArray2 = letterArray.slice(10, 19).join('');
    var letterArray3 = letterArray.slice(19, 26).join('');

    $.fn.extend({
        'keyboard': function (option) {
            var keyboardHTML = `
            <div class="zqKeyBoard">
                <div class="outputZone">
                    <span class="zh-pinyin-letter"></span>
                    <div class="outputZoneOp">
                        <span class="outputZoneUp unclick">◀</span>
                        <span class="outputZoneDown">▶</span><span class="page">1/1</span>
                    </div>
                </div>
                <div class="keyboardOp">
                    <ul class="output-ZH"></ul>
                    <span class="slideDown">▼</span>
                </div>
                <div class="inputZone" style="background-color:${options.backgroundColor};">
                    <div class="normalZone">
                        ${letterArray1}
                    </div>
                    <div class="normalZone">
                        ${letterArray2}
                    </div>
                    <div class="normalZone">
                        <span class="func toUpper">${lowwer_btn}</span>
                        ${letterArray3}
                        <span class="func backspace">${delete_btn}</span>
                    </div>
                    <div class="normalZone">
                        <span class="func numSymbol">?123</span>
                        <span class="symbol comma">,</span>
                        <span class="blank">空格</span>
                        <span class="symbol period">.</span>
                        <span class="func inputCut">${en_btn}</span>
                    </div>

                    <div class="zhSymbolZone">
                        <span class="number">1</span>
                        <span class="number">2</span>
                        <span class="number">3</span>
                        <span class="number">4</span>
                        <span class="number">5</span>
                        <span class="number">6</span>
                        <span class="number">7</span>
                        <span class="number">8</span>
                        <span class="number">9</span>
                        <span class="number">0</span>
                    </div>
                    <div class="zhSymbolZone">
                        <span class="symbol underline">_</span>
                        <span class="symbol">/</span>
                        <span class="symbol">：</span>
                        <span class="symbol">；</span>
                        <span class="symbol">（</span>
                        <span class="symbol">）</span>
                        <span class="symbol">-</span>
                        <span class="symbol">@</span>
                        <span class="symbol">“</span>
                        <span class="symbol">”</span>
                    </div>
                    <div class="zhSymbolZone">
                        <span class="symbol">…</span>
                        <span class="symbol">~</span>
                        <span class="symbol">、</span>
                        <span class="symbol">？</span>
                        <span class="symbol">！</span>
                        <span class="symbol">.</span>
                        <span class="symbol">#</span>
                        <span class="func backspace">${delete_btn}</span>
                    </div>
                    <div class="zhSymbolZone">
                        <span class="func backNormal">返回</span>
                        <span class="symbol">，</span>
                        <span class="blank">空格</span>
                        <span class="symbol">。</span>
                    </div>

                    <div class="enSymbolZone">
                        <span class="number">1</span>
                        <span class="number">2</span>
                        <span class="number">3</span>
                        <span class="number">4</span>
                        <span class="number">5</span>
                        <span class="number">6</span>
                        <span class="number">7</span>
                        <span class="number">8</span>
                        <span class="number">9</span>
                        <span class="number">0</span>
                    </div>
                    <div class="enSymbolZone">
                        <span class="symbol">-</span>
                        <span class="symbol">/</span>
                        <span class="symbol semicolon">:</span>
                        <span class="symbol">;</span>
                        <span class="symbol">(</span>
                        <span class="symbol">)</span>
                        <span class="symbol">_</span>
                        <span class="symbol">$</span>
                        <span class="symbol">&</span>
                        <span class="symbol">\"</span>
                    </div>
                    <div class="enSymbolZone">
                        <span class="symbol">~</span>
                        <span class="symbol">^</span>
                        <span class="symbol">@</span>
                        <span class="symbol">?</span>
                        <span class="symbol">!</span>
                        <span class="symbol">\'</span>
                        <span class="symbol">#</span>
                        <span class="func backspace">${delete_btn}</span>
                    </div>
                    <div class="enSymbolZone">
                        <span class="func backNormal">返回</span>
                        <span class="symbol">,</span>
                        <span class="blank">空格</span>
                        <span class="symbol">.</span>
                    </div>

                </div>
            </div>`;

            var inputEl = $(this);
            inputEl.attr("readonly", true)//屏蔽默认键盘弹出
            inputEl.click((event) => {
                //inputEl.blur();//屏蔽默认键盘弹出；

                var targetName = event.target.tagName.toLowerCase();
                console.log("targetName=", targetName)
                if (!['input', "textarea"].includes(targetName)) return;
                const keyboard = $('.zqKeyBoard');
                if (!keyboard.length) {
                    $(keyboardHTML).click((e) => {
                        const el = $(e.target);
                        console.log("el === ", el);
                        switch (true) {
                            case el.hasClass('number'):
                            case el.hasClass('letter'):
                                pressNumberOrLetterKey(e);
                                break;
                            case el.hasClass('symbol'):
                                pressSymbolKey(e);
                                break;
                            case el.hasClass('word'):
                                outputZhWord(e);
                                break;
                            //删除按键
                            case el.hasClass('backspace'):
                            case el.hasClass('deleteBtn') || el.parents('.deleteBtn').length > 0:
                                backspace(e);
                                break;
                            //大小写切换
                            case el.hasClass('toUpper'):
                            case el.hasClass('switchUpper') || el.parents('.switchUpper').length > 0:
                                simulateCapsLock(e);
                                break;
                            //中英文切换
                            case el.hasClass('inputCut'):
                            case el.hasClass('switchLanguage') || el.parents('.switchLanguage').length > 0:
                                switchInputLanguage(e);
                                break;
                            //数字和符号键盘调出
                            case el.hasClass('numSymbol'):
                                openNumSymbol(e);
                                break;
                            //返回主键盘
                            case el.hasClass('backNormal'):
                                backToNormalZone(e);
                                break;
                            case el.hasClass('outputZoneUp'):
                                pageUp(e);
                                break;
                            case el.hasClass('outputZoneDown'):
                                pageDown(e);
                                break;
                            case el.hasClass('slideDown'):
                                clearZhWords();
                                $('.zqKeyBoard').hide();
                                break;
                            case el.hasClass('blank'):
                                pressBlankKey(e);
                                break;
                        }
                        $(options.el).focus();
                    }).appendTo('body');
                }
                if (!options.hasSwitch) {
                    $(".switchLanguage").parent().remove();
                }
                keyboard.show();
                const normalZone = $('.normalZone');
                normalZone.show();
                //隐藏中文字符键盘
                const zhSymbolZone = $('.zhSymbolZone');
                zhSymbolZone.hide();
                //隐藏英文字符键盘
                const enSymbolZone = $('.enSymbolZone');
                enSymbolZone.hide();

                options.el = event.target;
                event.stopPropagation();
            });


        }
    });

    $('html,body')
        // 绑定点击事件，在点击键盘区域之外时隐藏键盘
        .click((e) => {
            console.log("html,body click", e)
            const el = $(e.target);
            if (el.parents('.zqKeyBoard').length > 0 ||
                el.hasClass('word') ||
                el.hasClass('switchLanguage') || el.parents('.switchLanguage').length > 0 || //中英文切换按键
                el.hasClass('switchUpper') || el.parents('.switchUpper').length > 0 ||//大小写切换按键
                el.hasClass('deleteBtn') || el.parents('.deleteBtn').length > 0 ||//删除按钮
                el.hasClass('numSymbol') //数字和符号键盘按钮
            ) {
                //nothing
            } else {
                clearZhWords();
                $('.zqKeyBoard').hide();
            }
        })
        // 在键盘应用keyboardOp类的区域绑定拖动事件，使键盘可以移动位置
        .on('mousedown', '.keyboardOp', down)
        .on('touchstart', '.keyboardOp', down);
    /**
     * 更新备选汉字显示区域
     */
    function updateZHWords(e) {
        $('.zqKeyBoard .word').remove();
        const inputVal = $('.zqKeyBoard .zh-pinyin-letter').text();
        if (!inputVal) return;
        // 根据输入过滤出拼音，找出拼音对应的汉字，使用Set去除重复的汉字
        const zhWordSet = new Set();
        zhKeys.filter(key => key.indexOf(inputVal) === 0)
            .forEach((key) => {
                for (let word of dictionary[key]) {
                    zhWordSet.add(word);
                }
            });
        // 将Set中的汉字依次添加到汉字输出区域
        let count = 0;
        for (let zhWord of zhWordSet.values()) {
            count++;
            $('<li class="word">').addClass(`${count > options.num ? 'hide' : ''}`).text(zhWord).appendTo('.output-ZH');
        }
        // 处理备选汉字区域分页，默认显示第一页并更新页码信息
        if (count < options.num) {
            $('.zqKeyBoard .outputZoneDown').addClass('unclick');
        } else {
            $('.zqKeyBoard .outputZoneDown').removeClass('unclick');
        }
        options.page = 1;
        $('.zqKeyBoard .outputZoneUp').addClass('unclick');
        pageUpdate(count);
    }

    // 清空汉字输出区域
    function clearZhWords(e) {
        $('.zqKeyBoard .word').remove();
        $('.zqKeyBoard .zh-pinyin-letter').text('');
        $('.outputZone').hide();
    }

    /**
     * 派发输入事件，由于是模拟键盘，输入内容时并没有真正产生键盘事件，某些依赖键盘事件的逻辑无法响应
     * 这里在输入有效内容时派发一个Input键盘事件可以解决该问题
     * @param $el jquery封装的输入域对象
     */
    function dispatchInputEvent($el) {
        if (!$el || !$el.length) {
            $el = $(options.el);
        }
        if ($el && $el.length) {
            $el[0].dispatchEvent(new Event('input'));
        }
    }

    // 点击数字或字母按键响应函数
    function pressNumberOrLetterKey(e) {
        if (options.ZH) {
            // 中文输入状态下，如果按下的不是字母按键（数字键），认为是无意义输入
            if (!$(e.target).hasClass('letter')) return;
            $('.outputZone').show();
            const inputVal = $('.zqKeyBoard .zh-pinyin-letter');
            inputVal.text(inputVal.text() + $(e.target).text());
            updateZHWords(e);
        } else {
            const focusEl = $(options.el);
            focusEl.val(focusEl.val() + $(e.target).text());
            dispatchInputEvent(focusEl);
        }
    }

    // 空格按键响应函数
    function pressBlankKey(e) {
        const focusEl = $(options.el);
        focusEl.val(focusEl.val() + ' ');
        dispatchInputEvent(focusEl);
    }

    /**
     * 输出汉字，即点击汉字元素事件响应函数
     */
    function outputZhWord(e) {
        const focusEl = $(options.el);
        focusEl.val(focusEl.val() + $(e.target).text());
        dispatchInputEvent(focusEl);
        clearZhWords();
    }

    /**
     * 符号按键响应函数
     */
    function pressSymbolKey(e) {
        const focusEl = $(options.el);
        focusEl.val(focusEl.val() + $(e.target).text());
        dispatchInputEvent(focusEl);
    }

    /**
     * 打开数字和符号键盘
     * @param {*} e 
     */
    function openNumSymbol(e) {
        if (options.ZH) {
            $('.normalZone').hide();
            $('.zhSymbolZone').show();
        } else {
            $('.normalZone').hide();
            $('.enSymbolZone').show();
        }
    }

    /**
     * 返回主键盘
     */
    function backToNormalZone() {
        $('.normalZone').show();
        $('.zhSymbolZone').hide();
        $('.enSymbolZone').hide();
    }
    /**
     * 删除键事件处理函数
     */
    function backspace(e) {
        const key = $('.zqKeyBoard .zh-pinyin-letter');

        // console.log("range = ", range, "element.selectionStart=", $(options.el)[0].selectionStart);

        // var selection = window.getSelection();
        // var range = selection.getRangeAt(0);
        // var preCaretRange = range.cloneRange();//克隆一个选中区域
        // preCaretRange.selectNodeContents(element[0]);//设置选中区域的节点内容为当前节点
        // preCaretRange.setEnd(range.endContainer, range.endOffset);  //重置选中区域的结束位置
        // caretOffset = preCaretRange.toString().length;
        // console.log("preCaretRange=",preCaretRange,"caretOffset=",caretOffset)

        if (key.text()) {
            key.text(key.text().substring(0, key.text().length - 1));
            updateZHWords(e);
            if (!key.text()) {
                clearZhWords(e);
            }
        } else {
            const focusEl = $(options.el);
            //光标位置
            var position = focusEl[0].selectionStart - 1 || focusEl.val().length - 1;
            var wholeLen = focusEl.val().length - 1;
            focusEl.val(focusEl.val().substring(0, position));
            dispatchInputEvent(focusEl);
        }
    }

    // 改变输入语言，即中英文输入转换
    function switchInputLanguage(e) {
        console.log("switchInputLanguage", e)
        // 如果是要转换为中文输入法且当前大写开启，先转换大小写输入模式
        if (!options.ZH && options.upperCase) {
            simulateCapsLock();
        }
        options.ZH = !options.ZH;
        if (options.ZH) {
            console.log("中文", options.ZH, zh_btn)
            $('.inputCut').html(zh_btn);
            $('.semicolon').text('：');
            $('.comma').text('，');
            $('.period').text('。');
        } else {
            console.log("中文", options.ZH, en_btn)
            clearZhWords();
            $('.inputCut').html(en_btn);
            $('.semicolon').text(':');
            $('.comma').text(',');
            $('.period').text('.');
        }
    }

    // 模拟点击Caps Lock键，实现大小写模式切换
    function simulateCapsLock(e) {
        // 切换大小写时，如果当前是中文输入模式，则切换
        if (options.ZH) {
            switchInputLanguage();
        }
        options.upperCase = !options.upperCase;
        const letters = $('.zqKeyBoard .letter');
        if (options.upperCase) {
            letters.each(function (index, el) {
                $(el).text($(el).text().toUpperCase());
            });
            $('.toUpper').html(upper_btn);
            clearZhWords();
        } else {
            letters.each(function (index, el) {
                $(el).text($(el).text().toLowerCase());
            });
            $('.toUpper').html(lowwer_btn);
        }
    }

    // 拼音输入时翻到下一页
    function pageUp(e) {
        const list = $('.zqKeyBoard .word');
        if (options.page > 1) {
            options.page--;
            list.each(function (index, el) {
                if (index < options.num * options.page && index >= options.num * (options.page - 1)) {
                    $(el).show();
                } else {
                    $(el).hide();
                }
            });
            $(e.target).siblings().removeClass('unclick');
            if (options.page === 1) {
                $(e.target).addClass('unclick');
            }
            pageUpdate(list.length);
        }
    }

    // 拼音输入时翻到下一页
    function pageDown(e) {
        const list = $('.zqKeyBoard .word');
        const len = Math.ceil(list.length / options.num);
        if (options.page < len) {
            options.page++;
            list.each(function (index, el) {
                if (index < options.num * options.page && index >= options.num * (options.page - 1)) {
                    $(el).show();
                } else {
                    $(el).hide();
                }
            });
            $(e.target).siblings().removeClass('unclick');
            if (options.page === len) {
                $(e.target).addClass('unclick');
            }
            pageUpdate(list.length);
        }
    }

    /**
     * 更新汉字翻页的页码
     * @param count 匹配汉字数目
     */
    function pageUpdate(count) {
        $('.zqKeyBoard .page').text(options.page + '/' + (Math.ceil(count / options.num) || '1'));
    }

    function down(e) {
        console.log("down", e)
        if (!options.moveAble) {
            return
        }
        if ($(e.target).hasClass('word')) return;
        e.preventDefault();
        const event = e.type.match('mouse') ? e : e.originalEvent.changedTouches[0];
        options.offsetX = (event.pageX - $('.zqKeyBoard')[0].offsetLeft);
        options.offsetY = (event.pageY - $('.zqKeyBoard')[0].offsetTop);
        $('html,body')
            .on('mousemove', move)
            .on('mouseup', up)
            .on('touchmove', move)
            .on('touchend', up);
    }

    function move(e) {
        e.preventDefault();
        const event = e.type.match('mouse') ? e : e.originalEvent.changedTouches[0];
        $('.zqKeyBoard')[0].style.left = (event.pageX - options.offsetX) + 'px';
        $('.zqKeyBoard')[0].style.top = (event.pageY - options.offsetY) + 'px';
    }

    function up() {
        $('html,body')
            .off('mousemove', move)
            .off('mouseup', up)
            .off('touchmove', move)
            .off('touchend', up);
    }
});

