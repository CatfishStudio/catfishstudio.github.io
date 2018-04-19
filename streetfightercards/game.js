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
            this.state.add(StreetFighterCards.Tournament.Name, StreetFighterCards.Tournament, false);
            this.state.add(StreetFighterCards.Level.Name, StreetFighterCards.Level, false);
        }
        Game.getInstance = function () {
            if (StreetFighterCards.Game.instance === null) {
                Game.instance = new Game();
            }
            return Game.instance;
        };
        Game.prototype.start = function () {
            Game.instance.onBlur.add(this.onGameBlur, this);
            Game.instance.onFocus.add(this.onGameFocus, this);
            Game.instance.onPause.add(this.onGamePause, this);
            Game.instance.onResume.add(this.onGameResume, this);
            this.state.start(StreetFighterCards.Boot.Name);
        };
        Game.prototype.onGameBlur = function () {
            var events = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                events[_i - 0] = arguments[_i];
            }
            Utilits.Data.debugLog('-- Blur --', events);
        };
        Game.prototype.onGameFocus = function () {
            var events = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                events[_i - 0] = arguments[_i];
            }
            Utilits.Data.debugLog('-- Focus --', events);
            //this.stage.disableVisibilityChange = false;
        };
        Game.prototype.onGamePause = function () {
            var events = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                events[_i - 0] = arguments[_i];
            }
            Utilits.Data.debugLog('-- Pause --', events);
            //this.stage.disableVisibilityChange = true;
        };
        Game.prototype.onGameResume = function () {
            var events = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                events[_i - 0] = arguments[_i];
            }
            Utilits.Data.debugLog('-- Resume --', events);
        };
        Game.instance = null;
        return Game;
    }(Phaser.Game));
    StreetFighterCards.Game = Game;
})(StreetFighterCards || (StreetFighterCards = {}));
var AI;
(function (AI) {
    var ATTACK = "attack";
    var DEFENSE = "defense";
    var Ai = (function () {
        function Ai() {
            this.data = null;
            this.attackCards = [];
            this.defenseCards = [];
            this.energy = 0;
        }
        Ai.prototype.setData = function (data) {
            this.data = data;
            this.energy = data.aiEnergy;
            this.initCardsAI();
        };
        Ai.prototype.initCardsAI = function () {
            var _this = this;
            this.attackCards = [];
            this.defenseCards = [];
            this.data.aiHand.forEach(function (card) {
                if (card.cardData.energy <= _this.data.aiEnergy && card.cardData.type === Constants.CARD_TYPE_ATTACK) {
                    _this.attackCards.push(card);
                }
                if (card.cardData.energy <= _this.data.aiEnergy && card.cardData.type === Constants.CARD_TYPE_DEFENSE) {
                    _this.defenseCards.push(card);
                }
            });
            this.attackCards.sort(function (a, b) {
                return a.cardData.power - b.cardData.power;
            });
            this.defenseCards.sort(function (a, b) {
                return a.cardData.power - b.cardData.power;
            });
            Utilits.Data.debugLog("AI: attack cards:", this.attackCards);
            Utilits.Data.debugLog("AI: defense cards:", this.defenseCards);
        };
        Ai.prototype.getHits = function (statusAction) {
            var result;
            if (this.attackCards.length === 0 && this.defenseCards.length === 0) {
                return [null, null, null];
            }
            if (statusAction === Constants.ACTIVE_PLAYER) {
                result = this.playerAttack();
            }
            else {
                result = this.aiAttack();
            }
            Utilits.Data.debugLog("AI: hits:", result);
            Utilits.Data.debugLog("AI: energy:", this.energy);
            return result;
        };
        /* фактический урон который нанесет игрок*/
        Ai.prototype.getTotalPlayerDamage = function () {
            var damage = 0;
            this.data.playerSlots.forEach(function (card) {
                if (card === null)
                    return;
                if (card.cardData.type === Constants.CARD_TYPE_ATTACK) {
                    damage += Number(card.cardData.power);
                }
            });
            Utilits.Data.debugLog("AI: player damage:", damage);
            return damage;
        };
        /* основная логика расчета карты для хода */
        Ai.prototype.getHitCardAI = function (priority, exception) {
            var hit = {};
            var aiCard;
            if (this.attackCards.length <= 0 && this.defenseCards.length <= 0)
                return hit;
            // поиск приоритетной карты
            if (priority === ATTACK && this.attackCards.length > 0) {
                for (var i = this.attackCards.length - 1; i >= 0; i--) {
                    aiCard = this.attackCards[i];
                    if (aiCard.cardData.energy <= this.energy) {
                        hit.index = aiCard.indexInHand;
                        hit.energy = aiCard.cardData.energy;
                        this.attackCards.splice(i, 1);
                        return hit;
                    }
                }
            }
            else if (priority === DEFENSE && this.defenseCards.length > 0) {
                for (var i = this.defenseCards.length - 1; i >= 0; i--) {
                    aiCard = this.defenseCards[i];
                    if (aiCard.cardData.energy <= this.energy) {
                        hit.index = aiCard.indexInHand;
                        hit.energy = aiCard.cardData.energy;
                        this.defenseCards.splice(i, 1);
                        return hit;
                    }
                }
            }
            // поиск любой подходящей карты с учетом исключения
            if (hit.index === undefined || hit.index === null) {
                if (exception === DEFENSE || exception === null) {
                    for (var i = this.attackCards.length - 1; i >= 0; i--) {
                        aiCard = this.attackCards[i];
                        if (aiCard.cardData.energy <= this.energy) {
                            hit.index = aiCard.indexInHand;
                            hit.energy = aiCard.cardData.energy;
                            this.attackCards.splice(i, 1);
                            return hit;
                        }
                    }
                }
                if (exception === ATTACK || exception === null) {
                    for (var i = this.defenseCards.length - 1; i >= 0; i--) {
                        aiCard = this.defenseCards[i];
                        if (aiCard.cardData.energy <= this.energy) {
                            hit.index = aiCard.indexInHand;
                            hit.energy = aiCard.cardData.energy;
                            this.defenseCards.splice(i, 1);
                            return hit;
                        }
                    }
                }
            }
            return hit;
        };
        /* ==============================
        * атакует игрок (AI контратакует)
        ================================= */
        Ai.prototype.playerAttack = function () {
            var result;
            var damage = this.getTotalPlayerDamage(); // фактический урон который нанесет игрок
            if (damage >= this.data.aiLife) {
                result = this.tactics(true, true); // AI под угрозой уничтожения (тактика защиты)
            }
            else {
                result = this.tactics(true, false); // AI в не опасности (тактика нападения)
            }
            return result;
        };
        /* ==============================
        * атакует AI (Игрок контратакует)
        ================================= */
        Ai.prototype.aiAttack = function () {
            var result;
            result = this.tactics(false, false); // AI атакует (тактика нападения)
            return result;
        };
        /** ==============================
         * ТАКТИКА
         ================================= */
        /* тактика - атака / контратака */
        Ai.prototype.tactics = function (contrAttack, tacticsDefense) {
            var result = [null, null, null];
            var playerCard;
            var aiCard;
            var hit;
            // Обработка атакующих карт игрока (при контратаке)
            hit = {};
            if (contrAttack === true) {
                for (var i = 0; i < this.data.playerSlots.length; i++) {
                    playerCard = this.data.playerSlots[i];
                    if (playerCard === null)
                        continue;
                    if (playerCard.cardData.type === Constants.CARD_TYPE_ATTACK && playerCard.cardData.power > 30) {
                        hit = this.getHitCardAI(DEFENSE, ATTACK); // карта атаки сильная - приоритет защита
                    }
                    else if (playerCard.cardData.type === Constants.CARD_TYPE_ATTACK && playerCard.cardData.power < 30) {
                        if (tacticsDefense === true) {
                            hit = this.getHitCardAI(DEFENSE, ATTACK);
                        }
                        else {
                            //if (Math.random() > 0.5) hit = this.getHitCardAI(ATTACK, DEFENSE);   // случайный выбор атака
                            //else hit = this.getHitCardAI(DEFENSE, ATTACK);                      // случайный выбор защита
                            hit = this.getHitCardAI(DEFENSE, null);
                        }
                    }
                    if (hit.index !== undefined && hit.index !== null && result[i] === null) {
                        result[i] = hit.index; // записываем выбранную карту AI
                        this.energy -= hit.energy; // уменьшаем кол-во энергии AI
                    }
                    hit = {};
                    if (this.energy <= 0)
                        break;
                }
                if (this.energy <= 0)
                    return result;
            }
            // Обработка пустых слотов игрока (при атаке)
            hit = {};
            for (var i = 0; i < this.data.playerSlots.length; i++) {
                playerCard = this.data.playerSlots[i];
                if (playerCard === null) {
                    hit = this.getHitCardAI(ATTACK, DEFENSE); // слот игрока пуст - приоритет атакующая карта
                    if (hit.index !== undefined && hit.index !== null && result[i] === null) {
                        result[i] = hit.index; // записываем выбранную карту AI
                        this.energy -= hit.energy; // уменьшаем кол-во энергии AI
                    }
                }
                hit = {};
                if (this.energy <= 0)
                    break;
            }
            if (this.energy <= 0)
                return result;
            // Проверка заполненности слотов AI если еще осталась энергия
            hit = {};
            if (this.energy > 0) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i] === null) {
                        hit = this.getHitCardAI(ATTACK, null); // слот AI пуст - приоритет атакующая карта
                        if (hit.index !== undefined && hit.index !== null && result[i] === null) {
                            result[i] = hit.index; // записываем выбранную карту AI
                            this.energy -= hit.energy; // уменьшаем кол-во энергии AI
                        }
                        Utilits.Data.debugLog("AI: empty slot: ", hit.index);
                    }
                    hit = {};
                    if (this.energy <= 0)
                        break;
                }
            }
            return result;
        };
        /* тактика - атака */
        Ai.prototype.tacticsAttack = function () {
            var result = [null, null, null];
            return [];
        };
        /* тактика - защита */
        Ai.prototype.tacticsDefense = function () {
            var result = [null, null, null];
            return [];
        };
        return Ai;
    }());
    AI.Ai = Ai;
})(AI || (AI = {}));
var Constants = (function () {
    function Constants() {
    }
    Constants.GAME_WIDTH = 800;
    Constants.GAME_HEIGHT = 600;
    Constants.PLAYER = 'player';
    Constants.OPPONENT = 'opponent';
    Constants.PLAYER_AND_OPPONENT = 'player_and_opponent';
    Constants.CARD_TYPE_ATTACK = 'card_type_attack';
    Constants.CARD_TYPE_DEFENSE = 'card_type_defense';
    Constants.ACTIVE_PLAYER = "active_player";
    Constants.ACTIVE_OPPONENT = "active_opponent";
    /**
     *  status-1: Ход игрока - игрок выкладывает карты - ИИ ждет				(кнопка - true)
     *  status-2: Ход игрока - игрок положил карты - ИИ выкладыват карты		(кнопка - false)
     *  status-3: Выполняются карты на столе (Атака Игрока)									(кнопка - false)
     *  status-4: Ход ИИ - ИИ выкладывает карты - игрок ждет					(кнопка - false)
     *  status-5: Ход ИИ - ИИ положил карты - игрок выкладывает карты			(кнопка - true)
     *  status-6: Выполняются карты на столе (Атака ИИ)							(кнопка - false)
     */
    Constants.STATUS_1_PLAYER_P_PROCESS_AI_WAIT = 1;
    Constants.STATUS_2_PLAYER_P_COMPLETE_AI_PROCESS = 2;
    Constants.STATUS_3_PLAYER_ATTACK = 3;
    Constants.STATUS_4_AI_AI_PROCESS_P_WAIT = 4;
    Constants.STATUS_5_AI_AI_COMPLETE_P_PROCESS = 5;
    Constants.STATUS_6_AI_ATTACK = 6;
    Constants.ANIMATION_TYPE_STANCE = "animation_type_stance";
    Constants.ANIMATION_TYPE_BLOCK = "animation_type_block";
    Constants.ANIMATION_TYPE_HIT = "animation_type_hit";
    Constants.ANIMATION_TYPE_DAMAGE = "animation_type_damage";
    Constants.ANIMATION_TYPE_LOSE = "animation_type_lose";
    Constants.ANIMATION_TYPE_WIN = "animation_type_win";
    Constants.ANIMATION_PLAYER_COMPLETE = "animation_player_complete";
    Constants.ANIMATION_OPPONENT_COMPLETE = "animation_opponent_complete";
    Constants.ANIMATION_FLASH_COMPLETE = "animation_flash_complete";
    Constants.BUTTON_PLAY = 'button_play';
    Constants.BUTTON_SETTINGS = 'button_settings';
    Constants.BUTTON_SETTINGS_CLOSE = 'button_settings_close';
    Constants.BUTTON_INVATE = 'button_invate';
    Constants.BUTTON_BACK = 'button_back';
    Constants.BUTTON_NEXT = 'button_next';
    Constants.BUTTON_SELECT = 'button_select';
    Constants.BUTTON_ARROW_LEFT = 'button_arrow_left';
    Constants.BUTTON_ARROW_RIGHT = 'button_arrow_right';
    Constants.BUTTON_START_BATTLE = 'button_start_battle';
    Constants.BUTTON_EXIT_BATTLE = 'button_exit_battle';
    Constants.TIMER_END = "timer_end";
    Constants.BUTTON_TABLO = 'button_tablo';
    Constants.GAME_OVER = "game_over";
    return Constants;
}());
var Config = (function () {
    function Config() {
    }
    Config.settingSound = true;
    Config.settingMusic = true;
    Config.settingTutorial = true;
    Config.buildDev = true;
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
    Images.BackgroundTournament = 'tournament/background_tournament.jpg';
    Images.vsTournament = 'tournament/vs.png';
    Images.BackgroundIcon = 'icons/background_icon.png';
    Images.HandBackground = 'levels/hand_bg.jpg';
    Images.TabloLevel = 'levels/tablo.png';
    Images.BorderLevel = 'levels/border_level.png';
    Images.FightLevel = 'levels/fight.png';
    Images.KOLevel = 'levels/ko.png';
    Images.preloadList = [
        Images.MenuImage,
        Images.BorderImage,
        Images.ChoiceImage,
        Images.ArrowLeft,
        Images.ArrowRight,
        Images.TutorialImage,
        Images.ButtonOff,
        Images.ButtonOn,
        Images.BackgroundTournament,
        Images.vsTournament,
        Images.BackgroundIcon,
        Images.HandBackground,
        Images.TabloLevel,
        Images.BorderLevel,
        Images.FightLevel,
        Images.KOLevel,
        'tournament/akuma.png',
        'tournament/alex.png',
        'tournament/chun_li.png',
        'tournament/dudley.png',
        'tournament/elena.png',
        'tournament/gill.png',
        'tournament/hugo.png',
        'tournament/ibuki.png',
        'tournament/ken.png',
        'tournament/makoto.png',
        'tournament/necro.png',
        'tournament/oro.png',
        'tournament/q.png',
        'tournament/remy.png',
        'tournament/ryu.png',
        'tournament/sean.png',
        'tournament/twelve.png',
        'tournament/urien.png',
        'tournament/yang.png',
        'tournament/yun.png',
        'icons/akuma.png',
        'icons/alex.png',
        'icons/chun_li.png',
        'icons/dudley.png',
        'icons/elena.png',
        'icons/gill.png',
        'icons/hugo.png',
        'icons/ibuki.png',
        'icons/ken.png',
        'icons/makoto.png',
        'icons/necro.png',
        'icons/oro.png',
        'icons/q.png',
        'icons/remy.png',
        'icons/ryu.png',
        'icons/sean.png',
        'icons/twelve.png',
        'icons/urien.png',
        'icons/yang.png',
        'icons/yun.png',
        'levels/level_1.jpg',
        'levels/level_2.jpg',
        'levels/level_3.jpg',
        'levels/level_4.jpg',
        'levels/level_5.jpg',
        'levels/level_6.jpg',
        'levels/level_7.jpg',
        'levels/level_8.jpg',
        'levels/level_9.jpg',
        'levels/level_10.jpg',
        'levels/level_11.jpg',
        'levels/level_12.jpg',
        'levels/level_13.jpg',
        'levels/level_14.jpg',
        'levels/level_15.jpg',
        'levels/level_16.jpg',
        'levels/level_17.jpg',
        'levels/level_18.jpg',
        'levels/level_19.jpg',
        'levels/level_20.jpg',
        'comix/comix_page_1.jpg',
        'comix/comix_page_2.jpg',
        'comix/comix_page_3.jpg',
        'comix/comix_page_4.jpg',
        'comix/comix_page_5_1.jpg',
        'comix/comix_page_5_2.jpg',
        'comix/comix_page_6.jpg',
        'comix/comix_page_7.jpg',
        'comix/comix_page_8_1.jpg',
        'comix/comix_page_8_2.jpg',
        'comix/comix_page_9_1.jpg',
        'comix/comix_page_9_2.jpg',
        'comix/comix_page_10.jpg',
        'comix/comix_page_11.jpg',
        'comix/comix_page_12.jpg',
        'comix/comix_page_13.jpg',
        'comix/comix_page_14.jpg',
        'comix/comix_page_15_1.jpg',
        'comix/comix_page_15_2.jpg',
        'comix/comix_page_16.jpg',
        'comix/comix_page_17.jpg',
        'comix/comix_page_18.jpg',
        'comix/comix_page_19.jpg',
        'comix/comix_page_20.jpg',
        'comix/comix_page_21.jpg',
    ];
    return Images;
}());
var Animations = (function () {
    function Animations() {
    }
    Animations.Akuma = 'Akuma.json';
    Animations.Alex = 'Alex.json';
    Animations.ChunLi = 'Chun Li.json';
    Animations.Dudley = 'Dudley.json';
    Animations.Elena = 'Elena.json';
    Animations.Gill = 'Gill.json';
    Animations.Hugo = 'Hugo.json';
    Animations.Ibuki = 'Ibuki.json';
    Animations.Ken = 'Ken.json';
    Animations.Makoto = 'Makoto.json';
    Animations.Necro = 'Necro.json';
    Animations.Oro = 'Oro.json';
    Animations.Q = 'Q.json';
    Animations.Remy = 'Remy.json';
    Animations.Ryu = 'Ryu.json';
    Animations.Sean = 'Sean.json';
    Animations.Twelve = 'Twelve.json';
    Animations.Urien = 'Urien.json';
    Animations.Yang = 'Yang.json';
    Animations.Yun = 'Yun.json';
    Animations.preloadList = [
        Animations.Akuma,
        Animations.Alex,
        Animations.ChunLi,
        Animations.Dudley,
        Animations.Elena,
        Animations.Gill,
        Animations.Hugo,
        Animations.Ibuki,
        Animations.Ken,
        Animations.Makoto,
        Animations.Necro,
        Animations.Oro,
        Animations.Q,
        Animations.Remy,
        Animations.Ryu,
        Animations.Sean,
        Animations.Twelve,
        Animations.Urien,
        Animations.Yang,
        Animations.Yun
    ];
    return Animations;
}());
var Atlases = (function () {
    function Atlases() {
    }
    Atlases.BigKen = 'BigKen';
    Atlases.BigRyu = 'BigRyu';
    Atlases.BigCards = 'BigCards';
    Atlases.Cards = 'Cards';
    Atlases.Akuma = 'Akuma';
    Atlases.Alex = 'Alex';
    Atlases.ChunLi = 'Chun Li';
    Atlases.Dudley = 'Dudley';
    Atlases.Elena = 'Elena';
    Atlases.Gill = 'Gill';
    Atlases.Hugo = 'Hugo';
    Atlases.Ibuki = 'Ibuki';
    Atlases.Ken = 'Ken';
    Atlases.Makoto = 'Makoto';
    Atlases.Necro = 'Necro';
    Atlases.Oro = 'Oro';
    Atlases.Q = 'Q';
    Atlases.Remy = 'Remy';
    Atlases.Ryu = 'Ryu';
    Atlases.Sean = 'Sean';
    Atlases.Twelve = 'Twelve';
    Atlases.Urien = 'Urien';
    Atlases.Yang = 'Yang';
    Atlases.Yun = 'Yun';
    Atlases.Flash = 'Flash';
    Atlases.preloadList = [
        Atlases.BigKen,
        Atlases.BigRyu,
        Atlases.BigCards,
        Atlases.Cards,
        Atlases.Akuma,
        Atlases.Alex,
        Atlases.ChunLi,
        Atlases.Dudley,
        Atlases.Elena,
        Atlases.Gill,
        Atlases.Hugo,
        Atlases.Ibuki,
        Atlases.Ken,
        Atlases.Makoto,
        Atlases.Necro,
        Atlases.Oro,
        Atlases.Q,
        Atlases.Remy,
        Atlases.Ryu,
        Atlases.Sean,
        Atlases.Twelve,
        Atlases.Urien,
        Atlases.Yang,
        Atlases.Yun,
        Atlases.Flash
    ];
    return Atlases;
}());
var Sheet = (function () {
    function Sheet() {
    }
    Sheet.ButtonStyle1 = 'button_style_1_sheet.png';
    Sheet.ButtonStyle2 = 'button_style_2_sheet.png';
    Sheet.ButtonStyle3 = 'button_style_3_sheet.png';
    Sheet.preloadList = [
        Sheet.ButtonStyle1,
        Sheet.ButtonStyle2,
        Sheet.ButtonStyle3,
    ];
    return Sheet;
}());
var Decks = (function () {
    function Decks() {
    }
    Decks.akumaDeckJson = 'akuma_deck.json';
    Decks.alexDeckJson = 'alex_deck.json';
    Decks.chunLiDeckJson = 'chun_li_deck.json';
    Decks.dudleyDeckJson = 'dudley_deck.json';
    Decks.elenaDeckJson = 'elena_deck.json';
    Decks.gillDeckJson = 'gill_deck.json';
    Decks.hugoDeckJson = 'hugo_deck.json';
    Decks.ibukiDeckJson = 'ibuki_deck.json';
    Decks.kenDeckJson = 'ken_deck.json';
    Decks.makotoDeckJson = 'makoto_deck.json';
    Decks.necroDeckJson = 'necro_deck.json';
    Decks.oroDeckJson = 'oro_deck.json';
    Decks.qDeckJson = 'q_deck.json';
    Decks.remyDeckJson = 'remy_deck.json';
    Decks.ryuDeckJson = 'ryu_deck.json';
    Decks.seanDeckJson = 'sean_deck.json';
    Decks.twelveDeckJson = 'twelve_deck.json';
    Decks.urienDeckJson = 'urien_deck.json';
    Decks.yangDeckJson = 'yang_deck.json';
    Decks.yunDeckJson = 'yun_deck.json';
    Decks.preloadList = [
        Decks.akumaDeckJson,
        Decks.alexDeckJson,
        Decks.chunLiDeckJson,
        Decks.dudleyDeckJson,
        Decks.elenaDeckJson,
        Decks.gillDeckJson,
        Decks.hugoDeckJson,
        Decks.ibukiDeckJson,
        Decks.kenDeckJson,
        Decks.makotoDeckJson,
        Decks.necroDeckJson,
        Decks.oroDeckJson,
        Decks.qDeckJson,
        Decks.remyDeckJson,
        Decks.ryuDeckJson,
        Decks.seanDeckJson,
        Decks.twelveDeckJson,
        Decks.urienDeckJson,
        Decks.yangDeckJson,
        Decks.yunDeckJson
    ];
    return Decks;
}());
var GameData;
(function (GameData) {
    var Data = (function () {
        function Data() {
        }
        Data.initPersonages = function (game) {
            var _this = this;
            this.progressIndex = -1;
            this.comixIndex = 0;
            GameData.Data.personages = [];
            var personage;
            Decks.preloadList.forEach(function (value) {
                personage = {};
                personage.id = game.cache.getJSON(value).id;
                personage.name = game.cache.getJSON(value).name;
                personage.attack = 0;
                personage.defense = 0;
                personage.energy = game.cache.getJSON(value).energy;
                personage.life = 0;
                personage.deck = [];
                personage.level = game.cache.getJSON(value).level;
                _this.createDeck(game, value, personage);
                _this.loadAnimation(game, personage);
                GameData.Data.personages.push(personage);
            });
            Utilits.Data.debugLog("Personages:", GameData.Data.personages);
        };
        Data.createDeck = function (game, value, personage) {
            var card;
            var deck = game.cache.getJSON(value).deck;
            for (var key in deck.cards) {
                card = {};
                card.type = deck.cards[key].type;
                card.power = deck.cards[key].power;
                card.life = deck.cards[key].life;
                card.energy = deck.cards[key].energy;
                personage.deck.push(card);
                if (deck.cards[key].type === Constants.CARD_TYPE_ATTACK) {
                    personage.attack += Number(deck.cards[key].power);
                }
                else {
                    personage.defense += Number(deck.cards[key].power);
                }
                personage.life += Number(deck.cards[key].life);
            }
        };
        Data.deckMix = function (index) {
            GameData.Data.personages[index].deck.sort(Utilits.Data.compareRandom);
            Utilits.Data.debugLog("Deck:", GameData.Data.personages[index].deck);
        };
        Data.loadAnimation = function (game, personage) {
            try {
                var json = game.cache.getJSON(personage.name + '.json');
                var block = [];
                var damage = [];
                var hit_hand = [];
                var hit_leg = [];
                var lose = [];
                var stance = [];
                var win = [];
                for (var key in json.frames) {
                    if ('block' == key.substr(0, 5))
                        block.push(key);
                    if ('damage' == key.substr(0, 6))
                        damage.push(key);
                    if ('hit_hand' == key.substr(0, 8))
                        hit_hand.push(key);
                    if ('hit_leg' == key.substr(0, 7))
                        hit_leg.push(key);
                    if ('lose' == key.substr(0, 4))
                        lose.push(key);
                    if ('stance' == key.substr(0, 6))
                        stance.push(key);
                    if ('win' == key.substr(0, 3))
                        win.push(key);
                }
                personage.animBlock = block;
                personage.animDamage = damage;
                personage.animHitHand = hit_hand;
                personage.animHitLeg = hit_leg;
                personage.animLose = lose;
                personage.animStance = stance;
                personage.animWin = win;
            }
            catch (error) {
            }
        };
        Data.initTournament = function () {
            this.progressIndex = 0;
            GameData.Data.tournamentListIds = [];
            var listIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
            var id;
            while (listIDs.length > 0) {
                id = listIDs.splice(Utilits.Data.getRandomRangeIndex(0, listIDs.length - 1), 1)[0];
                if (id === 5 || id === GameData.Data.fighterIndex)
                    continue;
                GameData.Data.tournamentListIds.push(id);
            }
            GameData.Data.tournamentListIds.push(GameData.Data.fighterIndex); // player
            GameData.Data.tournamentListIds.push(5); // boss
            Utilits.Data.debugLog("Tournament List:", GameData.Data.tournamentListIds);
        };
        Data.fighterIndex = 0; // id выбранного игроком персонажа (в сохранение)
        Data.progressIndex = -1; // индекс прогресса в игре (в сохранение)
        Data.comixIndex = 0; // индекс комикса
        Data.fighters = [
            [0, 'Akuma', 'akuma_card.png', 'tournament/akuma.png', 'icons/akuma.png'],
            [1, 'Alex', 'alex_card.png', 'tournament/alex.png', 'icons/alex.png'],
            [2, 'Chun Li', 'chun_li_card.png', 'tournament/chun_li.png', 'icons/chun_li.png'],
            [3, 'Dudley', 'dudley_card.png', 'tournament/dudley.png', 'icons/dudley.png'],
            [4, 'Elena', 'elena_card.png', 'tournament/elena.png', 'icons/elena.png'],
            [5, 'Gill', 'gill_card.png', 'tournament/gill.png', 'icons/gill.png'],
            [6, 'Hugo', 'hugo_card.png', 'tournament/hugo.png', 'icons/hugo.png'],
            [7, 'Ibuki', 'ibuki_card.png', 'tournament/ibuki.png', 'icons/ibuki.png'],
            [8, 'Ken', 'ken_card.png', 'tournament/ken.png', 'icons/ken.png'],
            [9, 'Makoto', 'makoto_card.png', 'tournament/makoto.png', 'icons/makoto.png'],
            [10, 'Necro', 'necro_card.png', 'tournament/necro.png', 'icons/necro.png'],
            [11, 'Oro', 'oro_card.png', 'tournament/oro.png', 'icons/oro.png'],
            [12, 'Q', 'q_card.png', 'tournament/q.png', 'icons/q.png'],
            [13, 'Remy', 'remy_card.png', 'tournament/remy.png', 'icons/remy.png'],
            [14, 'Ryu', 'ryu_card.png', 'tournament/ryu.png', 'icons/ryu.png'],
            [15, 'Sean', 'sean_card.png', 'tournament/sean.png', 'icons/sean.png'],
            [16, 'Twelve', 'twelve_card.png', 'tournament/twelve.png', 'icons/twelve.png'],
            [17, 'Urien', 'urien_card.png', 'tournament/urien.png', 'icons/urien.png'],
            [18, 'Yang', 'yang_card.png', 'tournament/yang.png', 'icons/yang.png'],
            [19, 'Yun', 'yun_card.png', 'tournament/yun.png', 'icons/yun.png',]
        ];
        Data.comixes = [
            ['comix/comix_page_1.jpg'],
            ['comix/comix_page_2.jpg'],
            ['comix/comix_page_3.jpg'],
            ['comix/comix_page_4.jpg'],
            ['comix/comix_page_5_1.jpg', 'comix/comix_page_5_2.jpg'],
            ['comix/comix_page_6.jpg'],
            ['comix/comix_page_7.jpg'],
            ['comix/comix_page_8_1.jpg', 'comix/comix_page_8_2.jpg'],
            ['comix/comix_page_9_1.jpg', 'comix/comix_page_9_2.jpg'],
            ['comix/comix_page_10.jpg'],
            ['comix/comix_page_11.jpg'],
            ['comix/comix_page_12.jpg'],
            ['comix/comix_page_13.jpg'],
            ['comix/comix_page_14.jpg'],
            ['comix/comix_page_15_1.jpg', 'comix/comix_page_15_2.jpg'],
            ['comix/comix_page_16.jpg'],
            ['comix/comix_page_17.jpg'],
            ['comix/comix_page_18.jpg'],
            ['comix/comix_page_19.jpg'],
            ['comix/comix_page_20.jpg'],
            ['comix/comix_page_21.jpg']
        ];
        return Data;
    }());
    GameData.Data = Data;
})(GameData || (GameData = {}));
var Utilits;
(function (Utilits) {
    var Data = (function () {
        function Data() {
        }
        /* Debug отладка */
        Data.debugLog = function (title, value) {
            if (Config.buildDev)
                console.log(title, value);
        };
        /* Проверка четности и нечетности */
        Data.checkEvenOrOdd = function (n) {
            if (n & 1) {
                return false; // odd (нечетное число)
            }
            else {
                return true; // even (четное число)
            }
        };
        /* Генератор случайных чисел */
        Data.getRandomIndex = function () {
            var index = Math.round(Math.random() / 0.1);
            return index;
        };
        /* Генератор случайных чисел из диапазона чисел мин/макс */
        Data.getRandomRangeIndex = function (min, max) {
            max -= min;
            var index = (Math.random() * ++max) + min;
            return Math.floor(index);
        };
        /* Функция перемешивает элементы массива */
        Data.compareRandom = function (a, b) {
            return Math.random() - 0.5;
        };
        return Data;
    }());
    Utilits.Data = Data;
})(Utilits || (Utilits = {}));
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
    var AnimationFight = (function (_super) {
        __extends(AnimationFight, _super);
        function AnimationFight(game, x, y) {
            _super.call(this, game, x, y, Images.FightLevel);
            this.init(x, y);
        }
        AnimationFight.prototype.init = function (x, y) {
            this.x1 = x;
            this.y1 = y;
            this.x2 = x + (this.width / 2);
            this.y2 = x + (this.height / 4);
            this.scale.set(0, 0);
            this.x = this.x2;
            this.y = this.y2;
            var tweenScale = this.game.add.tween(this.scale);
            tweenScale.onComplete.add(this.onTweenMaxScaleComplete, this);
            tweenScale.to({ x: 1, y: 1 }, 500, 'Linear');
            tweenScale.start();
            var tweenPosition = this.game.add.tween(this);
            tweenPosition.onComplete.add(this.onTweenPositionComplete, this);
            tweenPosition.to({ x: this.x1, y: this.y1 }, 500, 'Linear');
            tweenPosition.start();
        };
        AnimationFight.prototype.onTweenPositionComplete = function () {
            var tweenPosition = this.game.add.tween(this);
            tweenPosition.to({ x: this.x2, y: this.y2 }, 500, 'Linear');
            tweenPosition.start();
        };
        AnimationFight.prototype.onTweenMaxScaleComplete = function () {
            var tweenScale = this.game.add.tween(this.scale);
            tweenScale.onComplete.add(this.onTweenMinScaleComplete, this);
            tweenScale.to({ x: 0, y: 0 }, 500, 'Linear');
            tweenScale.start();
        };
        AnimationFight.prototype.onTweenMinScaleComplete = function () {
            this.removeChildren();
        };
        return AnimationFight;
    }(Phaser.Sprite));
    Fabrique.AnimationFight = AnimationFight;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var AnimationFighter = (function (_super) {
        __extends(AnimationFighter, _super);
        function AnimationFighter(game, fighterType, personageName, personageAnim) {
            _super.call(this, game, 0, 0, personageName, 54);
            this.fighterType = fighterType;
            this.personageAnimation = personageAnim;
            this.init();
        }
        AnimationFighter.prototype.init = function () {
            this.event = new Phaser.Signal();
            this.animationType = Constants.ANIMATION_TYPE_STANCE;
            this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animStance);
            this.animation.onComplete.add(this.onComplete, this);
            this.animation.play(15, true, false);
        };
        AnimationFighter.prototype.onComplete = function (sprite, animation) {
            //console.log( (sprite as AnimationFighter).animation);
            if (this.animationType === Constants.ANIMATION_TYPE_STANCE)
                return;
            if (this.fighterType === Constants.ACTIVE_PLAYER) {
                this.event.dispatch(Constants.ANIMATION_PLAYER_COMPLETE, this.animationType);
            }
            else {
                this.event.dispatch(Constants.ANIMATION_OPPONENT_COMPLETE, this.animationType);
            }
        };
        AnimationFighter.prototype.stanceAnimation = function () {
            this.animation.stop();
            this.animationType = Constants.ANIMATION_TYPE_STANCE;
            this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animStance);
            this.animation.onComplete.add(this.onComplete, this);
            this.animation.play(15, true, false);
        };
        AnimationFighter.prototype.hitAnimation = function (cardData) {
            this.animation.stop();
            if (cardData.type === Constants.CARD_TYPE_ATTACK) {
                this.animationType = Constants.ANIMATION_TYPE_HIT;
                if (cardData.power > 20) {
                    this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animHitLeg);
                }
                else {
                    this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animHitHand);
                }
            }
            else {
                this.animationType = Constants.ANIMATION_TYPE_BLOCK;
                this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animBlock);
            }
            this.animation.onComplete.add(this.onComplete, this);
            this.animation.play(15, false, false);
        };
        AnimationFighter.prototype.damageAnimation = function () {
            this.animationType = Constants.ANIMATION_TYPE_DAMAGE;
            this.animation.stop();
            this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animDamage);
            this.animation.onComplete.add(this.onComplete, this);
            this.animation.play(15, false, false);
        };
        AnimationFighter.prototype.loseAnimation = function () {
            this.animationType = Constants.ANIMATION_TYPE_LOSE;
            this.animation.stop();
            this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animLose);
            this.animation.onComplete.add(this.onComplete, this);
            this.animation.play(15, false, false);
        };
        AnimationFighter.prototype.winAnimation = function () {
            this.animationType = Constants.ANIMATION_TYPE_WIN;
            this.animation.stop();
            this.animation = this.animations.add(this.personageAnimation.name, this.personageAnimation.animWin);
            this.animation.onComplete.add(this.onComplete, this);
            this.animation.play(15, false, false);
        };
        return AnimationFighter;
    }(Phaser.Sprite));
    Fabrique.AnimationFighter = AnimationFighter;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var AnimationFlash = (function (_super) {
        __extends(AnimationFlash, _super);
        function AnimationFlash(game, x, y) {
            _super.call(this, game, x, y, Atlases.Flash, 0);
            this.init();
        }
        AnimationFlash.prototype.init = function () {
            this.visible = false;
            this.animation = this.animations.add(Atlases.Flash);
            this.animation.onComplete.add(this.onComplete, this);
        };
        AnimationFlash.prototype.onComplete = function () {
            this.visible = false;
        };
        AnimationFlash.prototype.playAnimation = function () {
            this.visible = true;
            this.animation.frame = 0;
            this.animation.play(10, false, false);
        };
        return AnimationFlash;
    }(Phaser.Sprite));
    Fabrique.AnimationFlash = AnimationFlash;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var AnimationKO = (function (_super) {
        __extends(AnimationKO, _super);
        function AnimationKO(game, x, y) {
            _super.call(this, game, x, y, Images.KOLevel);
            this.init(x, y);
        }
        AnimationKO.prototype.init = function (x, y) {
            this.xEnd = x;
            this.yEnd = y;
            this.x = x + (this.width / 2);
            this.y = x + (this.height / 2);
            this.scale.set(0, 0);
            var tweenScale = this.game.add.tween(this.scale);
            tweenScale.to({ x: 1, y: 1 }, 250, 'Linear');
            tweenScale.start();
            var tweenPosition = this.game.add.tween(this);
            tweenPosition.to({ x: this.xEnd, y: this.yEnd }, 250, 'Linear');
            tweenPosition.start();
        };
        return AnimationKO;
    }(Phaser.Sprite));
    Fabrique.AnimationKO = AnimationKO;
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
            button.events.onInputOut.add(this.onButtonInputOut, this);
            button.events.onInputOver.add(this.onButtonInputOver, this);
            this.addChild(button);
            this.textButton = new Phaser.Text(this.game, textX, 15, text, { font: "bold 16px Arial", fill: "#9B372C" });
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
            this.addChild(this.textButton);
        };
        ButtonOrange.prototype.onButtonClick = function (event) {
            this.event.dispatch(event);
        };
        ButtonOrange.prototype.onButtonInputOut = function (event) {
            this.textButton.fill = "#9B372C";
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
        };
        ButtonOrange.prototype.onButtonInputOver = function (event) {
            this.textButton.fill = "#FF6A00";
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
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
            this.textButton = new Phaser.Text(this.game, textX, 20, text, { font: "bold 16px Arial", fill: "#444444" });
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
            this.addChild(this.textButton);
        };
        ButtonComix.prototype.onButtonClick = function (event) {
            this.event.dispatch(event);
        };
        ButtonComix.prototype.onButtonInputOut = function (event) {
            this.textButton.fill = "#444444";
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
        };
        ButtonComix.prototype.onButtonInputOver = function (event) {
            this.textButton.fill = "#9E32EC";
            this.textButton.setShadow(-1, -1, 'rgba(0,0,0,1)', 0);
        };
        return ButtonComix;
    }(Phaser.Group));
    Fabrique.ButtonComix = ButtonComix;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var ButtonTablo = (function (_super) {
        __extends(ButtonTablo, _super);
        function ButtonTablo(game, parent, name, text, textX, x, y) {
            _super.call(this, game, parent);
            this.init(name, text, textX, x, y);
        }
        ButtonTablo.prototype.shutdown = function () {
            this.removeAll();
        };
        ButtonTablo.prototype.init = function (name, text, textX, x, y) {
            this.x = x;
            this.y = y;
            this.event = new Phaser.Signal();
            this.button = new Phaser.Button(this.game, 0, 0, Sheet.ButtonStyle3, this.onButtonClick, this, 1, 2);
            this.button.name = name;
            this.button.events.onInputOut.add(this.onButtonInputOut, this);
            this.button.events.onInputOver.add(this.onButtonInputOver, this);
            this.addChild(this.button);
            this.textButton = new Phaser.Text(this.game, textX, 5, text, { font: "bold 16px Arial", fill: "#000000" });
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
            this.addChild(this.textButton);
        };
        ButtonTablo.prototype.onButtonClick = function (event) {
            this.event.dispatch(event);
        };
        ButtonTablo.prototype.onButtonInputOut = function (event) {
            this.textButton.fill = "#000000";
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
        };
        ButtonTablo.prototype.onButtonInputOver = function (event) {
            this.textButton.fill = "#FFFFFF";
            this.textButton.setShadow(-1, -1, 'rgba(0,0,0,1)', 0);
        };
        ButtonTablo.prototype.buttonVisible = function (flag) {
            this.textButton.visible = flag;
            this.textButton.fill = "#000000";
            this.textButton.setShadow(-1, -1, 'rgba(255,255,255,1)', 0);
            this.button.visible = flag;
            this.button.frame = 0;
        };
        return ButtonTablo;
    }(Phaser.Group));
    Fabrique.ButtonTablo = ButtonTablo;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card(game, x, y, fighterName, card) {
            _super.call(this, game, x, y);
            this.indexInHand = -1;
            this.cardData = card;
            this.nameFighter = fighterName;
            this.headerHeight = 157;
            this.footerHeight = 33;
            this.init();
        }
        Card.prototype.shutdown = function () {
            this.removeChildren();
        };
        Card.prototype.dragAndDrop = function (value) {
            if (value === true) {
                this.inputEnabled = true;
                this.input.enableDrag(false, true);
            }
            else {
                this.inputEnabled = false;
            }
        };
        Card.prototype.reduce = function (value) {
            if (value === true) {
                this.tweenFooter = this.game.add.tween(this.footer);
                this.tweenFooter.to({ y: 94 }, 250, 'Linear');
                this.tweenFooter.onUpdateCallback(this.headerUpdate, this);
                this.tweenFooter.start();
            }
            else {
                this.tweenFooter = this.game.add.tween(this.footer);
                this.tweenFooter.to({ y: 157 }, 250, 'Linear');
                this.tweenFooter.onUpdateCallback(this.headerUpdate, this);
                this.tweenFooter.start();
            }
        };
        Card.prototype.headerUpdate = function (callback, callbackContext) {
            var headerSprite;
            if (this.cardData.type === Constants.CARD_TYPE_ATTACK) {
                if (this.cardData.power > 20) {
                    headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_leg.png");
                }
                else {
                    headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
                }
            }
            else {
                headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
            }
            var bitmapData = this.game.make.bitmapData(126, this.footer.y + 5);
            bitmapData.copy(headerSprite);
            bitmapData.update(126, 126);
            this.header.setTexture(bitmapData.texture, true);
        };
        Card.prototype.init = function () {
            this.indexInHand = -1;
            var energyText;
            var powerText;
            var headerSprite;
            var footerSprite;
            if (this.cardData.type === Constants.CARD_TYPE_ATTACK) {
                if (this.cardData.power > 20) {
                    headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_leg.png");
                    footerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_leg.png");
                }
                else {
                    headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
                    footerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_hand.png");
                }
                powerText = this.game.add.text(40, 5, 'Удар: ' + this.cardData.power.toString(), { font: "bold 18px Times New Roman", fill: "#FFFFFF", align: "left" });
            }
            else {
                headerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
                footerSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.Cards, this.nameFighter + "_block.png");
                powerText = this.game.add.text(40, 5, 'Блок: ' + this.cardData.power.toString(), { font: "bold 18px Times New Roman", fill: "#FFFFFF", align: "left" });
            }
            // Size header 126x157
            var bitmapData = this.game.make.bitmapData(126, this.headerHeight);
            bitmapData.copy(headerSprite);
            bitmapData.update(126, this.headerHeight);
            this.header = new Phaser.Sprite(this.game, 0, 0, bitmapData);
            this.addChild(this.header);
            // Size footer 126x33
            bitmapData = this.game.make.bitmapData(126, this.footerHeight);
            bitmapData.copy(footerSprite, 0, 0, 126, 190, 0, -this.headerHeight);
            bitmapData.update(126, this.footerHeight);
            this.footer = new Phaser.Sprite(this.game, 0, this.headerHeight, bitmapData);
            this.addChild(this.footer);
            // Text
            energyText = this.game.add.text(14, 6, this.cardData.energy.toString(), { font: "bold 18px Times New Roman", fill: "#FFFFFF", align: "left" });
            this.addChild(energyText);
            this.footer.addChild(powerText);
        };
        return Card;
    }(Phaser.Sprite));
    Fabrique.Card = Card;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var ButtonComix = Fabrique.ButtonComix;
    var Comix = (function (_super) {
        __extends(Comix, _super);
        function Comix(game, parent) {
            _super.call(this, game, parent);
            if (GameData.Data.comixIndex >= (GameData.Data.progressIndex + 2)) {
                this.removeAll();
            }
            else {
                this.init();
            }
        }
        Comix.prototype.shutdown = function () {
            GameData.Data.comixIndex++;
            this.buttonNext.shutdown();
            this.removeAll();
        };
        Comix.prototype.init = function () {
            this.event = new Phaser.Signal();
            this.index = 0;
            this.createBackground();
            this.createButton();
            this.createBorder();
        };
        Comix.prototype.createBackground = function () {
            this.background = new Phaser.Sprite(this.game, 0, 0, GameData.Data.comixes[GameData.Data.comixIndex][this.index]);
            this.addChild(this.background);
        };
        Comix.prototype.createButton = function () {
            if (GameData.Data.comixIndex < 20) {
                this.buttonNext = new ButtonComix(this.game, this, Constants.BUTTON_NEXT, 'ДАЛЕЕ', 60, 600, 530);
            }
            else {
                this.buttonNext = new ButtonComix(this.game, this, Constants.BUTTON_NEXT, 'ВЫХОД', 60, 600, 530);
            }
            this.buttonNext.event.add(this.onButtonClick, this);
        };
        Comix.prototype.createBorder = function () {
            var border = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.addChild(border);
        };
        Comix.prototype.onButtonClick = function (event) {
            if ((GameData.Data.comixes[GameData.Data.comixIndex].length - 1) === this.index) {
                this.shutdown();
                this.parent.removeChild(this);
                if (GameData.Data.comixIndex === 21) {
                    this.event.dispatch(Constants.GAME_OVER);
                }
            }
            else {
                this.index++;
                this.background.loadTexture(GameData.Data.comixes[GameData.Data.comixIndex][this.index]);
            }
        };
        return Comix;
    }(Phaser.Group));
    Fabrique.Comix = Comix;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var FighterCard = (function (_super) {
        __extends(FighterCard, _super);
        function FighterCard(game, x, y, frame, index) {
            _super.call(this, game, x, y, Atlases.BigCards, frame);
            this.init(index);
        }
        FighterCard.prototype.init = function (index) {
            var defense = GameData.Data.personages[index].defense.toString();
            var health = GameData.Data.personages[index].life.toString();
            var damage = GameData.Data.personages[index].attack.toString();
            var energy = GameData.Data.personages[index].energy.toString();
            if (defense.length < 3) {
                this.defenseText = this.game.add.text(17, 13, defense, { font: "bold 16px Times New Roman", fill: "#FFFFFF", align: "left" });
            }
            else {
                this.defenseText = this.game.add.text(13, 13, defense, { font: "bold 16px Times New Roman", fill: "#FFFFFF", align: "left" });
            }
            this.addChild(this.defenseText);
            this.healthText = this.game.add.text(152, 13, health, { font: "bold 16px Times New Roman", fill: "#FFFFFF", align: "left" });
            this.addChild(this.healthText);
            this.damageText = this.game.add.text(12, 243, damage, { font: "bold 16px Times New Roman", fill: "#E52D00", align: "left" });
            this.addChild(this.damageText);
            this.energyText = this.game.add.text(157, 243, energy, { font: "bold 16px Times New Roman", fill: "#0026FF", align: "left" });
            this.addChild(this.energyText);
        };
        return FighterCard;
    }(Phaser.Sprite));
    Fabrique.FighterCard = FighterCard;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var FighterProgressBar = (function (_super) {
        __extends(FighterProgressBar, _super);
        function FighterProgressBar(game, parent, fighterIndex, x, y, orientation, fighterName) {
            _super.call(this, game, parent);
            this.init(fighterIndex, x, y, orientation, fighterName);
        }
        FighterProgressBar.prototype.shutdown = function () {
            this.barGroup.removeAll();
            this.energyBar.removeAll();
            this.removeAll();
        };
        FighterProgressBar.prototype.init = function (fighterIndex, x, y, orientation, fighterName) {
            this.x = x;
            this.y = y;
            this.orientation = orientation;
            this.fighterIndex = fighterIndex;
            this.energyBar = new Phaser.Group(this.game, this);
            this.barGroup = new Phaser.Group(this.game, this);
            var namePlayerText;
            if (orientation === Fabrique.Icon.LEFT) {
                this.leftBars();
                this.leftIcon();
                namePlayerText = this.game.add.text(25, 45, fighterName, { font: "bold 16px Arial", fill: "#FFFFFF", align: "left" });
            }
            else {
                this.rightBars();
                this.rightIcon();
                namePlayerText = this.game.add.text(0, 45, fighterName, { font: "bold 16px Arial", fill: "#FFFFFF", align: "left" });
            }
            this.barGroup.addChild(namePlayerText);
            this.energyProgress = new Phaser.Graphics(this.game, 0, 0);
            this.lifeProgress = new Phaser.Graphics(this.game, 0, 20);
            this.energyBar.addChild(this.energyProgress);
            this.barGroup.addChild(this.lifeProgress);
            this.energyText = this.game.add.text(0, 0, "0/10", { font: "bold 12px Times New Roman", fill: "#FFFFFF", align: "left" });
            this.energyBar.addChild(this.energyText);
            this.text = this.game.add.text(0, 20, "0/200", { font: "bold 12px Times New Roman", fill: "#FFFFFF", align: "left" });
            this.barGroup.addChild(this.text);
        };
        FighterProgressBar.prototype.leftIcon = function () {
            var polygonLeft = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(105, 40),
                new Phaser.Point(20, 40),
                new Phaser.Point(0, 0)
            ]);
            var polygonLeftMask = new Phaser.Polygon([
                new Phaser.Point(this.x + 4, this.y + 2),
                new Phaser.Point(this.x + 83, this.y + 2),
                new Phaser.Point(this.x + 101, this.y + 38),
                new Phaser.Point(this.x + 22, this.y + 38),
                new Phaser.Point(this.x + 4, this.y + 2)
            ]);
            var background;
            var iconMask;
            var iconBackgroundSprite;
            var iconSprite;
            background = new Phaser.Graphics(this.game, 0, 0);
            background.beginFill(0xFFFFFF, 0.95);
            background.lineStyle(2, 0x006FBD, 0.95);
            background.drawPolygon(polygonLeft);
            background.endFill();
            this.addChild(background);
            iconMask = new Phaser.Graphics(this.game, 0, 0);
            iconMask.beginFill(0xFFFFFF);
            iconMask.drawPolygon(polygonLeftMask);
            iconMask.endFill();
            iconBackgroundSprite = new Phaser.Sprite(this.game, 0, 0, Images.BackgroundIcon);
            iconBackgroundSprite.mask = iconMask;
            this.addChild(iconBackgroundSprite);
            iconSprite = new Phaser.Sprite(this.game, 0, 0, GameData.Data.fighters[this.fighterIndex][4]);
            iconSprite.mask = iconMask;
            this.addChild(iconSprite);
        };
        FighterProgressBar.prototype.rightIcon = function () {
            var polygonRight = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(65, 40),
                new Phaser.Point(-20, 40),
                new Phaser.Point(0, 0)
            ]);
            var polygonRightMask = new Phaser.Polygon([
                new Phaser.Point(this.x + 2, this.y + 2),
                new Phaser.Point(this.x + 82, this.y + 2),
                new Phaser.Point(this.x + 63, this.y + 38),
                new Phaser.Point(this.x - 16, this.y + 38),
                new Phaser.Point(this.x + 2, this.y + 2)
            ]);
            var background;
            var iconMask;
            var iconBackgroundSprite;
            var iconSprite;
            background = new Phaser.Graphics(this.game, 0, 0);
            background.beginFill(0xFFFFFF, 0.95);
            //background.lineStyle(2, 0x006FBD, 0.95);
            background.lineStyle(2, 0xA32727, 0.95);
            background.drawPolygon(polygonRight);
            background.endFill();
            this.addChild(background);
            iconMask = new Phaser.Graphics(this.game, 0, 0);
            iconMask.beginFill(0xFFFFFF);
            iconMask.drawPolygon(polygonRightMask);
            iconMask.endFill();
            iconBackgroundSprite = new Phaser.Sprite(this.game, -20, 0, Images.BackgroundIcon);
            iconBackgroundSprite.mask = iconMask;
            this.addChild(iconBackgroundSprite);
            iconSprite = new Phaser.Sprite(this.game, 40, 20, GameData.Data.fighters[this.fighterIndex][4]);
            iconSprite.anchor.setTo(.5, .5);
            iconSprite.scale.x *= -1;
            iconSprite.mask = iconMask;
            this.addChild(iconSprite);
        };
        FighterProgressBar.prototype.leftBars = function () {
            // Energy
            var backgroundEnergy;
            var polygonEnergy = new Phaser.Polygon([
                new Phaser.Point(0, 0), new Phaser.Point(130, 0),
                new Phaser.Point(140, 20), new Phaser.Point(0, 20),
                new Phaser.Point(0, 0)
            ]);
            backgroundEnergy = new Phaser.Graphics(this.game, 80, 0);
            backgroundEnergy.beginFill(0x006FBD, 0.5);
            backgroundEnergy.lineStyle(2, 0x006FBD, 0.95);
            backgroundEnergy.drawPolygon(polygonEnergy);
            backgroundEnergy.endFill();
            this.energyBar.addChild(backgroundEnergy);
            // Life
            var backgroundLife;
            var polygonLife = new Phaser.Polygon([
                new Phaser.Point(0, 0), new Phaser.Point(140, 0),
                new Phaser.Point(150, 20), new Phaser.Point(0, 20),
                new Phaser.Point(0, 0)
            ]);
            backgroundLife = new Phaser.Graphics(this.game, 80, 20);
            backgroundLife.beginFill(0x000000, 0.5);
            backgroundLife.lineStyle(2, 0x006FBD, 0.95);
            backgroundLife.drawPolygon(polygonLife);
            backgroundLife.endFill();
            this.barGroup.addChild(backgroundLife);
        };
        FighterProgressBar.prototype.rightBars = function () {
            // Energy
            var backgroundEnergy;
            var polygonEnergy = new Phaser.Polygon([
                new Phaser.Point(-80, 0), new Phaser.Point(-200, 0),
                new Phaser.Point(-210, 20), new Phaser.Point(-80, 20),
                new Phaser.Point(-80, 0)
            ]);
            backgroundEnergy = new Phaser.Graphics(this.game, 80, 0);
            //backgroundEnergy.beginFill(0x006FBD, 0.5);
            //backgroundEnergy.lineStyle(2, 0x006FBD, 0.95);
            backgroundEnergy.beginFill(0xA32727, 0.5);
            backgroundEnergy.lineStyle(2, 0xA32727, 0.95);
            backgroundEnergy.drawPolygon(polygonEnergy);
            backgroundEnergy.endFill();
            this.energyBar.addChild(backgroundEnergy);
            // Life
            var backgroundLife;
            var polygonLife = new Phaser.Polygon([
                new Phaser.Point(-80, 0), new Phaser.Point(-210, 0),
                new Phaser.Point(-220, 20), new Phaser.Point(-80, 20),
                new Phaser.Point(-80, 0)
            ]);
            backgroundLife = new Phaser.Graphics(this.game, 80, 20);
            backgroundLife.beginFill(0x000000, 0.5);
            //backgroundLife.lineStyle(2, 0x006FBD, 0.95);
            backgroundLife.lineStyle(2, 0xA32727, 0.95);
            backgroundLife.drawPolygon(polygonLife);
            backgroundLife.endFill();
            this.barGroup.addChild(backgroundLife);
        };
        FighterProgressBar.prototype.setEnergy = function (value) {
            if (this.orientation === FighterProgressBar.LEFT) {
                var i = (130 / 10);
                var polygonEnergyProgress = new Phaser.Polygon([
                    new Phaser.Point(1, 1), new Phaser.Point((value * i), 1),
                    new Phaser.Point((value * i) + 10, 19), new Phaser.Point(2, 19),
                    new Phaser.Point(1, 1)
                ]);
                this.energyProgress.x = 80;
                this.energyProgress.y = 0;
                this.energyProgress.clear();
                this.energyProgress.beginFill(0x00137F, 0.95);
                this.energyProgress.lineStyle(0, 0x000000, 0.95);
                this.energyProgress.drawPolygon(polygonEnergyProgress);
                this.energyProgress.endFill();
                this.energyText.x = 150;
                this.energyText.y = 2;
                this.energyText.setText(value.toString() + "/10");
            }
            else {
                var i = (125 / 10);
                var polygonEnergyProgress = new Phaser.Polygon([
                    new Phaser.Point(-1, 1), new Phaser.Point((value * -i) - 1, 1),
                    new Phaser.Point((value * -i) - 10, 19), new Phaser.Point(-1, 19),
                    new Phaser.Point(-1, 1)
                ]);
                this.energyProgress.x = 6;
                this.energyProgress.y = 0;
                this.energyProgress.clear();
                this.energyProgress.beginFill(0x00137F, 0.95);
                this.energyProgress.lineStyle(0, 0x000000, 0.95);
                this.energyProgress.drawPolygon(polygonEnergyProgress);
                this.energyProgress.endFill();
                this.energyText.x = -75;
                this.energyText.y = 2;
                this.energyText.setText(value.toString() + "/10");
            }
        };
        FighterProgressBar.prototype.setLife = function (value) {
            if (this.orientation === FighterProgressBar.LEFT) {
                var i = (124 / 200);
                var polygonLifeProgress = new Phaser.Polygon([
                    new Phaser.Point(1, 1), new Phaser.Point((value * i) + 1, 1),
                    new Phaser.Point((value * i) + 10, 19), new Phaser.Point(2, 19),
                    new Phaser.Point(1, 1)
                ]);
                this.lifeProgress.x = 95;
                this.lifeProgress.y = 20;
                this.lifeProgress.clear();
                this.lifeProgress.beginFill(0x8E0000, 0.95);
                this.lifeProgress.lineStyle(0, 0x000000, 0.95);
                this.lifeProgress.drawPolygon(polygonLifeProgress);
                this.lifeProgress.endFill();
                this.text.x = 140;
                this.text.y = 22;
                this.text.setText(value.toString() + "/200");
            }
            else {
                var i = (120 / 200);
                var polygonLifeProgress = new Phaser.Polygon([
                    new Phaser.Point(-1, 1), new Phaser.Point((value * -i) - 1, 1),
                    new Phaser.Point((value * -i) - 10, 19), new Phaser.Point(-1, 19),
                    new Phaser.Point(-1, 1)
                ]);
                this.lifeProgress.x = -10;
                this.lifeProgress.y = 20;
                this.lifeProgress.clear();
                this.lifeProgress.beginFill(0x8E0000, 0.95);
                this.lifeProgress.lineStyle(0, 0x000000, 0.95);
                this.lifeProgress.drawPolygon(polygonLifeProgress);
                this.lifeProgress.endFill();
                this.text.x = -90;
                this.text.y = 22;
                this.text.setText(value.toString() + "/200");
            }
        };
        FighterProgressBar.LEFT = "left";
        FighterProgressBar.RIGHT = "right";
        return FighterProgressBar;
    }(Phaser.Group));
    Fabrique.FighterProgressBar = FighterProgressBar;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Icon = (function (_super) {
        __extends(Icon, _super);
        function Icon(game, parent, index, fighterIndex, x, y, orientation) {
            _super.call(this, game, parent);
            this.init(index, fighterIndex, x, y, orientation);
        }
        Icon.prototype.shutdown = function () {
            this.removeAll();
        };
        Icon.prototype.init = function (index, fighterIndex, x, y, orientation) {
            this.x = x;
            this.y = y;
            var polygonLeft = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(105, 40),
                new Phaser.Point(20, 40),
                new Phaser.Point(0, 0)
            ]);
            var polygonLeftMask = new Phaser.Polygon([
                new Phaser.Point(x + 4, y + 2),
                new Phaser.Point(x + 83, y + 2),
                new Phaser.Point(x + 101, y + 38),
                new Phaser.Point(x + 22, y + 38),
                new Phaser.Point(x + 4, y + 2)
            ]);
            var polygonRight = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(65, 40),
                new Phaser.Point(-20, 40),
                new Phaser.Point(0, 0)
            ]);
            var polygonRightMask = new Phaser.Polygon([
                new Phaser.Point(x + 2, y + 2),
                new Phaser.Point(x + 82, y + 2),
                new Phaser.Point(x + 63, y + 38),
                new Phaser.Point(x - 16, y + 38),
                new Phaser.Point(x + 2, y + 2)
            ]);
            var background;
            var iconMask;
            var iconBackgroundSprite;
            var iconSprite;
            if (orientation === Icon.LEFT) {
                background = new Phaser.Graphics(this.game, 0, 0);
                background.beginFill(0xFFFFFF, 0.95);
                background.lineStyle(2, 0x07111D, 0.95);
                background.drawPolygon(polygonLeft);
                background.endFill();
                this.addChild(background);
                iconMask = new Phaser.Graphics(this.game, 0, 0);
                iconMask.beginFill(0xFFFFFF);
                iconMask.drawPolygon(polygonLeftMask);
                iconMask.endFill();
                iconBackgroundSprite = new Phaser.Sprite(this.game, 0, 0, Images.BackgroundIcon);
                iconBackgroundSprite.mask = iconMask;
                this.addChild(iconBackgroundSprite);
                iconSprite = new Phaser.Sprite(this.game, 0, 0, GameData.Data.fighters[fighterIndex][4]);
                iconSprite.mask = iconMask;
                if (index < GameData.Data.progressIndex && index !== 18)
                    iconSprite.tint = 0x000000;
                this.addChild(iconSprite);
            }
            else {
                background = new Phaser.Graphics(this.game, 0, 0);
                background.beginFill(0xFFFFFF, 0.95);
                background.lineStyle(2, 0x07111D, 0.95);
                background.drawPolygon(polygonRight);
                background.endFill();
                this.addChild(background);
                iconMask = new Phaser.Graphics(this.game, 0, 0);
                iconMask.beginFill(0xFFFFFF);
                iconMask.drawPolygon(polygonRightMask);
                iconMask.endFill();
                iconBackgroundSprite = new Phaser.Sprite(this.game, -20, 0, Images.BackgroundIcon);
                iconBackgroundSprite.mask = iconMask;
                this.addChild(iconBackgroundSprite);
                iconSprite = new Phaser.Sprite(this.game, 40, 20, GameData.Data.fighters[fighterIndex][4]);
                iconSprite.anchor.setTo(.5, .5);
                iconSprite.scale.x *= -1;
                iconSprite.mask = iconMask;
                if (index < GameData.Data.progressIndex && index !== GameData.Data.fighterIndex)
                    iconSprite.tint = 0x000000;
                this.addChild(iconSprite);
            }
            var playerBorder = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(90, 10),
                new Phaser.Point(30, 10),
                new Phaser.Point(10, 20),
            ]);
            if (fighterIndex === GameData.Data.fighterIndex) {
                var border = new Phaser.Graphics(this.game, 0, 0);
                border.beginFill(0x005C9E, 0.7);
                border.lineStyle(0, 0x005C9E, 0.0);
                border.drawPolygon(playerBorder);
                border.endFill();
                this.addChild(border);
                var playerText1 = this.game.add.text(8, 0, "И", { font: "12px Georgia", fill: "#FFFFFF", align: "left" });
                this.addChild(playerText1);
                var playerText2 = this.game.add.text(17, -2, "грок", { font: "10px Georgia", fill: "#FFFFFF", align: "left" });
                this.addChild(playerText2);
            }
            var opponentLeftBorder = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(95, 20),
                new Phaser.Point(55, 10),
                new Phaser.Point(5, 10),
            ]);
            var opponentRightBorder = new Phaser.Polygon([
                new Phaser.Point(0, 0),
                new Phaser.Point(85, 0),
                new Phaser.Point(75, 20),
                new Phaser.Point(55, 10),
                new Phaser.Point(-5, 10),
            ]);
            if (index === GameData.Data.progressIndex && orientation === Icon.LEFT) {
                var border = new Phaser.Graphics(this.game, 0, 0);
                border.beginFill(0xFF0000, 0.5);
                border.lineStyle(0, 0xFF0000, 0.0);
                border.drawPolygon(opponentLeftBorder);
                border.endFill();
                this.addChild(border);
                var opponentText = this.game.add.text(67, 0, "ПК", { font: "10px Georgia", fill: "#FFFFFF", align: "left" });
                this.addChild(opponentText);
            }
            else if (index === GameData.Data.progressIndex && orientation === Icon.RIGHT) {
                var border = new Phaser.Graphics(this.game, 0, 0);
                border.beginFill(0xFF0000, 0.5);
                border.lineStyle(0, 0xFF0000, 0.0);
                border.drawPolygon(opponentRightBorder);
                border.endFill();
                this.addChild(border);
                var opponentText = this.game.add.text(60, 0, "CPU", { font: "10px Georgia", fill: "#FFFFFF", align: "left" });
                this.addChild(opponentText);
            }
        };
        Icon.LEFT = "left";
        Icon.RIGHT = "right";
        return Icon;
    }(Phaser.Group));
    Fabrique.Icon = Icon;
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
    var Slides = (function (_super) {
        __extends(Slides, _super);
        function Slides(game, parent) {
            _super.call(this, game, parent);
            this.init();
            this.createSlides();
        }
        Slides.prototype.shutdown = function () {
            this.slideGroup.removeAll();
            this.removeAll();
        };
        Slides.prototype.init = function () {
            GameData.Data.fighterIndex = 1;
            this.canClick = true;
        };
        Slides.prototype.createSlides = function () {
            this.slideGroup = new Phaser.Group(this.game, this);
            var posX = 5;
            var posY = 90;
            var index = 0;
            for (var i = 0; i < GameData.Data.personages.length; i++) {
                if (i === 5)
                    continue;
                var fCard = new Fabrique.FighterCard(this.game, posX + (300 * index), posY, GameData.Data.fighters[i][2], i);
                this.slideGroup.addChild(fCard);
                index++;
            }
            this.buttonLeft = new Phaser.Button(this.game, 205, 190, Images.ArrowLeft, this.onButtonClick, this);
            this.buttonLeft.name = Constants.BUTTON_ARROW_LEFT;
            this.addChild(this.buttonLeft);
            this.buttonRight = new Phaser.Button(this.game, 505, 190, Images.ArrowRight, this.onButtonClick, this);
            this.buttonRight.name = Constants.BUTTON_ARROW_RIGHT;
            this.addChild(this.buttonRight);
            if (GameData.Data.fighterIndex === GameData.Data.personages.length - 1) {
                this.buttonRight.visible = false;
            }
        };
        Slides.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case Constants.BUTTON_ARROW_LEFT:
                    {
                        if (this.canClick) {
                            this.canClick = false;
                            GameData.Data.fighterIndex--;
                            if (GameData.Data.fighterIndex === 5)
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
                            if (GameData.Data.fighterIndex === 5)
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
            else if (GameData.Data.fighterIndex === GameData.Data.personages.length - 1) {
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
var Fabrique;
(function (Fabrique) {
    var Slot = (function (_super) {
        __extends(Slot, _super);
        function Slot(game, x, y, playerSlot, index) {
            _super.call(this, game, x, y);
            this.init(playerSlot, index);
        }
        Slot.prototype.shutdown = function () {
            this.removeChildren();
        };
        Slot.prototype.init = function (playerSlot, index) {
            var text;
            if (playerSlot) {
                this.backgroundColor = 0x266DA8; // 0xC7D9E1; //
                this.borderColor = 0x266DA8; // 0xC7D9E1; //
                this.createPlayerSlot();
                text = this.game.add.text(27, 13, index.toString(), { font: "bold 52px arial", fill: "#266DA8", align: "left" });
            }
            else {
                this.backgroundColor = 0xA32727; // 0xC7D9E1; //
                this.borderColor = 0xA32727; // 0xC7D9E1; //
                this.createOpponentSlot();
                text = this.game.add.text(27, 13, index.toString(), { font: "bold 52px arial", fill: "#A32727", align: "left" });
            }
            this.addChild(text);
        };
        Slot.prototype.createPlayerSlot = function () {
            var graphics = new Phaser.Graphics(this.game, 0, 0);
            graphics.beginFill(this.backgroundColor, 0.5);
            graphics.lineStyle(5, this.borderColor, 0.8);
            graphics.drawRect(0, 0, 84, 84);
            graphics.endFill();
            graphics.beginFill(this.backgroundColor, 0.9);
            graphics.lineStyle(0, this.borderColor, 0.9);
            graphics.moveTo(-2, 25);
            graphics.lineTo(-5, 20);
            graphics.lineTo(-5, -5);
            graphics.lineTo(20, -5);
            graphics.lineTo(25, -2);
            graphics.lineTo(-2, -2);
            graphics.endFill();
            graphics.beginFill(this.backgroundColor, 0.9);
            graphics.lineStyle(0, this.borderColor, 0.9);
            graphics.moveTo(87, 25);
            graphics.lineTo(90, 30);
            graphics.lineTo(90, 90);
            graphics.lineTo(69, 90);
            graphics.lineTo(64, 87);
            graphics.lineTo(87, 87);
            graphics.endFill();
            this.addChild(graphics);
        };
        Slot.prototype.createOpponentSlot = function () {
            var graphics = new Phaser.Graphics(this.game, 0, 0);
            graphics.beginFill(this.backgroundColor, 0.5);
            graphics.lineStyle(5, this.borderColor, 0.8);
            graphics.drawRect(0, 0, 84, 84);
            graphics.endFill();
            graphics.beginFill(this.backgroundColor, 0.9);
            graphics.lineStyle(0, this.borderColor, 0.9);
            graphics.moveTo(86, 25);
            graphics.lineTo(89, 20);
            graphics.lineTo(89, -5);
            graphics.lineTo(64, -5);
            graphics.lineTo(59, -2);
            graphics.lineTo(86, -2);
            graphics.endFill();
            graphics.beginFill(this.backgroundColor, 0.9);
            graphics.lineStyle(0, this.borderColor, 0.9);
            graphics.moveTo(-2, 25);
            graphics.lineTo(-5, 30);
            graphics.lineTo(-5, 90);
            graphics.lineTo(15, 90);
            graphics.lineTo(20, 87);
            graphics.lineTo(-2, 87);
            graphics.endFill();
            this.addChild(graphics);
        };
        return Slot;
    }(Phaser.Sprite));
    Fabrique.Slot = Slot;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Timer = (function (_super) {
        __extends(Timer, _super);
        function Timer(game, x, y) {
            _super.call(this, game, x, y, Images.TabloLevel);
            this.init();
        }
        Timer.prototype.shutdown = function () {
            this.timer.stop(true);
            this.removeChildren();
        };
        Timer.prototype.init = function () {
            this.event = new Phaser.Signal();
            this.count = 30;
            this.timer = this.game.time.create(false);
            this.timer.loop(1000, this.onTimerComplete, this);
            this.timerText = this.game.add.text(45, 12, "0:" + this.count.toString(), { font: "bold 24px arial", fill: "#FFFFFF", align: "left" });
            this.addChild(this.timerText);
            this.messageText = this.game.add.text(40, 40, "............................", { font: "bold 12px arial", fill: "#FFFFFF", align: "left" });
            this.addChild(this.messageText);
        };
        Timer.prototype.onTimerComplete = function () {
            this.count--;
            if (this.timerText !== undefined && this.timerText !== null) {
                if (this.count > 9)
                    this.timerText.text = "0:" + this.count.toString();
                else
                    this.timerText.text = "0:0" + this.count.toString();
            }
            if (this.count === 0) {
                this.event.dispatch(Constants.TIMER_END);
                this.count = 30;
                Utilits.Data.debugLog("TIMER:", "ON COMPLETE");
            }
        };
        Timer.prototype.run = function () {
            this.timer.start(this.count);
        };
        Timer.prototype.runTimer = function () {
            this.resetTimer();
            this.run();
        };
        Timer.prototype.pauseTimer = function (value) {
            if (value === void 0) { value = true; }
            if (value === true)
                this.timer.pause();
            else
                this.timer.start(this.count);
            Utilits.Data.debugLog("TIMER PAUSE:", value);
        };
        Timer.prototype.stopTimer = function () {
            this.timer.stop(false);
            this.count = 30;
            this.setMessage("............................");
            Utilits.Data.debugLog("TIMER:", "STOP");
        };
        Timer.prototype.resetTimer = function () {
            this.count = 30;
        };
        Timer.prototype.setMessage = function (value) {
            if (this.messageText !== undefined && this.messageText !== null) {
                this.messageText.text = value;
                if (value.length < 10)
                    this.messageText.x = 42;
                else
                    this.messageText.x = 20;
            }
        };
        return Timer;
    }(Phaser.Sprite));
    Fabrique.Timer = Timer;
})(Fabrique || (Fabrique = {}));
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
                    Animations.preloadList.forEach(function (assetName) {
                        _this.game.load.json(assetName, 'assets/atlas/' + assetName);
                    });
                    /*
                    Sheet.preloadList.forEach((assetName: string) => {
                        this.game.load.spritesheet(assetName, 'assets/images/' + assetName, 186, 46);
                    });
                    */
                    _this.game.load.spritesheet(Sheet.preloadList[0], 'assets/images/' + Sheet.preloadList[0], 186, 46);
                    _this.game.load.spritesheet(Sheet.preloadList[1], 'assets/images/' + Sheet.preloadList[1], 187, 56);
                    _this.game.load.spritesheet(Sheet.preloadList[2], 'assets/images/' + Sheet.preloadList[2], 108, 31);
                    Decks.preloadList.forEach(function (assetName) {
                        _this.game.load.json(assetName, 'assets/data/' + assetName);
                    });
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
            GameData.Data.initPersonages(this.game);
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
            this.buttonStart = new ButtonOrange(this.game, this.groupButtons, Constants.BUTTON_PLAY, 'НАЧАТЬ ИГРУ', 35, 0, 0);
            this.buttonStart.event.add(this.onButtonClick, this);
            this.buttonSettings = new ButtonOrange(this.game, this.groupButtons, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 40, 0, 50);
            this.buttonSettings.event.add(this.onButtonClick, this);
            this.buttonInvate = new ButtonOrange(this.game, this.groupButtons, Constants.BUTTON_INVATE, 'ПРИГЛАСИТЬ', 35, 0, 100);
            this.buttonSettings.event.add(this.onButtonClick, this);
        };
        Menu.prototype.settingsCreate = function () {
            this.settings = new Settings(this.game, this.groupMenu);
            this.settings.event.add(this.onButtonClick, this);
        };
        Menu.prototype.settingsClose = function () {
            this.settings.removeAll();
            this.groupMenu.removeChild(this.settings);
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
    var Comix = Fabrique.Comix;
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
            this.createComix();
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
            this.buttonBack = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_BACK, 'НАЗАД', 60, 10, 10);
            this.buttonBack.event.add(this.onButtonClick, this);
            this.buttonSettings = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 40, 300, 530);
            this.buttonSettings.event.add(this.onButtonClick, this);
            this.buttonSelect = new ButtonComix(this.game, this.groupWindow, Constants.BUTTON_SELECT, 'ВЫБРАТЬ', 55, 600, 530);
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
        ChoiceFighter.prototype.createComix = function () {
            var comix = new Comix(this.game, this.groupWindow);
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
                case Constants.BUTTON_SELECT:
                    {
                        GameData.Data.initTournament();
                        this.game.state.start(StreetFighterCards.Tournament.Name, true, false);
                        break;
                    }
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
var StreetFighterCards;
(function (StreetFighterCards) {
    var Icon = Fabrique.Icon;
    var ButtonComix = Fabrique.ButtonComix;
    var Settings = Fabrique.Settings;
    var Comix = Fabrique.Comix;
    var Tournament = (function (_super) {
        __extends(Tournament, _super);
        function Tournament() {
            _super.call(this);
            this.name = Tournament.Name;
        }
        Tournament.prototype.create = function () {
            this.group = new Phaser.Group(this.game, this.stage);
            if (GameData.Data.progressIndex === 18)
                GameData.Data.progressIndex++;
            if (GameData.Data.progressIndex < 20) {
                this.createBackground();
                this.createVSPlayers();
                this.createIcons();
                this.createButtons();
                this.createBorder();
            }
            this.createComix();
        };
        Tournament.prototype.shutdown = function () {
            this.icons.forEach(function (icon) {
                icon.shutdown();
            });
            this.buttonBack.shutdown();
            this.buttonStartBattle.shutdown();
            this.buttonSettings.shutdown();
            if (this.tutorial != null)
                this.tutorial.shutdown();
            this.group.removeAll();
        };
        Tournament.prototype.createBackground = function () {
            var background = new Phaser.Sprite(this.game, 0, 0, Images.BackgroundTournament);
            this.group.addChild(background);
        };
        Tournament.prototype.createVSPlayers = function () {
            /* Player */
            var player = new Phaser.Sprite(this.game, 200, 300, GameData.Data.fighters[GameData.Data.fighterIndex][3]);
            player.anchor.setTo(.5, .5);
            player.scale.x *= -1;
            //this.player.scale.y *= -1;
            this.group.addChild(player);
            var playerName = this.game.add.text(35, 350, GameData.Data.personages[GameData.Data.fighterIndex].name, { font: "54px Georgia", fill: "#FFFFFF", align: "left" });
            playerName.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);
            this.group.addChild(playerName);
            /* Opponent */
            var opponentId = GameData.Data.tournamentListIds[GameData.Data.progressIndex];
            var opponent = new Phaser.Sprite(this.game, 400, 0, GameData.Data.fighters[opponentId][3]);
            this.group.addChild(opponent);
            var opponentName = this.game.add.text(575, 350, GameData.Data.personages[opponentId].name, { font: "54px Georgia", fill: "#FFFFFF", align: "left" });
            opponentName.setShadow(5, 5, 'rgba(0,0,0,0.5)', 0);
            this.group.addChild(opponentName);
            /* VS */
            var vs = new Phaser.Sprite(this.game, 195, 200, Images.vsTournament);
            vs.scale.set(0.8, 0.8);
            this.group.addChild(vs);
        };
        Tournament.prototype.createIcons = function () {
            var _this = this;
            /* Icons */
            var icon;
            var position = [
                [25, 415, Icon.LEFT], [110, 415, Icon.LEFT], [195, 415, Icon.LEFT], [280, 415, Icon.LEFT],
                [440, 415, Icon.RIGHT], [525, 415, Icon.RIGHT], [610, 415, Icon.RIGHT], [695, 415, Icon.RIGHT],
                [45, 455, Icon.LEFT], [130, 455, Icon.LEFT], [215, 455, Icon.LEFT],
                [505, 455, Icon.RIGHT], [590, 455, Icon.RIGHT], [675, 455, Icon.RIGHT],
                [65, 495, Icon.LEFT], [150, 495, Icon.LEFT],
                [570, 495, Icon.RIGHT], [655, 495, Icon.RIGHT],
                [85, 535, Icon.LEFT],
                [635, 535, Icon.RIGHT]
            ];
            this.icons = [];
            var i = 0;
            GameData.Data.tournamentListIds.forEach(function (index) {
                icon = new Icon(_this.game, _this.group, i, index, position[i][0], position[i][1], position[i][2]);
                _this.icons.push(icon);
                i++;
            });
        };
        Tournament.prototype.createButtons = function () {
            this.buttonBack = new ButtonComix(this.game, this.group, Constants.BUTTON_BACK, 'НАЗАД', 60, 10, 10);
            this.buttonBack.event.add(this.onButtonClick, this);
            this.buttonSettings = new ButtonComix(this.game, this.group, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 40, 600, 10);
            this.buttonSettings.event.add(this.onButtonClick, this);
            this.buttonStartBattle = new ButtonComix(this.game, this.group, Constants.BUTTON_START_BATTLE, 'НАЧАТЬ БОЙ', 35, 300, 530);
            this.buttonStartBattle.event.add(this.onButtonClick, this);
        };
        Tournament.prototype.createBorder = function () {
            var border = new Phaser.Sprite(this.game, 0, 0, Images.BorderImage);
            this.group.addChild(border);
        };
        Tournament.prototype.createComix = function () {
            var comix = new Comix(this.game, this.group);
            comix.event.add(this.onGameOver, this);
        };
        Tournament.prototype.settingsCreate = function () {
            this.settings = new Settings(this.game, this.group);
            this.settings.event.add(this.onButtonClick, this);
        };
        Tournament.prototype.settingsClose = function () {
            this.settings.removeAll();
            this.group.removeChild(this.settings);
        };
        Tournament.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case Constants.BUTTON_START_BATTLE:
                    {
                        this.game.state.start(StreetFighterCards.Level.Name, true, false);
                        break;
                    }
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
        Tournament.prototype.onGameOver = function (event) {
            Utilits.Data.debugLog('GAME:', 'OVER');
            if (event === Constants.GAME_OVER) {
                this.game.state.start(StreetFighterCards.Menu.Name, true, false);
            }
        };
        Tournament.Name = "tournament";
        return Tournament;
    }(Phaser.State));
    StreetFighterCards.Tournament = Tournament;
})(StreetFighterCards || (StreetFighterCards = {}));
var StreetFighterCards;
(function (StreetFighterCards) {
    var AnimationFlash = Fabrique.AnimationFlash;
    var AnimationKO = Fabrique.AnimationKO;
    var AnimationFight = Fabrique.AnimationFight;
    var AnimationFighter = Fabrique.AnimationFighter;
    var ButtonComix = Fabrique.ButtonComix;
    var ButtonTablo = Fabrique.ButtonTablo;
    var Settings = Fabrique.Settings;
    var Card = Fabrique.Card;
    var FighterProgressBar = Fabrique.FighterProgressBar;
    var Slot = Fabrique.Slot;
    var Timer = Fabrique.Timer;
    var Ai = AI.Ai;
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            _super.call(this);
            this.name = Level.Name;
            // Positions
            this.handPoints = [
                [20, 390], [148, 390], [276, 390], [404, 390], [532, 390]
            ];
            this.slotsPoints = [
                [40, 100], [145, 100], [90, 205], [575, 100], [680, 100], [625, 205]
            ];
        }
        Level.prototype.create = function () {
            this.battleEnd = false;
            this.group = new Phaser.Group(this.game, this.stage);
            this.boardGroup = new Phaser.Group(this.game, this.stage);
            this.borderGroup = new Phaser.Group(this.game, this.stage);
            this.handGroup = new Phaser.Group(this.game, this.stage);
            this.opponentAi = new Ai();
            this.energyCount = 5;
            this.playerLife = GameData.Data.personages[GameData.Data.fighterIndex].life;
            this.playerEnergy = this.energyCount;
            this.playerDeck = [];
            this.playerHand = [];
            this.playerSlots = [null, null, null];
            this.opponentLife = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].life;
            this.opponentEnergy = this.energyCount;
            this.opponentDeck = [];
            this.opponentHand = [];
            this.opponentSlots = [null, null, null];
            this.timerAI = this.game.time.create(false);
            GameData.Data.deckMix(GameData.Data.fighterIndex);
            GameData.Data.deckMix(GameData.Data.tournamentListIds[GameData.Data.progressIndex]);
            this.status = 1;
            this.totalHits = 0;
            this.steepHits = 0;
            this.targetDamage = null;
            this.createBackground();
            this.createTimer();
            this.createSlots();
            this.createButtons();
            this.createBars();
            this.createFighters();
            this.createHand();
            this.createDeck();
            this.createFlash();
            this.createBorder();
            this.showAnimFight();
        };
        Level.prototype.shutdown = function () {
            this.opponentAi = null;
            this.timer.shutdown();
            // groups clear
            this.boardGroup.removeAll();
            this.handGroup.removeAll();
            this.borderGroup.removeAll();
            this.group.removeAll();
            // buttons clear
            this.buttonExit.shutdown();
            this.buttonSettings.shutdown();
            this.buttonTablo.shutdown();
            // slots clear
            this.slots.forEach(function (slot) {
                if (slot !== null && slot !== undefined)
                    slot.shutdown();
            });
            this.slots = null;
            // player clear
            this.playerDeck.forEach(function (card) {
                if (card !== null && card !== undefined)
                    card.shutdown();
            });
            this.playerDeck = null;
            this.playerHand.forEach(function (card) {
                if (card !== null && card !== undefined)
                    card.shutdown();
            });
            this.playerHand = null;
            this.playerSlots.forEach(function (card) {
                if (card !== null && card !== undefined)
                    card.shutdown();
            });
            this.playerSlots = null;
            this.playerFlash.forEach(function (flash) {
                flash.removeChildren();
            });
            this.playerFlash = null;
            // opponent clear
            this.opponentDeck.forEach(function (card) {
                if (card !== null && card !== undefined)
                    card.shutdown();
            });
            this.opponentDeck = null;
            this.opponentHand.forEach(function (card) {
                if (card !== null && card !== undefined)
                    card.shutdown();
            });
            this.opponentHand = null;
            this.opponentSlots.forEach(function (card) {
                if (card !== null && card !== undefined)
                    card.shutdown();
            });
            this.opponentSlots = null;
            this.opponentFlash.forEach(function (flash) {
                flash.removeChildren();
            });
            this.opponentFlash = null;
            this.timerAI.destroy();
            // stage clear
            this.game.stage.removeChildren();
        };
        Level.prototype.settingsCreate = function () {
            this.settings = new Settings(this.game, this.group);
            this.settings.event.add(this.onButtonClick, this);
        };
        Level.prototype.settingsClose = function () {
            this.settings.removeAll();
            this.group.removeChild(this.settings);
        };
        Level.prototype.onButtonClick = function (event) {
            switch (event.name) {
                case Constants.BUTTON_EXIT_BATTLE:
                    {
                        //this.game.state.start(Menu.Name, true, false);
                        this.game.state.start(StreetFighterCards.Tournament.Name, true, false);
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
                case Constants.BUTTON_TABLO:
                    {
                        this.timer.resetTimer();
                        this.endTurn();
                        break;
                    }
                default:
                    break;
            }
        };
        Level.prototype.createBackground = function () {
            var opponentID = GameData.Data.tournamentListIds[GameData.Data.progressIndex];
            var levelTexture = GameData.Data.personages[opponentID].level;
            var background = new Phaser.Sprite(this.game, 0, 0, levelTexture);
            this.group.addChild(background);
        };
        Level.prototype.createTimer = function () {
            this.timer = new Timer(this.game, 340, 12);
            this.timer.event.add(this.onTimerEnd, this);
            this.group.addChild(this.timer);
            this.timer.setMessage("Ваш ход");
            this.timer.runTimer();
            this.buttonTablo = new ButtonTablo(this.game, this.group, Constants.BUTTON_TABLO, "Ход", 40, 353, 80);
            this.buttonTablo.event.add(this.onButtonClick, this);
        };
        Level.prototype.onTimerEnd = function (event) {
            if (event === Constants.TIMER_END) {
                this.endTurn();
            }
        };
        Level.prototype.createSlots = function () {
            this.slots = [];
            var i = 0;
            for (var _i = 0, _a = this.slotsPoints; _i < _a.length; _i++) {
                var value = _a[_i];
                if (i < 3)
                    this.slots.push(new Slot(this.game, value[0], value[1], true, i + 1));
                else
                    this.slots.push(new Slot(this.game, value[0], value[1], false, i - 2));
                this.group.addChild(this.slots[this.slots.length - 1]);
                i++;
            }
        };
        Level.prototype.createHand = function () {
            var background = new Phaser.Sprite(this.game, 0, 375, Images.HandBackground);
            this.group.addChild(background);
        };
        Level.prototype.createButtons = function () {
            this.buttonExit = new ButtonComix(this.game, this.group, Constants.BUTTON_EXIT_BATTLE, 'ВЫЙТИ ИЗ БОЯ', 27, 20, 310);
            this.buttonExit.event.add(this.onButtonClick, this);
            this.buttonSettings = new ButtonComix(this.game, this.group, Constants.BUTTON_SETTINGS, 'НАСТРОЙКИ', 40, 600, 310);
            this.buttonSettings.event.add(this.onButtonClick, this);
        };
        Level.prototype.createBars = function () {
            var playerName = GameData.Data.personages[GameData.Data.fighterIndex].name;
            var opponentName = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].name;
            this.playerProgressBar = new FighterProgressBar(this.game, this.group, GameData.Data.fighterIndex, 25, 25, FighterProgressBar.LEFT, playerName);
            this.playerProgressBar.setEnergy(this.playerEnergy);
            this.playerProgressBar.setLife(this.playerLife);
            this.opponentProgressBar = new FighterProgressBar(this.game, this.group, GameData.Data.tournamentListIds[GameData.Data.progressIndex], 690, 25, FighterProgressBar.RIGHT, opponentName);
            this.opponentProgressBar.setEnergy(this.opponentEnergy);
            this.opponentProgressBar.setLife(this.opponentLife);
        };
        Level.prototype.createFighters = function () {
            var playerPersonage = GameData.Data.personages[GameData.Data.fighterIndex];
            this.playerAnimation = new AnimationFighter(this.game, Constants.ACTIVE_PLAYER, playerPersonage.name, playerPersonage);
            this.playerAnimation.event.add(this.onAnimationComplete, this);
            this.group.addChild(this.playerAnimation);
            var opponentPersonage = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]];
            this.opponentAnimation = new AnimationFighter(this.game, Constants.ACTIVE_OPPONENT, opponentPersonage.name, opponentPersonage);
            this.opponentAnimation.anchor.setTo(.0, .0);
            this.opponentAnimation.scale.x *= -1;
            this.opponentAnimation.event.add(this.onAnimationComplete, this);
            this.group.addChild(this.opponentAnimation);
            this.correctPositionFighterAnimation();
        };
        Level.prototype.correctPositionFighterAnimation = function () {
            //this.playerAnimation.x = 250;
            this.playerAnimation.x = (Constants.GAME_WIDTH / 3);
            this.playerAnimation.y = (370 - 50) - this.playerAnimation.height;
            //this.opponentAnimation.x = (800 - 225) - (this.opponentAnimation.width / 2);
            this.opponentAnimation.x = (Constants.GAME_WIDTH - Constants.GAME_WIDTH / 2.5) - (this.opponentAnimation.width / 2);
            this.opponentAnimation.y = (370 - 50) - this.opponentAnimation.height;
        };
        Level.prototype.createDeck = function () {
            var _this = this;
            this.group.inputEnableChildren = true; // enable drag and drop
            // PLAYER
            var playerName = GameData.Data.personages[GameData.Data.fighterIndex].name;
            var card;
            GameData.Data.personages[GameData.Data.fighterIndex].deck.forEach(function (cardData) {
                card = new Card(_this.game, 660, 390, playerName, cardData);
                card.events.onDragStart.add(_this.onDragStart, _this);
                card.events.onDragStop.add(_this.onDragStop, _this);
                _this.playerDeck.push(card);
                _this.group.addChild(card);
            });
            this.shirt = new Phaser.Sprite(this.game, 660, 390, Atlases.Cards, "card_back.png");
            this.boardGroup.addChild(this.shirt);
            this.moveCardDeckToHandPlayer();
            // OPPONENT
            var opponentName = GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].name;
            GameData.Data.personages[GameData.Data.tournamentListIds[GameData.Data.progressIndex]].deck.forEach(function (cardData) {
                card = new Card(_this.game, 800, 100, opponentName, cardData);
                card.dragAndDrop(false);
                _this.opponentDeck.push(card);
                _this.group.addChild(card);
            });
            this.moveCardDeckToHandOpponent();
        };
        Level.prototype.createFlash = function () {
            this.playerFlash = [];
            this.opponentFlash = [];
            var flash;
            for (var i = 0; i < this.slotsPoints.length; i++) {
                if (i < 3) {
                    flash = new AnimationFlash(this.game, this.slotsPoints[i][0] - 330, this.slotsPoints[i][1] - 240);
                    this.playerFlash.push(flash);
                    this.borderGroup.add(this.playerFlash[this.playerFlash.length - 1]);
                }
                else {
                    flash = new AnimationFlash(this.game, this.slotsPoints[i][0] - 330, this.slotsPoints[i][1] - 240);
                    this.opponentFlash.push(flash);
                    this.borderGroup.add(this.opponentFlash[this.opponentFlash.length - 1]);
                }
            }
        };
        Level.prototype.createBorder = function () {
            var border = new Phaser.Sprite(this.game, 0, 0, Images.BorderLevel);
            this.borderGroup.addChild(border);
        };
        Level.prototype.showAnimFight = function () {
            var fight = new AnimationFight(this.game, 200, 50);
            this.borderGroup.addChild(fight);
        };
        // ДЕЙСТВИЕ: Взять карту
        Level.prototype.onDragStart = function (sprite, pointer, x, y) {
            Utilits.Data.debugLog("START: x=", pointer.x + " y= " + pointer.y);
            this.handGroup.addChild(sprite);
            this.group.removeChild(sprite);
            sprite.reduce(true);
        };
        // ДЕЙСТВИЕ: Положить карту
        Level.prototype.onDragStop = function (sprite, pointer) {
            Utilits.Data.debugLog("STOP: x=", pointer.x + " y= " + pointer.y);
            var pushInSlot = false;
            if (sprite.cardData.energy <= this.playerEnergy) {
                for (var index in this.slotsPoints) {
                    if (index === '3')
                        break; // доступны только слоты игрока
                    // проверяем координаты
                    if ((pointer.x >= this.slotsPoints[index][0] && pointer.x <= this.slotsPoints[index][0] + 84)
                        && (pointer.y >= this.slotsPoints[index][1] && pointer.y <= this.slotsPoints[index][1] + 84)) {
                        if (this.playerSlots[index] === null) {
                            pushInSlot = true;
                            // уменьшение энергии
                            this.playerEnergy -= sprite.cardData.energy;
                            this.playerProgressBar.setEnergy(this.playerEnergy);
                            // помещаем карту в слот
                            sprite.x = this.slotsPoints[index][0] + 1;
                            sprite.y = this.slotsPoints[index][1] + 1;
                            sprite.scale.set(0.65, 0.65);
                            sprite.dragAndDrop(false);
                            // меняем группу
                            this.boardGroup.addChild(sprite);
                            this.handGroup.removeChild(sprite);
                            // меняем стэк
                            this.playerSlots[index] = this.playerHand.splice(sprite.indexInHand, 1)[0];
                            // передвигаем карты в руке
                            this.moveHandCardToEmptyPlayer();
                            Utilits.Data.debugLog("Slots/Hand:", [this.playerSlots, this.playerHand]);
                        }
                        break;
                    }
                }
            }
            if (pushInSlot === false) {
                sprite.reduce(false);
                this.returnCardToHand(sprite);
            }
        };
        // АНИМАЦИЯ - Игрока
        Level.prototype.moveCardDeckToHandPlayer = function () {
            if (this.playerHand.length < 5) {
                this.playerHand.push(this.playerDeck.shift());
                if (this.status === Constants.STATUS_1_PLAYER_P_PROCESS_AI_WAIT) {
                    this.playerHand[this.playerHand.length - 1].dragAndDrop(true); // разрешаем игроку перетаскивание карт                    
                }
                else if (this.status === Constants.STATUS_2_PLAYER_P_COMPLETE_AI_PROCESS) {
                    this.playerHand[this.playerHand.length - 1].dragAndDrop(false); // запрещаем перетаскивание карт
                }
                else if (this.status === Constants.STATUS_4_AI_AI_PROCESS_P_WAIT) {
                    this.playerHand[this.playerHand.length - 1].dragAndDrop(false); // запрещаем перетаскивание карт
                }
                else if (this.status === Constants.STATUS_5_AI_AI_COMPLETE_P_PROCESS) {
                    this.playerHand[this.playerHand.length - 1].dragAndDrop(true); // разрешаем игроку перетаскивание карт
                }
                this.playerHand[this.playerHand.length - 1].indexInHand = this.playerHand.length - 1;
                this.tween = this.game.add.tween(this.playerHand[this.playerHand.length - 1]);
                this.tween.onComplete.add(this.moveCardDeckToHandPlayer, this);
                this.tween.to({ x: this.handPoints[this.playerHand.length - 1][0] }, 250, 'Linear');
                this.tween.start();
            }
            Utilits.Data.debugLog("Player Hand:", this.playerHand);
        };
        Level.prototype.moveHandCardToEmptyPlayer = function () {
            if (this.playerHand.length < 5) {
                var tweenMoveToEmpty = void 0;
                for (var i = 0; i < this.playerHand.length; i++) {
                    this.playerHand[i].indexInHand = i;
                    tweenMoveToEmpty = this.game.add.tween(this.playerHand[i]);
                    tweenMoveToEmpty.to({ x: this.handPoints[i][0] }, 250, 'Linear');
                    tweenMoveToEmpty.start();
                }
            }
        };
        Level.prototype.moveHandCardToEmptyOpponent = function () {
            if (this.opponentHand.length < 5) {
                for (var i = 0; i < this.opponentHand.length; i++) {
                    this.opponentHand[i].indexInHand = i;
                }
            }
        };
        Level.prototype.returnCardToHand = function (card) {
            this.tween = this.game.add.tween(card);
            this.tween.to({
                x: this.handPoints[card.indexInHand][0],
                y: this.handPoints[card.indexInHand][1]
            }, 250, 'Linear');
            this.tween.onComplete.add(this.onCardBackToHand, this);
            this.tween.start();
        };
        Level.prototype.onCardBackToHand = function (card) {
            this.group.addChild(card);
            this.handGroup.removeChild(card);
        };
        // блокировать или разблокировать все карты в руке
        Level.prototype.cardsDragAndDrop = function (value) {
            var _this = this;
            this.playerHand.forEach(function (card) {
                card.dragAndDrop(value);
                if (value === false) {
                    card.reduce(false);
                    _this.returnCardToHand(card);
                }
            });
        };
        // АНИМАЦИЯ - AI
        Level.prototype.moveCardDeckToHandOpponent = function () {
            while (this.opponentHand.length < 5) {
                this.opponentHand.push(this.opponentDeck.shift());
                this.opponentHand[this.opponentHand.length - 1].indexInHand = this.opponentHand.length - 1;
            }
            Utilits.Data.debugLog("Opponent Hand:", this.opponentHand);
        };
        Level.prototype.moveCardHandToBoardOpponent = function () {
            var _this = this;
            this.opponentDataAI = {};
            this.opponentDataAI.aiEnergy = this.opponentEnergy;
            this.opponentDataAI.aiHand = this.opponentHand;
            this.opponentDataAI.aiLife = this.opponentLife;
            this.opponentDataAI.playerEnergy = this.playerEnergy;
            this.opponentDataAI.playerLife = this.playerLife;
            this.opponentDataAI.playerSlots = this.playerSlots;
            this.opponentAi.setData(this.opponentDataAI);
            if (this.status === Constants.STATUS_2_PLAYER_P_COMPLETE_AI_PROCESS) {
                this.opponentHitsAI = this.opponentAi.getHits(Constants.ACTIVE_PLAYER);
            }
            else if (this.status === Constants.STATUS_4_AI_AI_PROCESS_P_WAIT) {
                this.opponentHitsAI = this.opponentAi.getHits(Constants.ACTIVE_OPPONENT);
            }
            if (this.opponentHitsAI.length > 0) {
                var tweenMoveToSlot = void 0;
                var tweenScale = void 0;
                var card = void 0;
                var indexInHand = void 0;
                for (var i = 0; i < this.opponentHitsAI.length; i++) {
                    indexInHand = this.opponentHitsAI[i];
                    if (indexInHand === undefined || indexInHand === null)
                        continue;
                    card = this.opponentHand[indexInHand];
                    // уменьшение энергии
                    this.opponentEnergy -= card.cardData.energy;
                    this.opponentProgressBar.setEnergy(this.opponentEnergy);
                    // меняем группу
                    this.boardGroup.addChild(card);
                    this.group.removeChild(card);
                    // меняем стэк
                    this.opponentSlots[i] = card;
                    this.opponentHand[card.indexInHand] = null;
                    // анимация: помещаем карту в слот
                    card.reduce(true);
                    tweenMoveToSlot = this.game.add.tween(card);
                    tweenMoveToSlot.to({ x: this.slotsPoints[i + 3][0] + 1, y: this.slotsPoints[i + 3][1] + 1 }, 250, 'Linear');
                    tweenMoveToSlot.start();
                    tweenScale = this.game.add.tween(card.scale);
                    tweenScale.to({ x: 0.65, y: 0.65 }, 250, 'Linear');
                    tweenScale.start();
                }
                // коррекция данных в руке (передвигаем карты в руке)
                var indexCorrect = 0;
                for (var i = 0; i < this.opponentHand.length; i++) {
                    if (this.opponentHand[i] === null) {
                        this.opponentHand.splice(i, 1);
                        i--;
                    }
                    else {
                        this.opponentHand[i].indexInHand = indexCorrect;
                        indexCorrect++;
                    }
                }
                this.timerAI.loop(3000, function () {
                    _this.timerAI.stop();
                    _this.timer.resetTimer();
                    _this.endTurn();
                }, this);
                this.timerAI.start();
                Utilits.Data.debugLog("AI: Slots/Hand:", [this.opponentSlots, this.opponentHand]);
            }
        };
        /** ХОД (очередность ходов)
         *  status-1: Ход игрока - игрок выкладывает карты - ИИ ждет				(кнопка - true)
         *  status-2: Ход игрока - игрок положил карты - ИИ выкладыват карты		(кнопка - false)
         *  status-3: Выполняются карты на столе (Атака Игрока)									(кнопка - false)
         *  status-4: Ход ИИ - ИИ выкладывает карты - игрок ждет					(кнопка - false)
         *  status-5: Ход ИИ - ИИ положил карты - игрок выкладывает карты			(кнопка - true)
         *  status-6: Выполняются карты на столе (Атака ИИ)							(кнопка - false)
        */
        Level.prototype.endTurn = function () {
            Utilits.Data.debugLog("Status", this.status);
            if (this.status === Constants.STATUS_1_PLAYER_P_PROCESS_AI_WAIT) {
                /**
                 * Атака игрока.
                 * Время выкладывать карты игрока вышло.
                 * Очередь выкладывать карты переходит к оппоненту
                 */
                this.status = Constants.STATUS_2_PLAYER_P_COMPLETE_AI_PROCESS;
                this.cardsDragAndDrop(false); // запрещаем перетаскивание карт
                this.buttonTablo.buttonVisible(false);
                this.timer.setMessage("Ход противника");
                this.moveCardHandToBoardOpponent(); // ИИ выкладывания карт
            }
            else if (this.status === Constants.STATUS_2_PLAYER_P_COMPLETE_AI_PROCESS) {
                /**
                 * Атака игрока.
                 * Время выкладывать карты оппонента вышло.
                 * Статус выполнения ударов
                 */
                this.timer.stopTimer();
                this.status = Constants.STATUS_3_PLAYER_ATTACK;
                this.cardsDragAndDrop(false); // запрещаем перетаскивание карт
                this.timer.setMessage("Ход противника");
                this.buttonTablo.buttonVisible(false);
                this.endTurn();
            }
            else if (this.status === Constants.STATUS_3_PLAYER_ATTACK) {
                /**
                 * Выполняются УДАРЫ выложенными картами.
                 * Ход передается оппоненту
                 */
                Utilits.Data.debugLog("[HIT PLAYER]", "Execute HITS");
                this.implementHits();
            }
            else if (this.status === Constants.STATUS_4_AI_AI_PROCESS_P_WAIT) {
                /**
                 * Атака оппонента.
                 * Время выкладывать карты оппонента вышло.
                 * Очередь выкладывать карты переходит к игроку
                 */
                this.status = Constants.STATUS_5_AI_AI_COMPLETE_P_PROCESS;
                this.cardsDragAndDrop(true); // разрешаем перетаскивание карт
                this.buttonTablo.buttonVisible(true);
                this.timer.setMessage("Ваш ход");
            }
            else if (this.status === Constants.STATUS_5_AI_AI_COMPLETE_P_PROCESS) {
                /**
                 * Атака оппонента.
                 * Время выкладывать карты игрока вышло.
                 * Статус выполнения ударов
                 */
                this.timer.stopTimer(); // останачливаем таймер
                this.status = Constants.STATUS_6_AI_ATTACK;
                this.cardsDragAndDrop(false); // запрещаем перетаскивание карт
                this.timer.setMessage("Ваш ход");
                this.buttonTablo.buttonVisible(false);
                this.endTurn();
            }
            else if (this.status === Constants.STATUS_6_AI_ATTACK) {
                /**
                 * Выполняются УДАРЫ выложенными картами.
                 * Ход передается игроку
                 */
                Utilits.Data.debugLog("[HIT OPPONENT]", "Execute HITS");
                this.implementHits();
            }
        };
        // ВЫПОЛНЕНИЕ УДАРОВ
        Level.prototype.implementHits = function () {
            var _this = this;
            Utilits.Data.debugLog("IMPLEMENTATION: cards [slot/steep]:", [this.totalHits, this.steepHits]);
            this.targetDamage = null;
            if (this.totalHits > 2) {
                this.totalHits = 0;
                this.steepHits = 0;
                this.targetDamage = null;
                this.playerAnimation.stanceAnimation();
                this.opponentAnimation.stanceAnimation();
                this.correctPositionFighterAnimation();
                this.moveCardDeckToHandPlayer();
                this.moveCardDeckToHandOpponent();
                if (this.status === Constants.STATUS_3_PLAYER_ATTACK) {
                    this.status = Constants.STATUS_4_AI_AI_PROCESS_P_WAIT;
                    this.cardsDragAndDrop(false); // запрещаем перетаскивание карт
                    this.timer.setMessage("Ход противника");
                    this.timerAI.loop(3000, function () {
                        _this.timerAI.stop();
                        _this.moveCardHandToBoardOpponent(); // ИИ выкладывания карт
                    }, this);
                    this.timerAI.start();
                }
                else if (this.status === Constants.STATUS_6_AI_ATTACK) {
                    this.status = Constants.STATUS_1_PLAYER_P_PROCESS_AI_WAIT;
                    this.buttonTablo.buttonVisible(true);
                    this.cardsDragAndDrop(true); // разрешаем игроку перетаскивание карт
                    this.timer.setMessage("Ваш ход");
                }
                this.energyRecovery();
                this.timer.runTimer();
                return;
            }
            // Получаем карты из слотов
            var playerCard = this.playerSlots[this.totalHits] === undefined ? null : this.playerSlots[this.totalHits];
            var opponentCard = this.opponentSlots[this.totalHits] === undefined ? null : this.opponentSlots[this.totalHits];
            // Возвращаем отработанные карты в колоду
            this.playerSlots[this.totalHits] = null;
            this.opponentSlots[this.totalHits] = null;
            if (playerCard !== null) {
                this.playerFlash[this.totalHits].playAnimation();
                playerCard.x = 660;
                playerCard.y = 390;
                playerCard.scale.set(1.0, 1.0);
                playerCard.reduce(false);
                playerCard.dragAndDrop(false);
                this.playerDeck.push(playerCard);
                this.group.addChild(playerCard);
                this.boardGroup.removeChild(playerCard);
            }
            if (opponentCard !== null) {
                this.opponentFlash[this.totalHits].playAnimation();
                opponentCard.x = 800;
                opponentCard.y = 100;
                opponentCard.scale.set(1.0, 1.0);
                opponentCard.reduce(false);
                opponentCard.dragAndDrop(false);
                this.opponentDeck.push(opponentCard);
                this.group.addChild(opponentCard);
                this.boardGroup.removeChild(opponentCard);
            }
            // выполняем анимацию карт
            this.animationHits(playerCard, opponentCard);
        };
        // Распределение анимаций
        Level.prototype.animationHits = function (playerCard, opponentCard) {
            // #1: оба слота пустые
            if (playerCard === null && opponentCard === null) {
                this.totalHits++;
                this.steepHits = 0;
                this.targetDamage = null;
                this.playerAnimation.stanceAnimation();
                this.opponentAnimation.stanceAnimation();
                this.correctPositionFighterAnimation();
                this.implementHits();
            }
            else {
                // #2: слот оппонента пустой, слот игрока не пустой
                if (opponentCard === null && playerCard !== null) {
                    if (playerCard.cardData.type === Constants.CARD_TYPE_ATTACK) {
                        this.targetDamage = Constants.OPPONENT; // оппонент получает удары
                        this.damageCalculation(Constants.OPPONENT, playerCard, opponentCard);
                    }
                    else {
                        this.steepHits++; // оппонент ничего не делает
                    }
                    this.playerAnimation.hitAnimation(playerCard.cardData);
                    this.correctPositionFighterAnimation();
                }
                else {
                    // #3: слот игрока пустой, стол оппонента не пустой
                    if (playerCard === null && opponentCard !== null) {
                        if (opponentCard.cardData.type === Constants.CARD_TYPE_ATTACK) {
                            this.targetDamage = Constants.PLAYER; // игрок получает удары
                            this.damageCalculation(Constants.PLAYER, opponentCard, playerCard);
                        }
                        else {
                            this.steepHits++; // игрок ничего не делает
                        }
                        this.opponentAnimation.hitAnimation(opponentCard.cardData); // оппонент выполняет атаку
                        this.correctPositionFighterAnimation();
                    }
                    else {
                        // #4: оба слота не пустые
                        if (playerCard !== null && opponentCard !== null) {
                            // атака (игрок) - атака (оппонент)
                            if (playerCard.cardData.type === Constants.CARD_TYPE_ATTACK
                                && opponentCard.cardData.type === Constants.CARD_TYPE_ATTACK) {
                                this.steepHits = -1;
                                this.targetDamage = Constants.PLAYER_AND_OPPONENT; // игрок и оппонент получат удары
                                this.playerAnimation.hitAnimation(playerCard.cardData); // выполняется карта игрока
                                this.opponentAnimation.hitAnimation(opponentCard.cardData); // выполняется карта оппонента
                                this.correctPositionFighterAnimation();
                            }
                            else {
                                // блок (игрок) - блок (оппонент)
                                // атака (игрок) - блок (оппонент)
                                // блок (игрок) - атака (оппонент)
                                this.playerAnimation.hitAnimation(playerCard.cardData); // выполняется карта игрока
                                this.opponentAnimation.hitAnimation(opponentCard.cardData); // выполняется карта оппонента
                                this.correctPositionFighterAnimation();
                            }
                            this.damageCalculation(Constants.PLAYER, opponentCard, playerCard);
                            this.damageCalculation(Constants.OPPONENT, playerCard, opponentCard);
                        }
                    }
                }
            }
        };
        // АНИМАЦИЯ УДАРОВ/БЛОКОВ/ПОВРЕЖДЕНИЙ - АНИМАЦИЯ ВЫПОЛНЕНА
        Level.prototype.onAnimationComplete = function (target, hit) {
            Utilits.Data.debugLog('ANIMATION steep complete [target/type]:', [target, hit]);
            if (target === Constants.ANIMATION_PLAYER_COMPLETE) {
                this.steepHits++;
                if (hit === Constants.ANIMATION_TYPE_DAMAGE && this.battleEnd === false)
                    this.playerAnimation.stanceAnimation();
            }
            else if (target === Constants.ANIMATION_OPPONENT_COMPLETE) {
                this.steepHits++;
                if (hit === Constants.ANIMATION_TYPE_DAMAGE && this.battleEnd === false)
                    this.opponentAnimation.stanceAnimation();
            }
            if (this.targetDamage === Constants.PLAYER) {
                this.targetDamage = null;
                this.playerAnimation.damageAnimation();
                this.correctPositionFighterAnimation();
            }
            else if (this.targetDamage === Constants.OPPONENT) {
                this.targetDamage = null;
                this.opponentAnimation.damageAnimation();
                this.correctPositionFighterAnimation();
            }
            else if (this.targetDamage === Constants.PLAYER_AND_OPPONENT) {
                this.targetDamage = null;
                this.playerAnimation.damageAnimation();
                this.opponentAnimation.damageAnimation();
                this.correctPositionFighterAnimation();
            }
            Utilits.Data.debugLog('ANIMATION steep hits:', this.steepHits);
            if (this.steepHits >= 2) {
                if (this.battleEnd === false) {
                    this.steepHits = 0;
                    this.totalHits++;
                    this.targetDamage = null;
                    this.playerAnimation.stanceAnimation();
                    this.opponentAnimation.stanceAnimation();
                    this.correctPositionFighterAnimation();
                    this.implementHits();
                }
                else {
                    if (this.steepHits <= 2) {
                        this.timer.stopTimer();
                        this.timer.setMessage("Конец боя");
                        if (this.playerLife > 0 && this.opponentLife <= 0) {
                            this.playerAnimation.winAnimation();
                            this.opponentAnimation.loseAnimation();
                            this.correctPositionFighterAnimation();
                        }
                        else {
                            this.playerAnimation.loseAnimation();
                            this.opponentAnimation.winAnimation();
                            this.correctPositionFighterAnimation();
                        }
                    }
                    if (this.steepHits >= 4) {
                        this.endBattle();
                    }
                }
            }
        };
        // Начисление урона
        Level.prototype.damageCalculation = function (target, cardAttack, cardBlock) {
            var attack = 0;
            var block = 0;
            var totalDamage = 0;
            if (cardAttack === null) {
                attack = 0;
            }
            else if (cardAttack.cardData.type === Constants.CARD_TYPE_DEFENSE) {
                attack = 0;
            }
            else if (cardAttack.cardData.type === Constants.CARD_TYPE_ATTACK) {
                attack = cardAttack.cardData.power;
            }
            if (cardBlock === null) {
                block = 0;
            }
            else if (cardBlock.cardData.type === Constants.CARD_TYPE_ATTACK) {
                block = 0;
            }
            else if (cardBlock.cardData.type === Constants.CARD_TYPE_DEFENSE) {
                block = cardBlock.cardData.power;
            }
            // Игроку начисляется урон
            if (target === Constants.PLAYER) {
                totalDamage = (attack - block) > 0 ? (attack - block) : 0;
                this.playerLife -= totalDamage;
                if (this.playerLife <= 0) {
                    this.playerLife = 0;
                    this.battleEnd = true;
                }
                this.playerProgressBar.setLife(this.playerLife);
            }
            // Оппоненту начисляется урон
            if (target === Constants.OPPONENT) {
                totalDamage = (attack - block) > 0 ? (attack - block) : 0;
                this.opponentLife -= totalDamage;
                if (this.opponentLife <= 0) {
                    this.opponentLife = 0;
                    this.battleEnd = true;
                }
                this.opponentProgressBar.setLife(this.opponentLife);
            }
            Utilits.Data.debugLog('DAMAGE:', [target, attack, block, totalDamage]);
        };
        // Восстановление энергии
        Level.prototype.energyRecovery = function () {
            if (this.energyCount < 10)
                this.energyCount++;
            this.playerEnergy = this.energyCount;
            this.playerProgressBar.setEnergy(this.playerEnergy);
            this.opponentEnergy = this.energyCount;
            this.opponentProgressBar.setEnergy(this.opponentEnergy);
        };
        // Завершение битвы
        Level.prototype.endBattle = function () {
            var ko = new AnimationKO(this.game, 315, 100);
            this.borderGroup.addChild(ko);
            if (this.playerLife > 0 && this.opponentLife <= 0) {
                GameData.Data.progressIndex++;
            }
            setTimeout(function () {
                this.game.state.start(StreetFighterCards.Tournament.Name, true, false);
                Utilits.Data.debugLog("BATTLE", "END!");
            }.bind(this), 3000);
        };
        Level.Name = "level";
        return Level;
    }(Phaser.State));
    StreetFighterCards.Level = Level;
})(StreetFighterCards || (StreetFighterCards = {}));
/// <reference path="..\node_modules\phaser-ce\typescript\phaser.d.ts" />
/// <reference path="AI\AI.ts" />
/// <reference path="Data\Constants.ts" />
/// <reference path="Data\Config.ts" />
/// <reference path="Data\Images.ts" />
/// <reference path="Data\Animations.ts" />
/// <reference path="Data\Atlases.ts" />
/// <reference path="Data\Sheets.ts" />
/// <reference path="Data\Decks.ts" />
/// <reference path="Data\GameData.ts" />
/// <reference path="Data\Utilits.ts" />
/// <reference path="Fabrique\Objects\AnimationBigKen.ts" />
/// <reference path="Fabrique\Objects\AnimationBigRyu.ts" />
/// <reference path="Fabrique\Objects\AnimationFight.ts" />
/// <reference path="Fabrique\Objects\AnimationFighter.ts" />
/// <reference path="Fabrique\Objects\AnimationFlash.ts" />
/// <reference path="Fabrique\Objects\AnimationKO.ts" />
/// <reference path="Fabrique\Objects\ButtonOrange.ts" />
/// <reference path="Fabrique\Objects\ButtonComix.ts" />
/// <reference path="Fabrique\Objects\ButtonTablo.ts" />
/// <reference path="Fabrique\Objects\Card.ts" />
/// <reference path="Fabrique\Objects\Comix.ts" />
/// <reference path="Fabrique\Objects\FighterCard.ts" />
/// <reference path="Fabrique\Objects\FighterProgressBar.ts" />
/// <reference path="Fabrique\Objects\Icon.ts" />
/// <reference path="Fabrique\Objects\Settings.ts" />
/// <reference path="Fabrique\Objects\Slides.ts" />
/// <reference path="Fabrique\Objects\Slot.ts" />
/// <reference path="Fabrique\Objects\Timer.ts" />
/// <reference path="Fabrique\Objects\Tutorial.ts" />
/// <reference path="States\Boot.ts" />
/// <reference path="States\Preloader.ts" />
/// <reference path="States\Menu.ts" />
/// <reference path="States\ChoiceFighter.ts" />
/// <reference path="States\Tournament.ts" />
/// <reference path="States\Level.ts" />
/// <reference path="app.ts" /> 
var Fabrique;
(function (Fabrique) {
    var TimerOld = (function (_super) {
        __extends(TimerOld, _super);
        function TimerOld(game, x, y) {
            _super.call(this, game, x, y, Images.TabloLevel);
            this.init();
        }
        TimerOld.prototype.shutdown = function () {
            this.stopTimer();
            this.removeChildren();
        };
        TimerOld.prototype.init = function () {
            this.event = new Phaser.Signal();
            this.count = 30;
            this.pause = false;
            this.stop = false;
            this.timerText = this.game.add.text(45, 12, "0:" + this.count.toString(), { font: "bold 24px arial", fill: "#FFFFFF", align: "left" });
            this.addChild(this.timerText);
            this.messageText = this.game.add.text(40, 40, "............................", { font: "bold 12px arial", fill: "#FFFFFF", align: "left" });
            this.addChild(this.messageText);
        };
        TimerOld.prototype.run = function () {
            setTimeout(this.onTimerComplete.bind(this), 1000);
        };
        TimerOld.prototype.runTimer = function () {
            this.resetTimer();
            this.run();
        };
        TimerOld.prototype.pauseTimer = function (value) {
            if (value === void 0) { value = true; }
            this.pause = value;
            if (this.pause === false)
                this.runTimer();
            Utilits.Data.debugLog("TIMER PAUSE:", this.pause);
        };
        TimerOld.prototype.stopTimer = function () {
            this.stop = true;
            this.count = 30;
            this.setMessage("............................");
            Utilits.Data.debugLog("TIMER STOP:", this.stop);
        };
        TimerOld.prototype.resetTimer = function () {
            this.stop = false;
            this.pause = false;
            this.count = 30;
        };
        TimerOld.prototype.onTimerComplete = function () {
            if (this.pause === true || this.stop === true)
                return;
            this.count--;
            if (this.timerText !== undefined && this.timerText !== null) {
                if (this.count > 9)
                    this.timerText.text = "0:" + this.count.toString();
                else
                    this.timerText.text = "0:0" + this.count.toString();
            }
            if (this.count <= 0) {
                this.count = 30;
                this.event.dispatch(Constants.TIMER_END);
            }
            if (this.pause === false || this.stop === false)
                this.run();
        };
        TimerOld.prototype.setMessage = function (value) {
            if (this.messageText !== undefined && this.messageText !== null) {
                this.messageText.text = value;
                if (value.length < 10)
                    this.messageText.x = 42;
                else
                    this.messageText.x = 20;
            }
        };
        return TimerOld;
    }(Phaser.Sprite));
    Fabrique.TimerOld = TimerOld;
})(Fabrique || (Fabrique = {}));
