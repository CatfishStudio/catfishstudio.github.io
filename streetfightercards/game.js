var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StreetFighterCards;
(function (StreetFighterCards) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, {
                enableDebug: false,
                width: Constants.GAME_WIDTH,
                height: Constants.GAME_HEIGHT,
                renderer: Phaser.AUTO,
                parent: 'content',
                transparent: true,
                antialias: true,
                forceSetTimeOut: false
            });
            this.state.add(StreetFighterCards.Boot.Name, StreetFighterCards.Boot, false);
            this.state.add(StreetFighterCards.Preloader.Name, StreetFighterCards.Preloader, false);
            this.state.add(StreetFighterCards.Menu.Name, StreetFighterCards.Menu, false);
            this.state.add(StreetFighterCards.ChoiceFighter.Name, StreetFighterCards.ChoiceFighter, false);
        }
        Game.getInstance = function () {
            if (StreetFighterCards.Game.instance === null) {
                Game.instance = new Game();
            }
            return Game.instance;
        };
        Game.prototype.start = function () {
            this.state.start(StreetFighterCards.Boot.Name);
        };
        Game.instance = null;
        return Game;
    }(Phaser.Game));
    StreetFighterCards.Game = Game;
})(StreetFighterCards || (StreetFighterCards = {}));
var Constants = (function () {
    function Constants() {
    }
    Constants.GAME_WIDTH = 800;
    Constants.GAME_HEIGHT = 600;
    Constants.BUTTON_PLAY = 'button_play';
    Constants.BUTTON_SETTINGS = 'button_settings';
    Constants.BUTTON_SETTINGS_CLOSE = 'button_settings_close';
    Constants.BUTTON_INVATE = 'button_invate';
    Constants.BUTTON_BACK = 'button_back';
    Constants.BUTTON_SELECT = 'button_select';
    Constants.BUTTON_ARROW_LEFT = 'button_arrow_left';
    Constants.BUTTON_ARROW_RIGHT = 'button_arrow_right';
    return Constants;
}());
var Config = (function () {
    function Config() {
    }
    Config.settingSound = true;
    Config.settingMusic = true;
    Config.settingTutorial = true;
    return Config;
}());
var Images = (function () {
    function Images() {
    }
    Images.PreloaderImage = 'preloader.png';
    Images.MenuImage = 'menu.png';
    Images.BorderImage = 'border.png';
    Images.ChoiceImage = 'choice.png';
    Images.ArrowLeft = 'arrow_left.png';
    Images.ArrowRight = 'arrow_right.png';
    Images.TutorialImage = 'tutorial.png';
    Images.ButtonOff = 'buttons_off.png';
    Images.ButtonOn = 'buttons_on.png';
    Images.preloadList = [
        Images.MenuImage,
        Images.BorderImage,
        Images.ChoiceImage,
        Images.ArrowLeft,
        Images.ArrowRight,
        Images.TutorialImage,
        Images.ButtonOff,
        Images.ButtonOn,
    ];
    return Images;
}());
var Atlases = (function () {
    function Atlases() {
    }
    Atlases.BigKen = 'BigKen';
    Atlases.BigRyu = 'BigRyu';
    Atlases.BigCards = 'BigCards';
    Atlases.preloadList = [
        Atlases.BigKen,
        Atlases.BigRyu,
        Atlases.BigCards,
    ];
    return Atlases;
}());
var Sheet = (function () {
    function Sheet() {
    }
    Sheet.ButtonStyle1 = 'button_style_1_sheet.png';
    Sheet.ButtonStyle2 = 'button_style_2_sheet.png';
    Sheet.preloadList = [
        Sheet.ButtonStyle1,
        Sheet.ButtonStyle2,
    ];
    return Sheet;
}());
var GameData;
(function (GameData) {
    var Data = (function () {
        function Data() {
        }
        Data.fighters = [
            [0, 'Akuma', 'akuma_card.png'],
            [1, 'Alex', 'alex_card.png'],
            [2, 'Chun Li', 'chun_li_card.png'],
            [3, 'Dudley', 'dudley_card.png'],
            [4, 'Elena', 'elena_card.png'],
            [5, 'Gill', 'gill_card.png'],
            [6, 'Hugo', 'hugo_card.png'],
            [7, 'Ibuki', 'ibuki_card.png'],
            [8, 'Ken', 'ken_card.png'],
            [9, 'Makoto', 'makoto_card.png'],
            [10, 'Necro', 'necro_card.png'],
            [11, 'Oro', 'oro_card.png'],
            [12, 'Q', 'q_card.png'],
            [13, 'Remy', 'remy_card.png'],
            [14, 'Ryu', 'ryu_card.png'],
            [15, 'Sean', 'sean_card.png'],
            [16, 'Twelve', 'twelve_card.png'],
            [17, 'Urien', 'urien_card.png'],
            [18, 'Yang', 'yang_card.png'],
            [19, 'Yun', 'yun_card.png']
        ];
        Data.fighterIndex = 0;
        return Data;
    }());
    GameData.Data = Data;
})(GameData || (GameData = {}));
var Fabrique;
(function (Fabrique) {
    var Tutorial = (function (_super) {
        __extends(Tutorial, _super);
        function Tutorial(game, text) {
            _super.call(this, game, 25, 600, Images.TutorialImage);
            this.text = text;
            this.init();
        }
        Tutorial.prototype.shutdown = function () {
            this.tween.stop();
            this.removeChild(this.dialog);
        };
        Tutorial.prototype.init = function () {
            this.tween = this.game.add.tween(this);
            this.tween.to({ x: this.x, y: this.y - 225 }, 750, 'Linear');
            this.tween.onComplete.add(this.onComplete, this);
            this.tween.start();
        };
        Tutorial.prototype.onComplete = function () {
            this.createDialog();
        };
        Tutorial.prototype.createDialog = function () {
            this.dialog = new Phaser.Sprite(this.game, 0, 0);
            var graphics = this.game.add.graphics(0, 0);
            graphics.beginFill(0xFFFFFF, 1);
            graphics.lineStyle(2, 0x000000, 1);
            graphics.moveTo(-20, 20);
            graphics.lineTo(5, 30);
            graphics.lineTo(5, 47);
            graphics.lineTo(-20, 20);
            graphics.endFill();
            graphics.beginFill(0xFFFFFF, 1);
            graphics.lineStyle(0, 0x000000, 1);
            graphics.drawRoundedRect(0, 0, 200, 50, 15);
            graphics.endFill();
            graphics.beginFill(0xFFFFFF, 0);
            graphics.lineStyle(2, 0x000000, 1);
            graphics.drawRoundedRect(0, 0, 200, 50, 15);
            graphics.endFill();
            graphics.beginFill(0xFFFFFF, 1);
            graphics.lineStyle(1, 0xFFFFFF, 1);
            graphics.drawRect(-1, 28, 4, 11);
            graphics.endFill();
            this.dialog.addChild(graphics);
            var messageText = this.game.add.text(5, 5, this.text, { font: "18px Georgia", fill: "#000000", align: "left" });
            this.dialog.addChild(messageText);
            this.dialog.x = 110;
            this.dialog.y = 75;
            this.addChild(this.dialog);
            this.tweenDialogStart();
        };
        Tutorial.prototype.tweenDialogStart = function () {
            this.tween = this.game.add.tween(this.dialog);
            this.tween.to({ x: this.dialog.x + 25, y: this.dialog.y }, 1000, 'Linear');
            this.tween.onComplete.add(this.tweenDialogEnd, this);
            this.tween.start();
        };
        Tutorial.prototype.tweenDialogEnd = function () {
            this.tween = this.game.add.tween(this.dialog);
            this.tween.to({ x: this.dialog.x - 25, y: this.dialog.y }, 1000, 'Linear');
            this.tween.onComplete.add(this.tweenDialogStart, this);
            this.tween.start();
        };
        return Tutorial;
    }(Phaser.Sprite));
    Fabrique.Tutorial = Tutorial;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Settings = (function (_super) {
        __extends(Settings, _super);
        function Settings(game, parent) {
            _super.call(this, game, parent);
            this.init();
        }
        Settings.prototype.init = function () {
            this.event = new Phaser.Signal();
            var startX = (Constants.GAME_WIDTH / 2) - 150;
            var startY = (Constants.GAME_HEIGHT / 2) - 150;
            /* background and border */
            var polygon = new Phaser.Polygon([
                new Phaser.Point(startX, startY),
                new Phaser.Point(startX + 10, startY - 10),
                new Phaser.Point(startX + 300, startY - 10),
                new Phaser.Point(startX + 310, startY),
                new Phaser.Point(startX + 310, startY + 200),
                new Phaser.Point(startX + 300, startY + 210),
                new Phaser.Point(startX + 10, startY + 210),
                new Phaser.Point(startX, startY + 200)
            ]);
            var graphicOverlay = new Phaser.Graphics(this.game, 0, 0);
            graphicOverlay.beginFill(0x000000, 0.5);
            graphicOverlay.drawRect(0, 0, this.game.width, this.game.height);
            graphicOverlay.endFill();
            graphicOverlay.beginFill(0xFFFFFF, 0.95);
            graphicOverlay.lineStyle(2, 0x777777, 1);
            graphicOverlay.drawPolygon(polygon);
            graphicOverlay.endFill();
            graphicOverlay.inputEnabled = true;
            this.addChild(graphicOverlay);
            /* title */
            var title = new Phaser.Text(this.game, startX + 35, startY + 5, "НАСТРОЙКИ ИГРЫ", { font: "24px Georgia", fill: "#222222", align: "left" });
            this.addChild(title);
            /* sound */
            var buttonSound;
            if (Config.settingSound === true)
                buttonSound = new Phaser.Button(this.game, startX + 25, startY + 50, Images.ButtonOn, this.onButtonClick, this);
            else
                buttonSound = new Phaser.Button(this.game, startX + 25, startY + 50, Images.ButtonOff, this.onButtonClick, this);
            buttonSound.name = 'sound';
            this.addChild(buttonSound);
            var labelSound = new Phaser.Text(this.game, startX + 90, startY + 55, "Звук", { font: "18px Georgia", fill: "#222222", align: "left" });
            this.addChild(labelSound);
            /* music */
            var buttonMusic;
            if (Config.settingMusic === true)
                buttonMusic = new Phaser.Button(this.game, startX + 155, startY + 50, Images.ButtonOn, this.onButtonClick, this);
            else
                buttonMusic = new Phaser.Button(this.game, startX + 155, startY + 50, Images.ButtonOff, this.onButtonClick, this);
            buttonMusic.name = 'music';
            this.addChild(buttonMusic);
            var labelMusic = new Phaser.Text(this.game, startX + 220, startY + 55, "Музыка", { font: "18px Georgia", fill: "#222222", align: "left" });
            this.addChild(labelMusic);
            /* tutorial */
            var buttonTutorial;
            if (Config.settingTutorial === true)
                buttonTutorial = new Phaser.Button(this.game, startX + 25, startY + 100, Images.ButtonOn, this.onButtonClick, this);
            else
                buttonTutorial = new Phaser.Button(this.game, startX + 25, startY + 100, Images.ButtonOff, this.onButtonClick, this);
            buttonTutorial.name = 'tutorial';
            this.addChild(buttonTutorial);
            var labelTutorial = new Phaser.Text(this.game, startX + 90, startY + 105, "Обучение в игре", { font: "18px Georgia", fill: "#222222", align: "left" });
            this.addChild(labelTutorial);
            /* button close */
            this.buttonClose = new Fabrique.ButtonComix(this.game, this, Constants.BUTTON_SETTINGS_CLOSE, 'ЗАКРЫТЬ', 50, startX + 60, startY + 150);
            this.buttonClose.event.add(this.onButtonCloseClick, this);
            this.updateTransform();
        };
        Settings.prototype.onButtonCloseClick = function (event) {
            this.buttonClose.shutdown();
            this.removeAll();
            this.event.dispatch(event);
        };
        Settings.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case 'sound':
                    {
                        if (Config.settingSound === true) {
                            Config.settingSound = false;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOff, this.onButtonClick, this);
                            event.name = 'sound';
                            this.addChild(event);
                        }
                        else {
                            Config.settingSound = true;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOn, this.onButtonClick, this);
                            event.name = 'sound';
                            this.addChild(event);
                        }
                        break;
                    }
                case 'music':
                    {
                        if (Config.settingMusic === true) {
                            Config.settingMusic = false;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOff, this.onButtonClick, this);
                            event.name = 'music';
                            this.addChild(event);
                        }
                        else {
                            Config.settingMusic = true;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOn, this.onButtonClick, this);
                            event.name = 'music';
                            this.addChild(event);
                        }
                        break;
                    }
                case 'tutorial':
                    {
                        if (Config.settingTutorial === true) {
                            Config.settingTutorial = false;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOff, this.onButtonClick, this);
                            event.name = 'tutorial';
                            this.addChild(event);
                        }
                        else {
                            Config.settingTutorial = true;
                            this.removeChild(event);
                            event = new Phaser.Button(this.game, event.x, event.y, Images.ButtonOn, this.onButtonClick, this);
                            event.name = 'tutorial';
                            this.addChild(event);
                        }
                        break;
                    }
                default:
                    break;
            }
        };
        return Settings;
    }(Phaser.Group));
    Fabrique.Settings = Settings;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var ButtonOrange = (function (_super) {
        __extends(ButtonOrange, _super);
        function ButtonOrange(game, parent, name, text, textX, x, y) {
            _super.call(this, game, parent);
            this.init(name, text, textX, x, y);
        }
        ButtonOrange.prototype.shutdown = function () {
            this.removeAll();
        };
        ButtonOrange.prototype.init = function (name, text, textX, x, y) {
            this.x = x;
            this.y = y;
            this.event = new Phaser.Signal();
            var button = new Phaser.Button(this.game, 0, 0, Sheet.ButtonStyle1, this.onButtonClick, this, 1, 2);
            button.name = name;
            this.addChild(button);
            var textBack = new Phaser.Text(this.game, textX - 1, 14, text, { font: "16px Arial Black", fill: "#FFFFFF" });
            this.addChild(textBack);
            var textFront = new Phaser.Text(this.game, textX, 15, text, { font: "16px Arial Black", fill: "#9B372C" });
            this.addChild(textFront);
        };
        ButtonOrange.prototype.onButtonClick = function (event) {
            this.event.dispatch(event);
        };
        return ButtonOrange;
    }(Phaser.Group));
    Fabrique.ButtonOrange = ButtonOrange;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var ButtonComix = (function (_super) {
        __extends(ButtonComix, _super);
        function ButtonComix(game, parent, name, text, textX, x, y) {
            _super.call(this, game, parent);
            this.init(name, text, textX, x, y);
        }
        ButtonComix.prototype.shutdown = function () {
            this.removeAll();
        };
        ButtonComix.prototype.init = function (name, text, textX, x, y) {
            this.x = x;
            this.y = y;
            this.event = new Phaser.Signal();
            var button = new Phaser.Button(this.game, 0, 0, Sheet.ButtonStyle2, this.onButtonClick, this, 1, 2);
            button.name = name;
            button.events.onInputOut.add(this.onButtonInputOut, this);
            button.events.onInputOver.add(this.onButtonInputOver, this);
            this.addChild(button);
            this.textButton = new Phaser.Text(this.game, textX, 20, text, { font: "16px Arial Black", fill: "#666666" });
            this.addChild(this.textButton);
        };
        ButtonComix.prototype.onButtonClick = function (event) {
            this.event.dispatch(event);
        };
        ButtonComix.prototype.onButtonInputOut = function (event) {
            this.textButton.fill = "#666666";
        };
        ButtonComix.prototype.onButtonInputOver = function (event) {
            this.textButton.fill = "#9E32EC";
        };
        return ButtonComix;
    }(Phaser.Group));
    Fabrique.ButtonComix = ButtonComix;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var AnimationBigKen = (function (_super) {
        __extends(AnimationBigKen, _super);
        function AnimationBigKen(game) {
            _super.call(this, game, 0, 0, Atlases.BigKen, 0);
            this.init();
        }
        AnimationBigKen.prototype.init = function () {
            var anim = this.animations.add(Atlases.BigKen);
            anim.onComplete.add(this.onCompleteVideo, this);
            anim.play(10, true, false);
        };
        AnimationBigKen.prototype.onCompleteVideo = function () {
        };
        return AnimationBigKen;
    }(Phaser.Sprite));
    Fabrique.AnimationBigKen = AnimationBigKen;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var AnimationBigRyu = (function (_super) {
        __extends(AnimationBigRyu, _super);
        function AnimationBigRyu(game) {
            _super.call(this, game, 0, 0, Atlases.BigRyu, 0);
            this.init();
        }
        AnimationBigRyu.prototype.init = function () {
            var anim = this.animations.add(Atlases.BigRyu);
            anim.onComplete.add(this.onCompleteVideo, this);
            anim.play(10, true, false);
        };
        AnimationBigRyu.prototype.onCompleteVideo = function () {
        };
        return AnimationBigRyu;
    }(Phaser.Sprite));
    Fabrique.AnimationBigRyu = AnimationBigRyu;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var FighterCard = (function (_super) {
        __extends(FighterCard, _super);
        function FighterCard(game, x, y, data) {
            _super.call(this, game, x, y, Atlases.BigCards, data.frame);
            this.dataFighter = data;
            this.init();
        }
        FighterCard.prototype.init = function () {
            this.damageText = this.game.add.text(5, 240, "5%", { font: "18px Arial", fill: "#FFFFFF", align: "left" });
            this.addChild(this.damageText);
            this.defenseText = this.game.add.text(5, 45, "10%", { font: "18px Arial", fill: "#FFFFFF", align: "left" });
            this.addChild(this.defenseText);
        };
        return FighterCard;
    }(Phaser.Sprite));
    Fabrique.FighterCard = FighterCard;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Slides = (function (_super) {
        __extends(Slides, _super);
        function Slides(game, parent) {
            _super.call(this, game, parent);
            this.fighters = [];
            this.init();
            this.createSlides();
        }
        Slides.prototype.shutdown = function () {
            this.slideGroup.removeAll();
            this.removeAll();
        };
        Slides.prototype.init = function () {
            GameData.Data.fighterIndex = 1;
            for (var i = 0; i < GameData.Data.fighters.length; i++) {
                var fighter = {};
                fighter.id = GameData.Data.fighters[i][0];
                fighter.name = GameData.Data.fighters[i][1];
                fighter.frame = GameData.Data.fighters[i][2];
                this.fighters.push(fighter);
            }
            this.canClick = true;
        };
        Slides.prototype.createSlides = function () {
            this.slideGroup = new Phaser.Group(this.game, this);
            var posX = 5;
            var posY = 90;
            for (var i = 0; i < this.fighters.length; i++) {
                var fCard = new Fabrique.FighterCard(this.game, posX + (300 * i), posY, this.fighters[i]);
                this.slideGroup.addChild(fCard);
            }
            this.buttonLeft = new Phaser.Button(this.game, 205, 190, Images.ArrowLeft, this.onButtonClick, this);
            this.buttonLeft.name = Constants.BUTTON_ARROW_LEFT;
            this.addChild(this.buttonLeft);
            this.buttonRight = new Phaser.Button(this.game, 505, 190, Images.ArrowRight, this.onButtonClick, this);
            this.buttonRight.name = Constants.BUTTON_ARROW_RIGHT;
            this.addChild(this.buttonRight);
        };
        Slides.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case Constants.BUTTON_ARROW_LEFT:
                    {
                        if (this.canClick) {
                            this.canClick = false;
                            GameData.Data.fighterIndex--;
                            var tween = this.game.add.tween(this.slideGroup);
                            tween.to({ x: this.slideGroup.x + 300 }, 250, 'Linear');
                            tween.onComplete.add(this.onTweenComplete, this);
                            tween.start();
                        }
                        break;
                    }
                case Constants.BUTTON_ARROW_RIGHT:
                    {
                        if (this.canClick) {
                            this.canClick = false;
                            GameData.Data.fighterIndex++;
                            var tween = this.game.add.tween(this.slideGroup);
                            tween.to({ x: this.slideGroup.x - 300 }, 250, 'Linear');
                            tween.onComplete.add(this.onTweenComplete, this);
                            tween.start();
                        }
                        break;
                    }
                default:
                    break;
            }
        };
        Slides.prototype.onTweenComplete = function (event) {
            if (GameData.Data.fighterIndex === 0) {
                this.buttonLeft.visible = false;
                this.buttonRight.visible = true;
            }
            else if (GameData.Data.fighterIndex === this.fighters.length - 1) {
                this.buttonLeft.visible = true;
                this.buttonRight.visible = false;
            }
            else {
                this.buttonLeft.visible = true;
                this.buttonRight.visible = true;
            }
            this.canClick = true;
        };
        return Slides;
    }(Phaser.Group));
    Fabrique.Slides = Slides;
})(Fabrique || (Fabrique = {}));
var StreetFighterCards;
(function (StreetFighterCards) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.call(this);
            this.name = Boot.Name;
        }
        /*
        * Загружаем ассеты необходимые для прелоадера
        */
        Boot.prototype.init = function () {
            // отключаем контекстное меню
            this.game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            };
        };
        Boot.prototype.preload = function () {
            this.game.load.image(Images.PreloaderImage, 'assets/images/' + Images.PreloaderImage);
        };
        Boot.prototype.create = function () {
            var _this = this;
            this.game.state.start(StreetFighterCards.Preloader.Name, true, false, {
                nextStage: StreetFighterCards.Menu.Name,
                preloadHandler: function () {
                    Images.preloadList.forEach(function (assetName) {
                        _this.game.load.image(assetName, 'assets/images/' + assetName);
                    });
                    Atlases.preloadList.forEach(function (assetName) {
                        _this.game.load.atlas(assetName, 'assets/atlas/' + assetName + '.png', 'assets/atlas/' + assetName + '.json');
                    });
                    /*
                    Sheet.preloadList.forEach((assetName: string) => {
                        this.game.load.spritesheet(assetName, 'assets/images/' + assetName, 186, 46);
                    });
                    */
                    _this.game.load.spritesheet(Sheet.preloadList[0], 'assets/images/' + Sheet.preloadList[0], 186, 46);
                    _this.game.load.spritesheet(Sheet.preloadList[1], 'assets/images/' + Sheet.preloadList[1], 187, 56);
                }
            });
        };
        Boot.prototype.shutdown = function () {
            //this.game.stage.removeChildren();
        };
        Boot.Name = 'booter';
        return Boot;
    }(Phaser.State));
    StreetFighterCards.Boot = Boot;
})(StreetFighterCards || (StreetFighterCards = {}));
var StreetFighterCards;
(function (StreetFighterCards) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.call(this);
            this.name = Preloader.Name;
            this.loadPercent = 0;
        }
        Preloader.prototype.init = function (config) {
            this.config = config;
        };
        Preloader.prototype.preload = function () {
            this.game.add.sprite(0, 0, Images.PreloaderImage);
            this.game.load.onLoadStart.add(this.onLoadStart, this);
            this.game.load.onFileComplete.add(this.onFileComplete, this);
            this.game.load.onLoadComplete.add(this.onLoadComplete, this);
            this.config.preloadHandler();
            if (this.game.load.totalQueuedFiles() === 0) {
                this.onLoadComplete();
            }
        };
        Preloader.prototype.onLoadStart = function () {
            this.preloadText = this.game.add.text(310, 490, "ЗАГРУЗКА 0%", { font: "24px Georgia", fill: "#000000" });
        };
        Preloader.prototype.onFileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this.loadPercent = Math.round(progress * 0.1);
            if (this.loadPercent <= 0)
                this.loadPercent = 1;
            if (this.preloadText !== null) {
                this.preloadText.text = "ЗАГРУЗКА " + this.loadPercent + "0 %";
            }
        };
        Preloader.prototype.onLoadComplete = function () {
            this.game.stage.removeChildren();
            this.game.state.start(this.config.nextStage, true, false);
        };
        Preloader.Name = "preloader";
        return Preloader;
    }(Phaser.State));
    StreetFighterCards.Preloader = Preloader;
})(StreetFighterCards || (StreetFighterCards = {}));
var StreetFighterCards;
(function (StreetFighterCards) {
    var Settings = Fabrique.Settings;
    var ButtonOrange = Fabrique.ButtonOrange;
    var AnimationBigKen = Fabrique.AnimationBigKen;
    var AnimationBigRyu = Fabrique.AnimationBigRyu;
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.call(this);
            this.name = Menu.Name;
        }
        Menu.prototype.create = function () {
            this.groupMenu = new Phaser.Group(this.game, this.stage);
            this.menuSprite = new Phaser.Sprite(this.game, 0, 0, Images.MenuImage);
            this.groupMenu.addChild(this.menuSprite);
            var bigKen = new AnimationBigKen(this.game);
            bigKen.scale.setTo(0.4, 0.4);
            bigKen.x = 35;
            bigKen.y = 225;
            this.groupMenu.addChild(bigKen);
            var bigRyu = new AnimationBigRyu(this.game);
            bigRyu.scale.setTo(0.4, 0.4);
            bigRyu.x = 555;
            bigRyu.y = 225;
            this.groupMenu.addChild(bigRyu);
            this.createButtons();
        };
        Menu.prototype.shutdown = function () {
            this.buttonStart.shutdown();
            this.buttonSettings.shutdown();
            this.buttonInvate.shutdown();
            this.groupMenu.removeAll();
            this.groupButtons.removeAll();
            this.game.stage.removeChildren();
        };
        Menu.prototype.createButtons = function () {
            this.groupButtons = new Phaser.Group(this.game, this.groupMenu);
            this.groupButtons.x = 300;
            this.groupButtons.y = 300;
            this.buttonStart = new ButtonOrange(this.game, this.groupButtons, Constants.BUTTON_PLAY, 'НАЧАТЬ ИГРУ', 30, 0, 0);
            this.buttonStart.event.add(this.onButtonClick, this);
            this.buttonSettings = new ButtonOrange(this.game, this.groupButtons, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 35, 0, 50);
            this.buttonSettings.event.add(this.onButtonClick, this);
            this.buttonInvate = new ButtonOrange(this.game, this.groupButtons, Constants.BUTTON_INVATE, 'ПРИГЛАСИТЬ', 30, 0, 100);
            this.buttonSettings.event.add(this.onButtonClick, this);
        };
        Menu.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case Constants.BUTTON_PLAY:
                    {
                        this.game.state.start(StreetFighterCards.ChoiceFighter.Name, true, false);
                        break;
                    }
                case 'continue':
                    {
                        break;
                    }
                case Constants.BUTTON_SETTINGS:
                    {
                        this.settingsCreate();
                        break;
                    }
                case Constants.BUTTON_SETTINGS_CLOSE:
                    {
                        this.settingsClose();
                        break;
                    }
                case Constants.BUTTON_INVATE:
                    {
                        break;
                    }
                default:
                    break;
            }
        };
        Menu.prototype.settingsCreate = function () {
            this.settings = new Settings(this.game, this.groupMenu);
            this.settings.event.add(this.onButtonClick, this);
        };
        Menu.prototype.settingsClose = function () {
            this.settings.removeAll();
            this.groupMenu.removeChild(this.settings);
        };
        Menu.Name = "menu";
        return Menu;
    }(Phaser.State));
    StreetFighterCards.Menu = Menu;
})(StreetFighterCards || (StreetFighterCards = {}));
var StreetFighterCards;
(function (StreetFighterCards) {
    var ButtonComix = Fabrique.ButtonComix;
    var Slides = Fabrique.Slides;
    var Tutorial = Fabrique.Tutorial;
    var Settings = Fabrique.Settings;
    var ChoiceFighter = (function (_super) {
        __extends(ChoiceFighter, _super);
        function ChoiceFighter() {
            _super.call(this);
            this.name = StreetFighterCards.Menu.Name;
        }
        ChoiceFighter.prototype.create = function () {
            this.groupWindow = new Phaser.Group(this.game, this.stage);
            this.createBackground();
            this.createButtons();
            this.createSlides();
            this.createTutorial();
            this.createBorder();
        };
        ChoiceFighter.prototype.shutdown = function () {
            this.slides.shutdown();
            this.buttonBack.shutdown();
            this.buttonSelect.shutdown();
            this.buttonSettings.shutdown();
            this.tutorial.shutdown();
            this.groupWindow.removeAll();
            this.game.stage.removeChildren();
        };
        ChoiceFighter.prototype.createBackground = function () {
            var backgroundSprite = new Phaser.Sprite(this.game, 0, 0, Images.ChoiceImage);
            this.groupWindow.addChild(backgroundSprite);
        };
        ChoiceFighter.prototype.createButtons = function () {
            this.buttonBack = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_BACK, 'НАЗАД', 55, 10, 10);
            this.buttonBack.event.add(this.onButtonClick, this);
            this.buttonSettings = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 35, 300, 530);
            this.buttonSettings.event.add(this.onButtonClick, this);
            this.buttonSelect = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_SELECT, 'ВЫБРАТЬ', 50, 600, 530);
            this.buttonSelect.event.add(this.onButtonClick, this);
        };
        ChoiceFighter.prototype.createSlides = function () {
            this.slides = new Slides(this.game, this.groupWindow);
        };
        ChoiceFighter.prototype.createTutorial = function () {
            this.tutorial = new Tutorial(this.game, 'Выберите персонаж!');
            this.groupWindow.addChild(this.tutorial);
        };
        ChoiceFighter.prototype.createBorder = function () {
            var borderSprite = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.groupWindow.addChild(borderSprite);
        };
        ChoiceFighter.prototype.settingsCreate = function () {
            this.settings = new Settings(this.game, this.groupWindow);
            this.settings.event.add(this.onButtonClick, this);
        };
        ChoiceFighter.prototype.settingsClose = function () {
            this.settings.removeAll();
            this.groupWindow.removeChild(this.settings);
        };
        ChoiceFighter.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case Constants.BUTTON_BACK:
                    {
                        this.game.state.start(StreetFighterCards.Menu.Name, true, false);
                        break;
                    }
                case Constants.BUTTON_SETTINGS:
                    {
                        this.settingsCreate();
                        break;
                    }
                case Constants.BUTTON_SETTINGS_CLOSE:
                    {
                        this.settingsClose();
                        break;
                    }
                default:
                    break;
            }
        };
        ChoiceFighter.Name = "choce_fighter";
        return ChoiceFighter;
    }(Phaser.State));
    StreetFighterCards.ChoiceFighter = ChoiceFighter;
})(StreetFighterCards || (StreetFighterCards = {}));
/// <reference path="..\node_modules\phaser-ce\typescript\phaser.d.ts" />
/// <reference path="Data\Constants.ts" />
/// <reference path="Data\Config.ts" />
/// <reference path="Data\Images.ts" />
/// <reference path="Data\Atlases.ts" />
/// <reference path="Data\Sheets.ts" />
/// <reference path="Data\Game.ts" />
/// <reference path="Fabrique\Objects\Tutorial.ts" />
/// <reference path="Fabrique\Objects\Settings.ts" />
/// <reference path="Fabrique\Objects\ButtonOrange.ts" />
/// <reference path="Fabrique\Objects\ButtonComix.ts" />
/// <reference path="Fabrique\Objects\AnimationBigKen.ts" />
/// <reference path="Fabrique\Objects\AnimationBigRyu.ts" />
/// <reference path="Fabrique\Objects\FighterBigCard.ts" />
/// <reference path="Fabrique\Objects\Slides.ts" />
/// <reference path="States\Boot.ts" />
/// <reference path="States\Preloader.ts" />
/// <reference path="States\Menu.ts" />
/// <reference path="States\ChoiceFighter.ts" />
/// <reference path="app.ts" /> 
