(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('handlebars'));
    } else if (typeof define === 'function' && define.amd) {
        define(['handlebars'], factory);
    } else {
        root.HandlebarsHelpersRegistry = factory(root.Handlebars);
    }
}(this, function (Handlebars) {

    var isArray = function (value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    };

    var ExpressionRegistry = function () {
        this.expressions = [];
    };

    ExpressionRegistry.prototype.add = function (operator, method) {
        this.expressions[operator] = method;
    };

    ExpressionRegistry.prototype.call = function (operator, left, right) {
        if (!this.expressions.hasOwnProperty(operator)) {
            throw new Error('Unknown operator "' + operator + '"');
        }

        return this.expressions[operator](left, right);
    };

    var eR = new ExpressionRegistry(); //ho aggiunto le parentesi: Lorenzo
    eR.add('not', function (left, right) {
        return left != right;
    });
    eR.add('>', function (left, right) {
        return left > right;
    });
    eR.add('<', function (left, right) {
        return left < right;
    });
    eR.add('>=', function (left, right) {
        return left >= right;
    });
    eR.add('<=', function (left, right) {
        return left <= right;
    });
    eR.add('===', function (left, right) {
        return left === right;
    });
    eR.add('!==', function (left, right) {
        return left !== right;
    });
    eR.add('in', function (left, right) {
        if (!isArray(right)) {
            right = right.split(',');
        }
        return right.indexOf(left) !== -1;
    });

    var absHelper = function () {
        return Math.round(Math.abs(arguments[0]) * 100) / 100;
    };
    Handlebars.registerHelper('abs', absHelper);

    var mathHelper = function () {
        var v1 = arguments[0],
            operator = arguments[1],
            v2 = arguments[2];
        switch (operator) {
            case '+':
                {
                    return v1 + v2;
                }
            case '-':
                {
                    return v1 - v2;
                }
        }
    };
    Handlebars.registerHelper('math', mathHelper);

    var surroundHashtagsHelper = function () {
        var value = arguments[0];
        if (value) {
            return value.replace(/(#[^ ]+)/gi, '<span class="tag">$1</span>');
        } else {
            return '';
        }
    };

    Handlebars.registerHelper('surroundHashtags', surroundHashtagsHelper);

    var compareHelper = function () {
        var args = arguments,
            operator = args[0],
            v1 = args[1],
            v2 = args[2],
            options = args[3];
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    };

    Handlebars.registerHelper('compare', compareHelper);

    var isHelper = function () {
        var args = arguments,
            left = args[0],
            operator = args[1],
            right = args[2],
            options = args[3];

        if (args.length == 2) {
            options = args[1];
            if (left) return options.fn(this);
            return options.inverse(this);
        }

        if (args.length == 3) {
            right = args[1];
            options = args[2];
            if (left == right) return options.fn(this);
            return options.inverse(this);
        }

        if (eR.call(operator, left, right)) {
            return options.fn(this);
        }
        return options.inverse(this);
    };

    Handlebars.registerHelper('is', isHelper);

    Handlebars.registerHelper('nl2br', function (text) {
        var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
        return new Handlebars.SafeString(nl2br);
    });

    Handlebars.registerHelper('log', function () {
        ['Values:'].concat(Array.prototype.slice.call(arguments, 0, -1));
    });

    Handlebars.registerHelper('debug', function () {
        ['Values:'].concat(Array.prototype.slice.call(arguments, 0, -1));
    });

    function number2arr(number) {
        var value = number.toString();
        value = value.replace(",", ".");

        var amountArr = ('' + value).split('.', 2);
        if (amountArr[1] === undefined) {
            amountArr[1] = '00';
        } else if (amountArr[1].length > 2) {
            amountArr[1] = amountArr[1].substr(0, 2);
        } else if (amountArr[1].length < 2) {
            amountArr[1] += '0';
        }
        return amountArr;
    }

    Handlebars.registerHelper('percentageString', function (percentage) {
        return Math.round(percentage * 100);
    });

    Handlebars.registerHelper('truncate', function (text, limit) {
        var dots = '...';
        if (limit > text.length) {
            limit = text.length;
            dots = '';
        }
        return text.substr(0, limit) + dots;
    });

    Handlebars.registerHelper('activeFunctionality', function (value) {
        if (value === true) {
            return 'play';
        } else {
            return 'pause';
        }
    });

    Handlebars.registerHelper('activeFunctionalityPadlock', function (value) {
        if (value === true) {
            return 'unlocked';
        } else {
            return 'locked';
        }
    });

    Handlebars.registerHelper('splitPAN', function (PAN) {
        var parts = PAN.match(/[\s\S]{1,4}/g) || [];
        var ret = "";

        for (var i = 0, j = parts.length; i < j; i++) {
            ret = ret + "<span>" + parts[i] + "</span>";
        }

        return new Handlebars.SafeString(ret);
    });

    Handlebars.registerHelper('niceDate', function (date) {
        return moment(new Date(date)).calendar();
    });

    Handlebars.registerHelper('expireDate', function (date) {
        return moment(new Date(date)).format('MM/YY');
    });


    Handlebars.registerHelper('initials', function (firstName, lastName, nickname) {
        var firstNameInitial = '',
            lastNameInitial = '';
        if (firstName) {
            firstNameInitial = firstName[0];
        }
        if (lastName) {
            lastNameInitial = lastName[0];
        }
        if (firstNameInitial + lastNameInitial === '') {
            return nickname[0];
        }
        return (firstNameInitial + lastNameInitial).toUpperCase();
    });

    Handlebars.registerHelper('formatNumberSimple', function (amount) {
        var amountArr = number2arr(amount);
        return new Handlebars.SafeString(
            '<span>' + amountArr[0] + '</span><span class="decimals">,' + amountArr[1] + '</span>');
    });

    Handlebars.registerHelper('formatNumber', function (amount) {
        var amountArr = number2arr(amount);
        return new Handlebars.SafeString(
            '<span class="euro">&euro;</span><span>' + amountArr[0] + '</span><span class="decimals">,' + amountArr[1] + '</span>');
    });

    Handlebars.registerHelper('lowercase', function (str) {
        if (!str) {
            return "";
        } else {
            return str.toLowerCase();
        }
    });

    Handlebars.registerHelper('uppercase', function (str) {
        if (!str) {
            return "";
        } else {
            return str.toUpperCase();
        }
    });

    Handlebars.registerHelper('capitalize', function (str) {
        if (!str) {
            return "";
        } else {
            return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
        }
    });

    Handlebars.registerHelper('mobilePhoneNumber', function (str) {
        if (!str) {
            return "";
        } else {
            var clean = str.replace("+39", "");
            var prefix = clean.substr(0, 3);
            var number = clean.substr(3, clean.length - 1);
            var italianPrefix = "+39";

            var result = new Handlebars.SafeString("<span>" + italianPrefix + "</span>" + "<span>" + prefix + "</span>" + "<span>" + number + "</span>");

            return result;
        }
    });

    return eR;

}));
