
/* == START FILE ========================================================= */

var Backmenu = function(parent)
{
	var that = {
		windowStage: null,
		lineAnimationGraphics: null,
		styleBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 },
		styleRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }, 
		styleButtonBlueText: { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 },
		styleButtonRedText: { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }, 
		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		create: function()
		{
			that.windowStage = new PIXI.Container();
			that.backgroundCreate();
			that.windowCreate();
			that.titleCreate();
			that.textCreate();
			that.buttonsCreate();
		},
		
		backgroundCreate: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.hitArea = new PIXI.Rectangle(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
			graphics.interactive = true;
			graphics.lineStyle(1, 0x000000, 0.05);
			graphics.beginFill(0x000000, 0.5);
			graphics.drawRect(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
			graphics.endFill();
			that.windowStage.addChild(graphics);
		},
		
		windowCreate: function()
		{
			if(parent.config.side === that.SIDE_NONE ||  parent.config.side === that.SIDE_JEDI)
			{
				var graphics = new PIXI.Graphics(); 
				graphics.lineStyle(2, 0x0080C0, 1);
				graphics.beginFill(0x0080C0, 0.2);
				graphics.moveTo(250,250);
				graphics.lineTo(600, 250);
				graphics.lineTo(600, 500);
				graphics.lineTo(250, 500);
				graphics.endFill();
				for(var i = 0; i < 40; i++)
				{
					graphics.lineStyle(1, 0x0090F0, 0.5);
					graphics.moveTo(250,280+(3*i));
					graphics.lineTo(600, 280+(3*i));
				}
				that.windowStage.addChild(graphics);
				
				that.lineAnimationGraphics = new PIXI.Graphics(); 
				that.lineAnimationGraphics.lineStyle(10, 0x0090F0, 0.3);
				that.lineAnimationGraphics.moveTo(250,255);
				that.lineAnimationGraphics.lineTo(600, 255);
				that.windowStage.addChild(that.lineAnimationGraphics);
				
				graphics = new PIXI.Graphics(); 
				graphics.lineStyle(1, 0x0080C0, 1);
				graphics.beginFill(0x0080C0, 1);
				graphics.moveTo(400,250);
				graphics.lineTo(425, 275);
				graphics.lineTo(600, 275);
				graphics.lineTo(600, 250);
				graphics.endFill();
				that.windowStage.addChild(graphics);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				var graphics = new PIXI.Graphics(); 
				graphics.lineStyle(2, 0xA63A24, 1);
				graphics.beginFill(0xA63A24, 0.2);
				graphics.moveTo(250,250);
				graphics.lineTo(600, 250);
				graphics.lineTo(600, 500);
				graphics.lineTo(250, 500);
				graphics.endFill();
				for(var i = 0; i < 40; i++)
				{
					graphics.lineStyle(1, 0xA63A24, 0.5);
					graphics.moveTo(250,280+(3*i));
					graphics.lineTo(600, 280+(3*i));
				}
				that.windowStage.addChild(graphics);
				
				that.lineAnimationGraphics = new PIXI.Graphics(); 
				that.lineAnimationGraphics.lineStyle(10, 0xA63A24, 0.3);
				that.lineAnimationGraphics.moveTo(250,255);
				that.lineAnimationGraphics.lineTo(600, 255);
				that.windowStage.addChild(that.lineAnimationGraphics);
				
				graphics = new PIXI.Graphics(); 
				graphics.lineStyle(1, 0xA63A24, 1);
				graphics.beginFill(0xA63A24, 1);
				graphics.moveTo(400,250);
				graphics.lineTo(425, 275);
				graphics.lineTo(600, 275);
				graphics.lineTo(600, 250);
				graphics.endFill();
				that.windowStage.addChild(graphics);
			}
		},
		
		titleCreate: function()
		{
			var text;
			if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI) text = new PIXI.Text("ПРЕДУПРЕЖДЕНИЕ", that.styleBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text("ПРЕДУПРЕЖДЕНИЕ", that.styleRedText); 
			text.x = 450;
			text.y = 255;
			that.windowStage.addChild(text);
		},
		
		textCreate: function()
		{
			var text;
			if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI) text = new PIXI.Text("\n    Вы собираетесь выйти в главное меню.\n    В таком случае прогресс будет потерян.\n\n\n     Продолжить выход в основное меню?", that.styleBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text("\n    Вы собираетесь выйти в главное меню.\n    В таком случае прогресс будет потерян.\n\n\n     Продолжить выход в основное меню?", that.styleRedText); 
			text.x = 255;
			text.y = 285;
			that.windowStage.addChild(text);
		},
		
		buttonsCreate: function()
		{
			if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = "yes";
				button.position.x = 255; 
				button.position.y = 450; 
				button.scale.set(0.8);
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);
				var text = new PIXI.Text("Да", that.styleButtonBlueText); 
				text.x = button.width / 2;
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
				
				button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = "no";
				button.position.x = 435; 
				button.position.y = 450; 
				button.scale.set(0.8);
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);
				var text = new PIXI.Text("Нет", that.styleButtonBlueText); 
				text.x = button.width / 2;
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
				button.name = "yes";
				button.position.x = 255; 
				button.position.y = 450; 
				button.scale.set(0.8);
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);
				var text = new PIXI.Text("Да", that.styleButtonRedText); 
				text.x = button.width / 2;
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
				
				button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
				button.name = "no";
				button.position.x = 435; 
				button.position.y = 450; 
				button.scale.set(0.8);
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);
				var text = new PIXI.Text("Нет", that.styleButtonRedText); 
				text.x = button.width / 2;
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
			}
		},
		
		onButtonOver: function(event)
		{
			this.isOver = true;
			this.gotoAndPlay(1);
		},
		
		onButtonOut: function(event)
		{
			this.isOver = false;
			this.gotoAndStop(0);
		},
		
		onButtonUpdate: function(event)
		{
			if(this.isOver)
			{
				this.gotoAndPlay(1);
			}else{
				this.gotoAndStop(0);
			}
		},
		
		onButtonClick: function(event)
		{
                        parent.sound.soundPlayStarWarsButtonClick();
			switch (this.name)
			{
				case "yes":
					parent.backmenuClose(true);
					break;
				case "no":
					parent.backmenuClose(false);
					break;
				default:
					break;
			}
		},
		
		tweenStart: function()
		{
			createjs.Tween.get(that.lineAnimationGraphics, {loop: true}) 
				.to({x: 0, y: 240}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Ticker.setFPS(60);
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.lineAnimationGraphics);
		},
		
		show: function()
		{
                        if(parent.level !== null) parent.timer.timerPauseBegin();
			that.tweenStart();
			return that.windowStage;
		},
		
		close: function()
		{
                        if(parent.level !== null)parent.timer.timerPauseEnd();
			that.tweenStop();
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			return that.windowStage;
		},
		
		getWindowStage: function()
		{
			return that.windowStage;
		},
		
		destroy: function()
		{
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			that.windowStage.destroy();
			delete that.windowStage.children;
			
			for(var property in that) that[property] = null;
		}
		
		
		
	};
	return that;
};

/* == END FILE ========================================================== */

/* == START FILE ========================================================= */


var Command = function(parent)
{
	var that = {
		windowStage: null,
		spaceBackground: null,
		lineAnimPersonageDesktopGraphics: null,
		messageLineGraphics: null,
		styleButtonBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 },
		styleButtonRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }, 
		styledescriptionBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 495 }, 
		styledescriptionRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 495 },
		styleDroidBlueText: { font : 'bold 14px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 270 },
		styleDroidRedText: { font : 'bold 14px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 270 }, 
		experiencePointsText: null,

		listCommand: [],
		listPersonage: [],
		desktopStage: null,
		tapeStage: null,
		tapePanelButtonsStage: null,
		selectPersonageID: null,
		selectPersonageIndex: null,
		
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		create: function()
		{
			that.windowStage = new PIXI.Container();
			
			if(parent.config.side === that.SIDE_JEDI)
			{
				that.backgroundBlue(); 
				that.desktopBlue();
				that.borderBlue();
				that.droidBlue();
				that.blueCommand();
				that.tapeMask();
				that.tapeBlue();
				that.tapeButton();
				that.buttonsBlue();
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				that.backgroundRed();
				that.desktopRed();
				that.borderRed();
				that.droidRed();
				that.redCommand();
				that.tapeMask();
				that.tapeRed();
				that.tapeButton();
				that.buttonsRed();
			}
		},
		
		
		backgroundBlue: function()
		{
			that.spaceBackground = new PIXI.Sprite(parent.assets.getAsset("mapSpaceBlueTexture")); 
			that.spaceBackground.position.x = -82; 
			that.spaceBackground.position.y = -19; 
			that.windowStage.addChild(that.spaceBackground);
		},
		
		borderBlue: function()
		{
			var graphics = new PIXI.Graphics(); 

			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(555, 600,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(555, 600);
			graphics.lineTo(5, 600);
			
			graphics.moveTo(5, 600);
			graphics.lineTo(5, 725);
			graphics.moveTo(5, 725);
			graphics.lineTo(855, 725);
			graphics.moveTo(855, 725);
			graphics.lineTo(855, 665);
			graphics.moveTo(855, 665);
			graphics.lineTo(650, 665);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(650, 665,4);
			graphics.endFill();

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(20, 15,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(20, 15);
			graphics.lineTo(550, 15);
			
			graphics.moveTo(550, 15);
			graphics.lineTo(570, 5);
			
			graphics.moveTo(570, 5);
			graphics.lineTo(855, 5);
			graphics.moveTo(855, 5);
			graphics.lineTo(855, 50);
			graphics.moveTo(855, 50);
			graphics.lineTo(650, 50);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(650, 50,4);
			graphics.endFill();
			
			that.windowStage.addChild(graphics);
			
			that.experiencePointsText = new PIXI.Text("КОМАНДА. Очки опыта: " + parent.initialization.userExperiencePoints, that.styleButtonBlueText); 
			that.experiencePointsText.x = 655;
			that.experiencePointsText.y = 30;
			that.windowStage.addChild(that.experiencePointsText);
		},
		
		buttonsBlue: function()
		{
			var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
			button.name = "Closed";
			button.position.x = 650; 
			button.position.y = 670; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onButtonUpdate;
			button.tap = that.onButtonClick; 
			button.click = that.onButtonClick; 
			button.on('mouseover', that.onButtonOver);
			button.on('mouseout', that.onButtonOut);
			
			var text = new PIXI.Text("ЗАКРЫТЬ", that.styleButtonBlueText); 
			text.x = button.width / 3.2;
			text.y = button.height / 3;

			button.addChild(text); 
			that.windowStage.addChild(button);
		},
		
		desktopBlue: function()
		{
			var graphics = new PIXI.Graphics();
    
			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x0000FF, 0.2);
			graphics.moveTo(25, 600);
			graphics.lineTo(550, 600);
			graphics.lineTo(550, 715);
			graphics.lineTo(25, 715);
			graphics.endFill;
			
			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x0000FF, 0.2);
			graphics.moveTo(655, 50);
			graphics.lineTo(800, 50);
			graphics.lineTo(800, 350);
			graphics.lineTo(650, 350);
			graphics.endFill;
			
			that.windowStage.addChild(graphics);
		},
		
		droidBlue: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidBlueRightTexture")); 
			textureSprite.position.x = 765; 
			textureSprite.position.y = 550; 
			textureSprite.scale.set(0.3);
			that.windowStage.addChild(textureSprite);
			
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0090F0, 0.2);
			graphics.beginFill(0x0090F0, 0.2);
			graphics.moveTo(795, 570);
			graphics.lineTo(570, 525);
			graphics.lineTo(840, 525);
			graphics.lineTo(795, 570);
			graphics.endFill;
			that.windowStage.addChild(graphics);
			
			for(var i = 0; i < 50; i++)
			{
				graphics.lineStyle(1, 0x0090F0, 0.2);
				graphics.moveTo(560, 375+(3*i));
				graphics.lineTo(840, 375+(3*i));
			}
			that.windowStage.addChild(graphics);
			
			that.messageLineGraphics = new PIXI.Graphics(); 
			that.messageLineGraphics.lineStyle(10, 0x0090F0, 0.3);
			that.messageLineGraphics.moveTo(560, 380);
			that.messageLineGraphics.lineTo(840, 380);
			that.windowStage.addChild(that.messageLineGraphics);
			
			that.textMessage = new PIXI.Text("Это окно вашей команды.\n\nТут вы можите убирать и добавлять персонажей в команду.\n\nВы можите улучшать характеристики персонажей за счёт полученных очков опыта.", that.styleDroidBlueText); 
			that.textMessage.x = 565; 
			that.textMessage.y = 375; 
			that.windowStage.addChild(that.textMessage);
		},
		
		backgroundRed: function()
		{
			that.spaceBackground = new PIXI.Sprite(parent.assets.getAsset("mapSpaceRedTexture")); 
			that.spaceBackground.position.x = -82; 
			that.spaceBackground.position.y = -19; 
			that.windowStage.addChild(that.spaceBackground);
		},
		
		borderRed: function()
		{
			var graphics = new PIXI.Graphics(); 

			graphics.lineStyle(2, 0xFF0000, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(555, 600,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(555, 600);
			graphics.lineTo(5, 600);
			
			graphics.moveTo(5, 600);
			graphics.lineTo(5, 725);
			graphics.moveTo(5, 725);
			graphics.lineTo(855, 725);
			graphics.moveTo(855, 725);
			graphics.lineTo(855, 665);
			graphics.moveTo(855, 665);
			graphics.lineTo(650, 665);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(650, 665,4);
			graphics.endFill();

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(20, 15,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(20, 15);
			graphics.lineTo(550, 15);
			
			graphics.moveTo(550, 15);
			graphics.lineTo(570, 5);
			
			graphics.moveTo(570, 5);
			graphics.lineTo(855, 5);
			graphics.moveTo(855, 5);
			graphics.lineTo(855, 50);
			graphics.moveTo(855, 50);
			graphics.lineTo(650, 50);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(650, 50,4);
			graphics.endFill();
			
			that.windowStage.addChild(graphics);
			
			that.experiencePointsText = new PIXI.Text("КОМАНДА. Очки опыта: " + parent.initialization.userExperiencePoints, that.styleButtonRedText); 
			that.experiencePointsText.x = 655;
			that.experiencePointsText.y = 30;
			that.windowStage.addChild(that.experiencePointsText);
		},
		
		buttonsRed: function()
		{
			var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed"));
			button.name = "Closed";
			button.position.x = 650; 
			button.position.y = 670; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onButtonUpdate;
			button.tap = that.onButtonClick; 
			button.click = that.onButtonClick; 
			button.on('mouseover', that.onButtonOver);
			button.on('mouseout', that.onButtonOut);
			
			var text = new PIXI.Text("ЗАКРЫТЬ", that.styleButtonRedText); 
			text.x = button.width / 3.2;
			text.y = button.height / 3;

			button.addChild(text); 
			that.windowStage.addChild(button);
		},
		
		desktopRed: function()
		{
			var graphics = new PIXI.Graphics();
    
			graphics.lineStyle(2, 0x800000, 1);
			graphics.beginFill(0x800000, 0.2);
			graphics.moveTo(25, 600);
			graphics.lineTo(550, 600);
			graphics.lineTo(550, 715);
			graphics.lineTo(25, 715);
			graphics.endFill;
			
			graphics.lineStyle(2, 0x800000, 1);
			graphics.beginFill(0x800000, 0.2);
			graphics.moveTo(655, 50);
			graphics.lineTo(800, 50);
			graphics.lineTo(800, 350);
			graphics.lineTo(650, 350);
			graphics.endFill;
			
			that.windowStage.addChild(graphics);
		},
		
		droidRed: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidRedRightTexture")); 
			textureSprite.position.x = 765; 
			textureSprite.position.y = 550; 
			textureSprite.scale.set(0.3);
			that.windowStage.addChild(textureSprite);
			
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0xA63A24, 0.2);
			graphics.beginFill(0xA63A24, 0.2);
			graphics.moveTo(795, 570);
			graphics.lineTo(570, 525);
			graphics.lineTo(840, 525);
			graphics.lineTo(795, 570);
			graphics.endFill;
			that.windowStage.addChild(graphics);
			
			for(var i = 0; i < 50; i++)
			{
				graphics.lineStyle(1, 0xA63A24, 0.2);
				graphics.moveTo(560, 375+(3*i));
				graphics.lineTo(840, 375+(3*i));
			}
			that.windowStage.addChild(graphics);
			
			that.messageLineGraphics = new PIXI.Graphics(); 
			that.messageLineGraphics.lineStyle(10, 0xA63A24, 0.3);
			that.messageLineGraphics.moveTo(560, 380);
			that.messageLineGraphics.lineTo(840, 380);
			that.windowStage.addChild(that.messageLineGraphics);
			
			that.textMessage = new PIXI.Text("Это окно вашей команды.\n\nТут вы можите убирать и добавлять персонажей в команду.\n\nВы можите улучшать характеристики персонажей за счёт полученных очков опыта.", that.styleDroidRedText); 
			that.textMessage.x = 565; 
			that.textMessage.y = 375; 
			that.windowStage.addChild(that.textMessage);
		},
		
		blueCommand: function(select)
		{
			if (select === undefined) {
				select = 0;
			}
			
			if(that.listCommand.length === 0)
			{
					that.listCommand = [];
			}else{
				for(var i = 0; i < that.listCommand.length; i++)
				{
					that.windowStage.removeChild(that.listCommand[i]);
				}
				that.listCommand = [];
			}
			
			var selectIndex = select;
			var index = 0;
			for(var key in parent.initialization.commandUser)
			{
				if(parent.initialization.commandUser[key] !== null)
				{
					var graphics = new PIXI.Graphics(); 
					graphics.lineStyle(2, 0x0000FF, 0.2);
					graphics.beginFill(0x0000FF, 0.2);
					graphics.drawRect(690, 60 + (100 * index), 75, 75);
					graphics.endFill;

					var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser[key]][3]); 
					textureSprite.name = parent.initialization.commandUser[key];
					textureSprite.index = index;
					textureSprite.position.x = 690; 
					textureSprite.position.y = 60  + (100 * index); 
					textureSprite.interactive = true; 
					textureSprite.buttonMode = true;
					textureSprite.tap = that.onBlueIconCommandClick; 
					textureSprite.click = that.onBlueIconCommandClick; 
					graphics.addChild(textureSprite);
					
					var border = new PIXI.Graphics();
					if(index === selectIndex)
					{
						border.lineStyle(2, 0xFFFFFF, 0.5);
						that.bluePersonageShow(parent.initialization.commandUser[key]);
						that.selectPersonageID = parent.initialization.commandUser[key];
						that.selectPersonageIndex = index;
					} else {
						border.lineStyle(2, 0x0000FF, 0.2);
					}
					border.drawRect(690, 60 + (100 * index), 75, 75);
					graphics.addChild(border);
					
					that.listCommand.push(graphics);
					that.windowStage.addChild(that.listCommand[index]);
				} else{
					var graphics = new PIXI.Graphics(); 
					graphics.lineStyle(2, 0x0000FF, 0.2);
					graphics.beginFill(0x0000FF, 0.2);
					graphics.drawRect(690, 60 + (100 * index), 75, 75);
					graphics.endFill;
					that.listCommand.push(graphics);
					that.windowStage.addChild(that.listCommand[index]);
					if(select === 0 && selectIndex < 2) selectIndex++;
				}
				index++;
			}
		},
		
		onBlueIconCommandClick: function()
		{
                        that.tweenLineStop();
			that.selectPersonageID = this.name;
			that.selectPersonageIndex = this.index;
			that.blueCommand(this.index);
			that.tapeBlue(-1);
                        that.tweenLineStart();
		},
		
		bluePersonageShow: function(id)
		{
			that.windowStage.removeChild(that.desktopStage);
			if(id !== null)
			{
				that.desktopStage = new PIXI.Container();
				
				var graphics = new PIXI.Graphics();
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0000FF, 0.2);
				graphics.moveTo(25, 20);
				graphics.lineTo(550, 20);
				graphics.lineTo(550, 575);
				graphics.lineTo(25, 575);
				graphics.endFill;
				that.desktopStage.addChild(graphics);
				
				var sprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[id][1]);
				sprite.position.x = 25;
				sprite.position.y = 50;
				that.desktopStage.addChild(sprite);
				
				graphics = new PIXI.Graphics();
				for(var i = 0; i < 185; i++)
				{
					graphics.lineStyle(1, 0x0000FF, 0.5);
					graphics.moveTo(25, 20+(3*i));
					graphics.lineTo(550, 20+(3*i));
				}
				that.desktopStage.addChild(graphics);
				
				that.lineAnimPersonageDesktopGraphics = new PIXI.Graphics(); 
				that.lineAnimPersonageDesktopGraphics.lineStyle(10, 0x0000FF, 0.3);
				that.lineAnimPersonageDesktopGraphics.moveTo(25, 25);
				that.lineAnimPersonageDesktopGraphics.lineTo(550, 25);
				that.desktopStage.addChild(that.lineAnimPersonageDesktopGraphics);
				
				var text = new PIXI.Text(parent.initialization.personages[id].name, that.styleButtonBlueText); 
				text.x = 50; text.y = 30;
				that.desktopStage.addChild(text);

				text = new PIXI.Text("Характеристики:", that.styleButtonBlueText); 
				text.x = 300; text.y = 100;
				that.desktopStage.addChild(text);
				
				var life = (parent.initialization.personages[parent.initialization.personages[id].id].hitDefense1 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense2 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense3 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense4 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense5) / 10 * 50;
				life = Math.round(life);
				text = new PIXI.Text("Здоровье: " + life, that.styleButtonBlueText); 
				text.x = 330; text.y = 130;
				that.desktopStage.addChild(text);

				sprite = new PIXI.Sprite(parent.assets.getAsset("hit1Texture"));
				sprite.position.x = 300; sprite.position.y = 150; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал ловкости:", that.styleButtonBlueText); 
				text.x = 330; text.y = 155;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense1, that.styleButtonBlueText); 
				text.x = 480; text.y = 155;
				that.desktopStage.addChild(text);

				sprite = new PIXI.Sprite(parent.assets.getAsset("hit2Texture"));
				sprite.position.x = 300; sprite.position.y = 175; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал тьмы:", that.styleButtonBlueText); 
				text.x = 330; text.y = 180;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense2, that.styleButtonBlueText); 
				text.x = 480; text.y = 180;
				that.desktopStage.addChild(text);

				sprite = new PIXI.Sprite(parent.assets.getAsset("hit3Texture"));
				sprite.position.x = 300; sprite.position.y = 200; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал жизни:", that.styleButtonBlueText); 
				text.x = 330; text.y = 205;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense3, that.styleButtonBlueText); 
				text.x = 480; text.y = 205;
				that.desktopStage.addChild(text);

				sprite = new PIXI.Sprite(parent.assets.getAsset("hit4Texture"));
				sprite.position.x = 300; sprite.position.y = 225; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал света:", that.styleButtonBlueText); 
				text.x = 330; text.y = 230;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense4, that.styleButtonBlueText); 
				text.x = 480; text.y = 230;
				that.desktopStage.addChild(text);

				sprite = new PIXI.Sprite(parent.assets.getAsset("hit5Texture"));
				sprite.position.x = 300; sprite.position.y = 250; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал интеллекта:", that.styleButtonBlueText); 
				text.x = 330; text.y = 255;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense5, that.styleButtonBlueText); 
				text.x = 480; text.y = 255;
				that.desktopStage.addChild(text);

				text = new PIXI.Text(parent.initialization.personages[id].description, that.styledescriptionBlueText); 
				text.x = 50;
				text.y = 550 - text.height;
				that.desktopStage.addChild(text);
				
				if(parent.initialization.personages[parent.initialization.personages[id].id].command === true) that.blueButtonRemovePersonage();
				else that.blueButtonSelectPersonage();

				that.experiencePointsButtons();

				that.windowStage.addChild(that.desktopStage);
			}else{
				var graphics = new PIXI.Graphics();
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0000FF, 0.2);
				graphics.moveTo(25, 20);
				graphics.lineTo(550, 20);
				graphics.lineTo(550, 575);
				graphics.lineTo(25, 575);
				graphics.endFill;
				for(var i = 0; i < 185; i++)
				{
					graphics.lineStyle(1, 0x0000FF, 0.5);
					graphics.moveTo(25, 20+(3*i));
					graphics.lineTo(550, 20+(3*i));
				}
				that.windowStage.addChild(graphics);
			}
		},
		
		blueButtonRemovePersonage: function()
		{
			var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
			button.name = "Remove";
			button.position.x = 350; 
			button.position.y = 25; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onButtonUpdate;
			button.tap = that.onButtonClick; 
			button.click = that.onButtonClick; 
			button.on('mouseover', that.onButtonOver);
			button.on('mouseout', that.onButtonOut);
			
			var text = new PIXI.Text("УБРАТЬ ИЗ СПИСКА", that.styleButtonBlueText); 
			text.x = button.width / 6.5;
			text.y = button.height / 3;

			button.addChild(text); 
			that.desktopStage.addChild(button);
		},
		
		blueButtonSelectPersonage: function()
		{
			var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
			button.name = "Select";
			button.position.x = 350; 
			button.position.y = 25; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onButtonUpdate;
			button.tap = that.onButtonClick; 
			button.click = that.onButtonClick; 
			button.on('mouseover', that.onButtonOver);
			button.on('mouseout', that.onButtonOut);
			
			var text = new PIXI.Text("ДОБАВИТЬ В СПИСОК", that.styleButtonBlueText); 
			text.x = button.width / 8.0;
			text.y = button.height / 3;

			button.addChild(text); 
			that.desktopStage.addChild(button);
		},
		
		redCommand: function(select)
		{
			if (select === undefined) {
				select = 0;
			}
			
			if(that.listCommand.length === 0)
			{
					that.listCommand = [];
			}else{
				for(var i = 0; i < that.listCommand.length; i++)
				{
					that.windowStage.removeChild(that.listCommand[i]);
				}
				that.listCommand = [];
			}

			var selectIndex = select;
			var index = 0;
			for(var key in parent.initialization.commandUser)
			{
				if(parent.initialization.commandUser[key] !== null)
				{
					var graphics = new PIXI.Graphics(); 
					graphics.lineStyle(2, 0xFF0000, 0.2);
					graphics.beginFill(0xFF0000, 0.2);
					graphics.drawRect(690, 60 + (100 * index), 75, 75);
					graphics.endFill();

					var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser[key]][3]); 
					textureSprite.name = parent.initialization.commandUser[key];
					textureSprite.index = index;
					textureSprite.position.x = 690; 
					textureSprite.position.y = 60  + (100 * index); 
					textureSprite.interactive = true; 
					textureSprite.buttonMode = true;
					textureSprite.tap = that.onRedIconCommandClick; 
					textureSprite.click = that.onRedIconCommandClick; 
					graphics.addChild(textureSprite);
					
					var border = new PIXI.Graphics();
					if(index === selectIndex)
					{
						border.lineStyle(2, 0xFFFFFF, 0.5);
						that.redPersonageShow(parent.initialization.commandUser[key]);
						that.selectPersonageID = parent.initialization.commandUser[key];
						that.selectPersonageIndex = index;
					} else {
						border.lineStyle(2, 0x0000FF, 0.2);
					}
					border.drawRect(690, 60 + (100 * index), 75, 75);
					graphics.addChild(border);
					
					that.listCommand.push(graphics);
					that.windowStage.addChild(that.listCommand[index]);
				} else{
					var graphics = new PIXI.Graphics(); 
					graphics.lineStyle(2, 0xFF0000, 0.2);
					graphics.beginFill(0xFF0000, 0.2);
					graphics.drawRect(690, 60 + (100 * index), 75, 75);
					graphics.endFill();

					that.listCommand.push(graphics);
					that.windowStage.addChild(that.listCommand[index]);
					if(select === 0 && selectIndex < 2) selectIndex++;
				}
				index++;
			}
		},
		
		onRedIconCommandClick: function()
		{
                        that.tweenLineStop();
			that.selectPersonageID = this.name;
			that.selectPersonageIndex = this.index;
			that.redCommand(this.index);
			that.tapeRed(-1);
                        that.tweenLineStart();
		},
		
		redPersonageShow: function(id)
		{
			that.windowStage.removeChild(that.desktopStage);
			
			if(id !== null)
			{
				that.desktopStage = new PIXI.Container();
				
				var graphics = new PIXI.Graphics();
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
				graphics.moveTo(25, 20);
				graphics.lineTo(550, 20);
				graphics.lineTo(550, 575);
				graphics.lineTo(25, 575);
				graphics.endFill();
				that.desktopStage.addChild(graphics);
				
				var sprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[id][1]);
				sprite.position.x = 25;
				sprite.position.y = 50;
				that.desktopStage.addChild(sprite);
				
				var graphics = new PIXI.Graphics();
				for(var i = 0; i < 185; i++)
				{
					graphics.lineStyle(1, 0x800000, 0.5);
					graphics.moveTo(25, 20+(3*i));
					graphics.lineTo(550, 20+(3*i));
				}
				that.desktopStage.addChild(graphics);
				
				that.lineAnimPersonageDesktopGraphics = new PIXI.Graphics(); 
				that.lineAnimPersonageDesktopGraphics.lineStyle(10, 0x800000, 0.3);
				that.lineAnimPersonageDesktopGraphics.moveTo(25, 25);
				that.lineAnimPersonageDesktopGraphics.lineTo(550, 25);
				that.desktopStage.addChild(that.lineAnimPersonageDesktopGraphics);
				//cmdLineAnimPersonageDesktopGraphicsTween();

				var text = new PIXI.Text(parent.initialization.personages[id].name, that.styleButtonRedText); 
				text.x = 50; text.y = 30;
				that.desktopStage.addChild(text);

				text = new PIXI.Text("Характеристики:", that.styleButtonRedText); 
				text.x = 300; text.y = 100;
				that.desktopStage.addChild(text);
				
				var life = (parent.initialization.personages[parent.initialization.personages[id].id].hitDefense1 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense2 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense3 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense4 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense5) / 10 * 50;
				life = Math.round(life);
				text = new PIXI.Text("Здоровье: " + life, that.styleButtonRedText); 
				text.x = 330; text.y = 130;
				that.desktopStage.addChild(text);
				
				sprite = new PIXI.Sprite(parent.assets.getAsset("hit1Texture"));
				sprite.position.x = 300; sprite.position.y = 150; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал ловкости:", that.styleButtonRedText); 
				text.x = 330; text.y = 155;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense1, that.styleButtonRedText); 
				text.x = 480; text.y = 155;
				that.desktopStage.addChild(text);
				
				sprite = new PIXI.Sprite(parent.assets.getAsset("hit2Texture"));
				sprite.position.x = 300; sprite.position.y = 175; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал тьмы:", that.styleButtonRedText); 
				text.x = 330; text.y = 180;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense2, that.styleButtonRedText); 
				text.x = 480; text.y = 180;
				that.desktopStage.addChild(text);
				
				sprite = new PIXI.Sprite(parent.assets.getAsset("hit3Texture"));
				sprite.position.x = 300; sprite.position.y = 200; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал жизни:", that.styleButtonRedText); 
				text.x = 330; text.y = 205;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense3, that.styleButtonRedText); 
				text.x = 480; text.y = 205;
				that.desktopStage.addChild(text);

				sprite = new PIXI.Sprite(parent.assets.getAsset("hit4Texture"));
				sprite.position.x = 300; sprite.position.y = 225; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал света:", that.styleButtonRedText); 
				text.x = 330; text.y = 230;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense4, that.styleButtonRedText); 
				text.x = 480; text.y = 230;
				that.desktopStage.addChild(text);
				
				sprite = new PIXI.Sprite(parent.assets.getAsset("hit5Texture"));
				sprite.position.x = 300; sprite.position.y = 250; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал интеллекта:", that.styleButtonRedText); 
				text.x = 330; text.y = 255;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense5, that.styleButtonRedText); 
				text.x = 480; text.y = 255;
				that.desktopStage.addChild(text);

				text = new PIXI.Text(parent.initialization.personages[id].description, that.styledescriptionRedText); 
				text.x = 50;
				text.y = 550 - text.height;
				that.desktopStage.addChild(text);

				if(parent.initialization.personages[parent.initialization.personages[id].id].command === true) that.redButtonRemovePersonage();
				else that.redButtonSelectPersonage();

				that.experiencePointsButtons();

				that.windowStage.addChild(that.desktopStage);
			}else{
				that.desktopStage = new PIXI.Container();
				var graphics = new PIXI.Graphics();
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
				graphics.moveTo(25, 20);
				graphics.lineTo(550, 20);
				graphics.lineTo(550, 575);
				graphics.lineTo(25, 575);
				graphics.endFill();

				for(var i = 0; i < 185; i++)
				{
					graphics.lineStyle(1, 0x800000, 0.5);
					graphics.moveTo(25, 20+(3*i));
					graphics.lineTo(550, 20+(3*i));
				}
				that.desktopStage.addChild(graphics);
			}
		},
		
		redButtonRemovePersonage: function()
		{
			var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed"));
			button.name = "Remove";
			button.position.x = 350; 
			button.position.y = 25; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onButtonUpdate;
			button.tap = that.onButtonClick; 
			button.click = that.onButtonClick; 
			button.on('mouseover', that.onButtonOver);
			button.on('mouseout', that.onButtonOut);
			
			var text = new PIXI.Text("УБРАТЬ ИЗ СПИСКА", that.styleButtonRedText); 
			text.x = button.width / 6.5;
			text.y = button.height / 3;

			button.addChild(text); 
			that.desktopStage.addChild(button);
		},
		
		redButtonSelectPersonage: function()
		{
			var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed"));
			button.name = "Select";
			button.position.x = 350; 
			button.position.y = 25; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onButtonUpdate;
			button.tap = that.onButtonClick; 
			button.click = that.onButtonClick; 
			button.on('mouseover', that.onButtonOver);
			button.on('mouseout', that.onButtonOut);
			
			var text = new PIXI.Text("ДОБАВИТЬ В СПИСОК", that.styleButtonBlueText); 
			text.x = button.width / 8.0;
			text.y = button.height / 3;

			button.addChild(text); 
			that.desktopStage.addChild(button);
		},
		
		onButtonOver: function()
		{
			this.isOver = true;
			this.gotoAndPlay(1);
		},
		
		onButtonOut: function()
		{
			this.isOver = false;
			this.gotoAndStop(0);
		},
		
		onButtonUpdate: function()
		{
			if(this.isOver)
			{
				this.gotoAndPlay(1);
			}else{
				this.gotoAndStop(0);
			}
		},
		
		onButtonClick: function()
		{
			switch (this.name)
			{
				case "Closed":
					parent.commandClose();
					break;
				case "Select":
                                        that.selectCommandPersonage();
                                        break;
				case "Remove":
                                        that.removeCommandPersonage();
                                        break;    
				default:
					break;
			}
		},
		
		tapeMask: function()
		{
			 that.tapeStage = new PIXI.Container();
    
			var mask = new PIXI.Graphics();
			mask.lineStyle(2, 0xFF00FF, 1);
			mask.beginFill(0xFF00FF, 0.2);
			mask.moveTo(70, 610);
			mask.lineTo(500, 610);
			mask.lineTo(500, 705);
			mask.lineTo(70, 705);
			mask.endFill();
			
			that.tapeStage.mask = mask;
			that.windowStage.addChild(that.tapeStage);
			
			/* Всё что не отображается в маске будет не активно */
			var graphics = new PIXI.Graphics(); 
			graphics.hitArea = new PIXI.Rectangle(501, 610, 500, 95);
			graphics.interactive = true;
			graphics.lineStyle(1, 0x000000, 0.0);
			graphics.beginFill(0xFF0000, 0.0);
			graphics.drawRect(501, 610, 500, 95);
			graphics.endFill();
			that.windowStage.addChild(graphics);
		},
		
		tapeBlue: function(select)
		{
			var countRemove = 0;
			if (select === undefined) {
				for(var key in parent.initialization.commandUser)
					if(parent.initialization.commandUser[key] === null) countRemove++;
				if(countRemove === 3) select = 0;
				else select = -1;
			}
			
			if(that.listCommand.length === 0)
			{
					that.listPersonage = [];
			}else{
				for(var i = 0; i < that.listPersonage.length; i++)
				{
					that.tapeStage.removeChild(that.listPersonage[i]);
				}
				that.listPersonage = [];
			}
			
			var index = 0;
			for(var planet in parent.initialization.planets)
			{
				if(parent.initialization.planets[planet].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI)
				{
					if(parent.initialization.personages[parent.initialization.planets[planet].bluePersonage1].status === parent.initialization.USER_PERSONAGE_AVAILABLE && parent.initialization.personages[parent.initialization.planets[planet].bluePersonage1].command === false)
					{
						var graphics = new PIXI.Graphics(); 
						graphics.lineStyle(2, 0x0000FF, 0.2);
						graphics.beginFill(0x0000FF, 0.2);
						graphics.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.endFill();
						
						var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[planet].bluePersonage1][3]); 
						textureSprite.name = parent.initialization.planets[planet].bluePersonage1;
						textureSprite.index = index;
						textureSprite.key = parent.initialization.planets[planet].bluePersonage1;
						textureSprite.position.x = 80 + (100 * index); 
						textureSprite.position.y = 620; 
						textureSprite.interactive = true; 
						textureSprite.buttonMode = true;
						textureSprite.tap = that.onBlueIconPersonageClick; 
						textureSprite.click = that.onBlueIconPersonageClick; 
						graphics.addChild(textureSprite);

						var border = new PIXI.Graphics();
						if(select === index)
						{
							border.lineStyle(2, 0xFFFFFF, 0.3);
							that.bluePersonageShow(parent.initialization.planets[planet].bluePersonage1);
							that.selectPersonageID = parent.initialization.planets[planet].bluePersonage1;
							that.selectPersonageIndex = index;
						} else border.lineStyle(2, 0x0000FF, 0.2);
						border.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.addChild(border);
						that.tapeStage.addChild(graphics);

						that.listPersonage.push(graphics);

						index++;
					}
					if(parent.initialization.personages[parent.initialization.planets[planet].bluePersonage2].status === parent.initialization.USER_PERSONAGE_AVAILABLE && parent.initialization.personages[parent.initialization.planets[planet].bluePersonage2].command === false)
					{
						var graphics = new PIXI.Graphics(); 
						graphics.lineStyle(2, 0x0000FF, 0.2);
						graphics.beginFill(0x0000FF, 0.2);
						graphics.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.endFill();

						var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[planet].bluePersonage2][3]); 
						textureSprite.name = parent.initialization.planets[planet].bluePersonage2;
						textureSprite.index = index;
						textureSprite.key = parent.initialization.planets[planet].bluePersonage2;
						textureSprite.position.x = 80 + (100 * index); 
						textureSprite.position.y = 620; 
						textureSprite.interactive = true; 
						textureSprite.buttonMode = true;
						textureSprite.tap = that.onBlueIconPersonageClick; 
						textureSprite.click = that.onBlueIconPersonageClick; 
						graphics.addChild(textureSprite);

						var border = new PIXI.Graphics();
						if(select === index)
						{
							border.lineStyle(2, 0xFFFFFF, 0.3);
							that.bluePersonageShow(parent.initialization.planets[planet].bluePersonage2);
							that.selectPersonageID = parent.initialization.planets[planet].bluePersonage2;
							that.selectPersonageIndex = index;
						} else border.lineStyle(2, 0x0000FF, 0.2);
						border.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.addChild(border);
						that.tapeStage.addChild(graphics);

						that.listPersonage.push(graphics);

						index++;
					}
					if(parent.initialization.personages[parent.initialization.planets[planet].bluePersonage3].status === parent.initialization.USER_PERSONAGE_AVAILABLE && parent.initialization.personages[parent.initialization.planets[planet].bluePersonage3].command === false)
					{
						var graphics = new PIXI.Graphics(); 
						graphics.lineStyle(2, 0x0000FF, 0.2);
						graphics.beginFill(0x0000FF, 0.2);
						graphics.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.endFill();

						var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[planet].bluePersonage3][3]); 
						textureSprite.name = parent.initialization.planets[planet].bluePersonage3;
						textureSprite.index = index;
						textureSprite.key = parent.initialization.planets[planet].bluePersonage3;
						textureSprite.position.x = 80 + (100 * index); 
						textureSprite.position.y = 620; 
						textureSprite.interactive = true; 
						textureSprite.buttonMode = true;
						textureSprite.tap = that.onBlueIconPersonageClick; 
						textureSprite.click = that.onBlueIconPersonageClick; 
						graphics.addChild(textureSprite);

						var border = new PIXI.Graphics();
						if(select === index)
						{
							border.lineStyle(2, 0xFFFFFF, 0.3);
							that.bluePersonageShow(parent.initialization.planets[planet].bluePersonage3);
							that.selectPersonageID = parent.initialization.planets[planet].bluePersonage3;
							that.cmdSelectPersonageIndex = index;
						} else border.lineStyle(2, 0x0000FF, 0.2);
						border.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.addChild(border);
						that.tapeStage.addChild(graphics);

						that.listPersonage.push(graphics);

						index++;
					}
				}
			}
			that.tapeButton();
		},
		
		onBlueIconPersonageClick: function()
		{
                        that.tweenLineStop();
			that.selectPersonageID = this.name;
			that.selectPersonageIndex = this.index;
			that.tapeBlue(this.index);
			that.blueCommand(-1);
                        that.tweenLineStart();
		},
		
		tapeRed: function(select)
		{
			var countRemove = 0;
			if (select === undefined) {
				for(var key in parent.initialization.commandUser)
					if(parent.initialization.commandUser[key] === null) countRemove++;
				if(countRemove === 3) select = 0;
				else select = -1;
			}
			
			if(that.listCommand.length === 0)
			{
					that.listPersonage = [];
			}else{
				for(var i = 0; i < that.listPersonage.length; i++)
				{
					that.tapeStage.removeChild(that.listPersonage[i]);
				}
				that.listPersonage = [];
			}
			
			var index = 0;
			for(var planet in parent.initialization.planets)
			{
				if(parent.initialization.planets[planet].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH)
				{
					if(parent.initialization.personages[parent.initialization.planets[planet].redPersonage1].status === parent.initialization.USER_PERSONAGE_AVAILABLE && parent.initialization.personages[parent.initialization.planets[planet].redPersonage1].command === false)
					{
						var graphics = new PIXI.Graphics(); 
						graphics.lineStyle(2, 0xFF0000, 0.2);
						graphics.beginFill(0xFF0000, 0.2);
						graphics.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.endFill();
						
						var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[planet].redPersonage1][3]); 
						textureSprite.name = parent.initialization.planets[planet].redPersonage1;
						textureSprite.index = index;
						textureSprite.key = parent.initialization.planets[planet].redPersonage1;
						textureSprite.position.x = 80 + (100 * index); 
						textureSprite.position.y = 620; 
						textureSprite.interactive = true; 
						textureSprite.buttonMode = true;
						textureSprite.tap = that.onRedIconPersonageClick; 
						textureSprite.click = that.onRedIconPersonageClick; 
						graphics.addChild(textureSprite);

						var border = new PIXI.Graphics();
						if(select === index)
						{
							border.lineStyle(2, 0xFFFFFF, 0.3);
							that.redPersonageShow(parent.initialization.planets[planet].redPersonage1);
							that.selectPersonageID = parent.initialization.planets[planet].redPersonage1;
							that.selectPersonageIndex = index;
						} else border.lineStyle(2, 0xFF0000, 0.2);
						border.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.addChild(border);
						that.tapeStage.addChild(graphics);

						that.listPersonage.push(graphics);

						index++;
					}
					if(parent.initialization.personages[parent.initialization.planets[planet].redPersonage2].status === parent.initialization.USER_PERSONAGE_AVAILABLE && parent.initialization.personages[parent.initialization.planets[planet].redPersonage2].command === false)
					{
						var graphics = new PIXI.Graphics(); 
						graphics.lineStyle(2, 0xFF0000, 0.2);
						graphics.beginFill(0xFF0000, 0.2);
						graphics.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.endFill();

						var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[planet].redPersonage2][3]); 
						textureSprite.name = parent.initialization.planets[planet].redPersonage2;
						textureSprite.index = index;
						textureSprite.key = parent.initialization.planets[planet].redPersonage2;
						textureSprite.position.x = 80 + (100 * index); 
						textureSprite.position.y = 620; 
						textureSprite.interactive = true; 
						textureSprite.buttonMode = true;
						textureSprite.tap = that.onRedIconPersonageClick; 
						textureSprite.click = that.onRedIconPersonageClick; 
						graphics.addChild(textureSprite);

						var border = new PIXI.Graphics();
						if(select === index)
						{
							border.lineStyle(2, 0xFFFFFF, 0.3);
							that.redPersonageShow(parent.initialization.planets[planet].redPersonage2);
							that.selectPersonageID = parent.initialization.planets[planet].redPersonage2;
							that.selectPersonageIndex = index;
						} else border.lineStyle(2, 0xFF0000, 0.2);
						border.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.addChild(border);
						that.tapeStage.addChild(graphics);

						that.listPersonage.push(graphics);

						index++;
					}
					if(parent.initialization.personages[parent.initialization.planets[planet].redPersonage3].status === parent.initialization.USER_PERSONAGE_AVAILABLE && parent.initialization.personages[parent.initialization.planets[planet].redPersonage3].command === false)
					{
						var graphics = new PIXI.Graphics(); 
						graphics.lineStyle(2, 0xFF0000, 0.2);
						graphics.beginFill(0xFF0000, 0.2);
						graphics.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.endFill();

						var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[planet].redPersonage3][3]); 
						textureSprite.name = parent.initialization.planets[planet].redPersonage3;
						textureSprite.index = index;
						textureSprite.key = parent.initialization.planets[planet].redPersonage3;
						textureSprite.position.x = 80 + (100 * index); 
						textureSprite.position.y = 620; 
						textureSprite.interactive = true; 
						textureSprite.buttonMode = true;
						textureSprite.tap = that.onRedIconPersonageClick; 
						textureSprite.click = that.onRedIconPersonageClick; 
						graphics.addChild(textureSprite);

						var border = new PIXI.Graphics();
						if(select === index)
						{
							border.lineStyle(2, 0xFFFFFF, 0.3);
							that.redPersonageShow(parent.initialization.planets[planet].redPersonage3);
							that.selectPersonageID = parent.initialization.planets[planet].redPersonage3;
							that.selectPersonageIndex = index;
						} else border.lineStyle(2, 0xFF0000, 0.2);
						border.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.addChild(border);
						that.tapeStage.addChild(graphics);

						that.listPersonage.push(graphics);

						index++;
					}
				}
			}
			that.tapeButton();
		},
		
		onRedIconPersonageClick: function()
		{
                        that.tweenLineStop();
			that.selectPersonageID = this.name;
			that.selectPersonageIndex = this.index;
			that.tapeRed(this.index);
			that.redCommand(-1);
                        that.tweenLineStart();
		},
		
		removeCommandPersonage: function()
		{
                        that.tweenLineStop();
			if(parent.config.side === that.SIDE_JEDI)
			{
				parent.initialization.personages[that.selectPersonageID].command = false;
				if(that.selectPersonageIndex === 0) parent.initialization.commandUser["personage1"] = null;
				if(that.selectPersonageIndex === 1) parent.initialization.commandUser["personage2"] = null;
				if(that.selectPersonageIndex === 2) parent.initialization.commandUser["personage3"] = null;
				that.blueCommand();
				that.tapeBlue();
				
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				parent.initialization.personages[that.selectPersonageID].command = false;
				if(that.selectPersonageIndex === 0) parent.initialization.commandUser["personage1"] = null;
				if(that.selectPersonageIndex === 1) parent.initialization.commandUser["personage2"] = null;
				if(that.selectPersonageIndex === 2) parent.initialization.commandUser["personage3"] = null;
				that.redCommand();
				that.tapeRed(); 
			}
                        that.tweenLineStart();
		},
		
		selectCommandPersonage: function()
		{
                    that.tweenLineStop();
                    for(var key in parent.initialization.commandUser)
                    {
                            if(parent.initialization.commandUser[key] === null)
                            {
                                    parent.initialization.commandUser[key] = that.selectPersonageID;
                                    parent.initialization.personages[that.selectPersonageID].command = true;
                                    break;
                            }
                    }
                    if(parent.config.side === that.SIDE_JEDI)
                    {
                            that.blueCommand();
                            that.tapeBlue();
                    }
                    if(parent.config.side === that.SIDE_SITH)
                    {
                            that.redCommand();
                            that.tapeRed();
                     }
                    that.tweenLineStart();
		},
		
		tapeButton: function()
		{
			that.windowStage.removeChild(that.tapePanelButtonsStage);
    
			if(that.listPersonage.length > 4)
			{
				var color;
				if(parent.config.side === that.SIDE_JEDI) color = 0x0000FF;
				else color = 0xFF0000;
				
				that.tapePanelButtonsStage = new PIXI.Container();
				var tapeButtonGraphics = new PIXI.Graphics();
				tapeButtonGraphics.name = "TapeLeft";
				tapeButtonGraphics.lineStyle(2, color, 1);
				tapeButtonGraphics.beginFill(color, 1);
				tapeButtonGraphics.moveTo(40, 655);
				tapeButtonGraphics.lineTo(65, 630);
				tapeButtonGraphics.lineTo(65, 680);
				tapeButtonGraphics.lineTo(40, 655);
				tapeButtonGraphics.endFill();
				tapeButtonGraphics.interactive = true; 
				tapeButtonGraphics.buttonMode = true; 
				tapeButtonGraphics.tap = that.onTapeButtonClick; 
				tapeButtonGraphics.click = that.onTapeButtonClick;
				that.tapePanelButtonsStage.addChild(tapeButtonGraphics);

				tapeButtonGraphics = new PIXI.Graphics();
				tapeButtonGraphics.name = "TapeRight";
				tapeButtonGraphics.lineStyle(2, color, 1);
				tapeButtonGraphics.beginFill(color, 1);
				tapeButtonGraphics.moveTo(535, 655);
				tapeButtonGraphics.lineTo(510, 630);
				tapeButtonGraphics.lineTo(510, 680);
				tapeButtonGraphics.lineTo(535, 655);
				tapeButtonGraphics.endFill();
				tapeButtonGraphics.interactive = true; 
				tapeButtonGraphics.buttonMode = true; 
				tapeButtonGraphics.tap = that.onTapeButtonClick; 
				tapeButtonGraphics.click = that.onTapeButtonClick;
				that.tapePanelButtonsStage.addChild(tapeButtonGraphics);
				
				that.windowStage.addChild(that.tapePanelButtonsStage);
			}else{
				that.tapeStage.position.x = 0;
			}
		},
		
		onTapeButtonClick: function()
		{
			switch (this.name)
			{
				case "TapeLeft":
					if(that.tapeStage.position.x <= -100) that.tapeStage.position.x += 100;
					break;
				case "TapeRight":
                                        if(that.tapeStage.position.x >= ((that.tapeStage.width - 100) * -1)) that.tapeStage.position.x -= 100;
					break;
				default:
					break;
			}
		},
		
		experiencePointsButtons: function()
		{
			if(parent.initialization.userExperiencePoints > 0)
			{
				var color1, color2;
				if(parent.config.side === that.SIDE_JEDI)
				{
					color1 = 0x0000FF;
					color2 = 0xFFFFFF;
				}
				if(parent.config.side === that.SIDE_SITH)
				{
					color1 = 0xFF0000;
					color2 = 0xFFFF00;
				}
				
				for(var i = 0; i < 5; i++)
				{
					var graphics = new PIXI.Graphics();
					graphics.name = "Add" + i;
					graphics.lineStyle(1, color1, 1);
					graphics.beginFill(color1, 0.5);
					graphics.drawRect(525, 155 + (25.5 * i), 15, 15);
					graphics.endFill();
					graphics.lineStyle(1, color2, 1);
					graphics.moveTo(532.5, 156 + (25.5 * i));
					graphics.lineTo(532.5, 168 + (25.5 * i));
					graphics.moveTo(526, 162 + (25.5 * i));
					graphics.lineTo(538, 162 + (25.5 * i));
					graphics.interactive = true; 
					graphics.buttonMode = true; 
					graphics.tap = that.onButtonPlusClick; 
					graphics.click = that.onButtonPlusClick; 
					
					that.desktopStage.addChild(graphics);
				}
			}
		},
		
		onButtonPlusClick: function()
		{
			switch (this.name)
			{
				case "Add0":
					parent.initialization.personages[that.selectPersonageID].hitDefense1 += 1;
					parent.initialization.userExperiencePoints--;
					that.experiencePointsText.text = "КОМАНДА. Очки опыта: " + parent.initialization.userExperiencePoints;
					if(parent.config.side === that.SIDE_JEDI) that.bluePersonageShow(that.selectPersonageID);
					if(parent.config.side === that.SIDE_SITH) that.redPersonageShow(that.selectPersonageID);
					break;
				case "Add1":
					parent.initialization.personages[that.selectPersonageID].hitDefense2 += 1;
					parent.initialization.userExperiencePoints--;
					that.experiencePointsText.text = "КОМАНДА. Очки опыта: " + parent.initialization.userExperiencePoints;
					if(parent.config.side === that.SIDE_JEDI) that.bluePersonageShow(that.selectPersonageID);
					if(parent.config.side === that.SIDE_SITH) that.redPersonageShow(that.selectPersonageID);
					break;
				case "Add2":
					parent.initialization.personages[that.selectPersonageID].hitDefense3 += 1;
					parent.initialization.userExperiencePoints--;
					that.experiencePointsText.text = "КОМАНДА. Очки опыта: " + parent.initialization.userExperiencePoints;
					if(parent.config.side === that.SIDE_JEDI) that.bluePersonageShow(that.selectPersonageID);
					if(parent.config.side === that.SIDE_SITH) that.redPersonageShow(that.selectPersonageID);
					break;
				case "Add3":
					parent.initialization.personages[that.selectPersonageID].hitDefense4 += 1;
					parent.initialization.userExperiencePoints--;
					that.experiencePointsText.text = "КОМАНДА. Очки опыта: " + parent.initialization.userExperiencePoints;
					if(parent.config.side === that.SIDE_JEDI) that.bluePersonageShow(that.selectPersonageID);
					if(parent.config.side === that.SIDE_SITH) that.redPersonageShow(that.selectPersonageID);
					break;
				case "Add4":
					parent.initialization.personages[that.selectPersonageID].hitDefense5 += 1;
					parent.initialization.userExperiencePoints--;
					that.experiencePointsText.text = "КОМАНДА. Очки опыта: " + parent.initialization.userExperiencePoints;
					if(parent.config.side === that.SIDE_JEDI) that.bluePersonageShow(that.selectPersonageID);
					if(parent.config.side === that.SIDE_SITH) that.redPersonageShow(that.selectPersonageID);
					break;
				default:
					break;
			}
		},
                
                tweenLineStart: function()
                {
                    createjs.Tween.get(that.lineAnimPersonageDesktopGraphics, {loop: true}) 
                        .to({x: 0, y: 545}, 2500, createjs.Ease.getPowInOut(3));
                },
                
                tweenLineStop: function()
                {
                    createjs.Tween.removeTweens(that.lineAnimPersonageDesktopGraphics);
                },
		
		tweenStart: function()
		{
                    createjs.Tween.get(that.spaceBackground, {loop: true}) 
                            .to({rotation: -0.015}, 2500, createjs.Ease.getPowInOut(3))
                            .to({rotation: 0.015}, 2500, createjs.Ease.getPowInOut(3))
                            .to({rotation: 0.0}, 2500, createjs.Ease.getPowInOut(3));

                    createjs.Tween.get(that.lineAnimPersonageDesktopGraphics, {loop: true}) 
                            .to({x: 0, y: 545}, 2500, createjs.Ease.getPowInOut(3));

                    createjs.Tween.get(that.messageLineGraphics, {loop: true}) 
                            .to({x: 0, y: 138}, 2000, createjs.Ease.getPowInOut(3));

                    createjs.Ticker.setFPS(60);
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.spaceBackground);
			createjs.Tween.removeTweens(that.lineAnimPersonageDesktopGraphics);
			createjs.Tween.removeTweens(that.messageLineGraphics);
		},
		
		show: function()
		{
			that.tweenStart();
			return that.windowStage;
		},
		
		close: function()
		{
			that.tweenStop();
			for(var child in that.desktopStage.children) that.desktopStage.removeChild(that.desktopStage.children[child]);
			that.desktopStage.destroy();
			delete that.desktopStage.children;
			
			for(var child in that.tapeStage.children) that.tapeStage.removeChild(that.tapeStage.children[child]);
			that.tapeStage.destroy();
			delete that.tapeStage.children;
			
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			
			return that.windowStage;
		},
		
		getWindowStage: function()
		{
			return that.windowStage;
		},
		
		destroy: function()
		{
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			that.windowStage.destroy();
			delete that.windowStage.children;
			
			for(var property in that) that[property] = null;
		}
		
	};
	return that;
};

/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var EndGame = function(parent)
{
    var that = {
        windowStage: null,
        lineAnimationGraphics: null,
        text: null,
        leftBoomArray: null,
        rightBoomArray: null,
        boomMovieClip: null,
        
        styleDroidBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 275 },
        styleDroidRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 275 },
                
        SIDE_NONE: "side_none",
	SIDE_JEDI: "side_jedi",
	SIDE_SITH: "side_sith",
        
        create: function(status)
        {
            that.leftBoomArray = [];
            that.leftBoomArray.push([200, 200]);
            that.leftBoomArray.push([150, 210]);
            that.leftBoomArray.push([210, 250]);
            that.leftBoomArray.push([225, 180]);
            that.leftBoomArray.push([285, 190]);
            that.leftBoomArray.push([290, 120]);
            that.leftBoomArray.push([215, 235]);
            that.leftBoomArray.push([170, 150]);
            that.leftBoomArray.push([350, 100]);
            that.leftBoomArray.push([300, 250]);
            that.leftBoomArray.push([265, 270]);
            
            that.rightBoomArray = [];
            that.rightBoomArray.push([400, 200]);
            that.rightBoomArray.push([350, 210]);
            that.rightBoomArray.push([410, 250]);
            that.rightBoomArray.push([425, 180]);
            that.rightBoomArray.push([485, 190]);
            that.rightBoomArray.push([490, 120]);
            that.rightBoomArray.push([415, 235]);
            that.rightBoomArray.push([370, 150]);
            that.rightBoomArray.push([550, 100]);
            that.rightBoomArray.push([500, 250]);
            that.rightBoomArray.push([465, 270]);
            
            that.windowStage = new PIXI.Container();
            that.backgroundCreate();
            if(status === "win") // Пользователь победил
            {
                if(parent.config.side === that.SIDE_JEDI)
                {
                    that.deathStarCreate(150, 100);
                    that.boomCreate("left");
                    that.heroesJEDICreate();
                    that.borderBlueCreate(status);
                    that.buttonsBlueCreate(status);
                }
                if(parent.config.side === that.SIDE_SITH)
                {
                    that.corusantCreate(350, 100);
                    that.boomCreate("right");
                    that.heroesSITHCreate();
                    that.borderRedCreate(status);
                    that.buttonsRedCreate(status);
                }
            }
            if(status === "lost") // Пользователь проиграл
            {
                if(parent.config.side === that.SIDE_JEDI)
                {
                    that.corusantCreate(350, 100);
                    that.boomCreate("right");
                    that.heroesSITHCreate();
                    that.borderRedCreate(status);
                    that.buttonsRedCreate(status);
                }
                if(parent.config.side === that.SIDE_SITH)
                {
                    that.deathStarCreate(150, 100);
                    that.boomCreate("left");
                    that.heroesJEDICreate();
                    that.borderBlueCreate(status);
                    that.buttonsBlueCreate(status);
                }
            }
        },
        
        backgroundCreate: function()
        {
            var sprite = new PIXI.Sprite(parent.assets.getAsset("stars1Texture")); 
            sprite.position.x = 0; 
            sprite.position.y = 0; 
            sprite.scale.set(1.0); 
            that.windowStage.addChild(sprite);
        },
        
        borderBlueCreate: function(status)
        {
            var graphics = new PIXI.Graphics();
            graphics.lineStyle(2, 0x0000FF, 1);
            graphics.beginFill(0x000000, 0);
            graphics.drawRect(10, 10, 840, 710);
            graphics.endFill();
            
            graphics.lineStyle(0);
            graphics.beginFill(0xFFFFFF, 1);
            graphics.drawCircle(5, 600,4);
            graphics.endFill();

            graphics.lineStyle(2, 0xFFFFFF, 1);
            graphics.moveTo(5,600);
            graphics.lineTo(5, 725);
            
            graphics.lineStyle(2, 0xFFFFFF, 1);
            graphics.moveTo(5,725);
            graphics.lineTo(25, 725);
            graphics.moveTo(25,725);
            graphics.lineTo(430, 725);

            graphics.lineStyle(2, 0xFFFFFF, 1);
            graphics.moveTo(430,725);
            graphics.lineTo(855, 725);

            graphics.lineStyle(0);
            graphics.beginFill(0xFFFFFF, 1);
            graphics.drawCircle(855, 725,4);
            graphics.endFill();
            
            graphics.lineStyle(0);
            graphics.beginFill(0xFFFFFF, 1);
            graphics.drawCircle(855, 150,4);
            graphics.endFill();

            graphics.lineStyle(2, 0xFFFFFF, 1);
            graphics.moveTo(855,150);
            graphics.lineTo(855, 5);
            graphics.moveTo(855,5);
            graphics.lineTo(430, 5);

            graphics.lineStyle(2, 0xFFFFFF, 1);
            graphics.moveTo(430,5);
            graphics.lineTo(5, 5);

            graphics.lineStyle(0);
            graphics.beginFill(0xFFFFFF, 1);
            graphics.drawCircle(5,5,4);
            graphics.endFill();
            
            that.windowStage.addChild(graphics);
            
            var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidBlueLeftTexture")); 
            textureSprite.position.x = 40; 
            textureSprite.position.y = 550; 
            textureSprite.scale.set(0.4);
            that.windowStage.addChild(textureSprite);
            
            var graphics = new PIXI.Graphics(); 
            graphics.lineStyle(2, 0x0080C0, 1);
            graphics.beginFill(0x0080C0, 0.2);
            graphics.moveTo(125,450);
            graphics.lineTo(410, 450);
            graphics.lineTo(410, 575);
            graphics.lineTo(125, 575);
            graphics.endFill();
            for(var i = 0; i < 42; i++)
            {
                    graphics.lineStyle(1, 0x0090F0, 0.5);
                    graphics.moveTo(125, 450+(3*i));
                    graphics.lineTo(410, 450+(3*i));
            }
            that.windowStage.addChild(graphics);
            
            
            if (status === "win") that.text = "ПОЗДРАВЛЯЕМ!!! ВЫ ПОБЕДИЛИ!!!\n\nВы провели " + parent.initialization.userTotalBattle + " сражений.\nВы заработали " + parent.initialization.userTotalPointsPlayerTournament + " очков."; 
            if (status === "lost") that.text = "ВЫ ПРОИГРАЛИ!!!\nЗвезда Смерти разрушена.\n\nВы провели " + parent.initialization.userTotalBattle + " сражений.\nВы заработали " + parent.initialization.userTotalPointsPlayerTournament + " очков."; 
            var textMessage  = new PIXI.Text(that.text, that.styleDroidBlueText); 
            textMessage.x = 130; 
            textMessage.y = 455; 
            that.windowStage.addChild(textMessage);
            
            that.lineAnimationGraphics = new PIXI.Graphics(); 
            that.lineAnimationGraphics.lineStyle(10, 0x0090F0, 0.3);
            that.lineAnimationGraphics.moveTo(125,455);
            that.lineAnimationGraphics.lineTo(410, 455);
            that.windowStage.addChild(that.lineAnimationGraphics);
        },
        
        borderRedCreate: function(status)
        {
            var graphics = new PIXI.Graphics();
            graphics.lineStyle(2, 0xFF0000, 1);
            graphics.beginFill(0x000000, 0);
            graphics.drawRect(10, 10, 840, 710);
            graphics.endFill();
            
            graphics.lineStyle(0);
            graphics.beginFill(0xFFFF80, 1);
            graphics.drawCircle(5, 600,4);
            graphics.endFill();

            graphics.lineStyle(2, 0xFFFF80, 1);
            graphics.moveTo(5,600);
            graphics.lineTo(5, 725);
            
            graphics.lineStyle(2, 0xFFFF80, 1);
            graphics.moveTo(5,725);
            graphics.lineTo(25, 725);
            graphics.moveTo(25,725);
            graphics.lineTo(430, 725);

            graphics.lineStyle(2, 0xFFFF80, 1);
            graphics.moveTo(430,725);
            graphics.lineTo(855, 725);

            graphics.lineStyle(0);
            graphics.beginFill(0xFFFF80, 1);
            graphics.drawCircle(855, 725,4);
            graphics.endFill();
            
            graphics.lineStyle(0);
            graphics.beginFill(0xFFFF80, 1);
            graphics.drawCircle(855, 150,4);
            graphics.endFill();

            graphics.lineStyle(2, 0xFFFF80, 1);
            graphics.moveTo(855,150);
            graphics.lineTo(855, 5);
            graphics.moveTo(855,5);
            graphics.lineTo(430, 5);

            graphics.lineStyle(2, 0xFFFF80, 1);
            graphics.moveTo(430,5);
            graphics.lineTo(5, 5);

            graphics.lineStyle(0);
            graphics.beginFill(0xFFFF80, 1);
            graphics.drawCircle(5,5,4);
            graphics.endFill();
            
            that.windowStage.addChild(graphics);
            
            var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidRedRightTexture")); 
            textureSprite.position.x = 700; 
            textureSprite.position.y = 550;  
            textureSprite.scale.set(0.4);
            that.windowStage.addChild(textureSprite);
            
            var graphics = new PIXI.Graphics(); 
            graphics.lineStyle(2, 0x800000, 1);
            graphics.beginFill(0x800000, 0.2);
            graphics.moveTo(450, 450);
            graphics.lineTo(735, 450);
            graphics.lineTo(735, 575);
            graphics.lineTo(450, 575);
            graphics.endFill();
            for(var i = 0; i < 42; i++)
            {
                    graphics.lineStyle(1, 0x800000, 0.5);
                    graphics.moveTo(450, 450+(3*i));
                    graphics.lineTo(735, 450+(3*i));
            }
            that.windowStage.addChild(graphics);
            
            if (status === "win") that.text = "ПОЗДРАВЛЯЕМ!!! ВЫ ПОБЕДИЛИ!!!\n\nВы провели " + parent.initialization.userTotalBattle + " сражений.\nВы заработали " + parent.initialization.userTotalPointsPlayerTournament + " очков."; 
            if (status === "lost") that.text = "ВЫ ПРОИГРАЛИ!!!\nПланета Корусант уничтожена.\n\nВы провели " + parent.initialization.userTotalBattle + " сражений.\nВы заработали " + parent.initialization.userTotalPointsPlayerTournament + " очков."; 
            var textMessage = new PIXI.Text(that.text, that.styleDroidRedText); 
            textMessage.x = 455; 
            textMessage.y = 455; 
            that.windowStage.addChild(textMessage);
            
            that.lineAnimationGraphics = new PIXI.Graphics(); 
            that.lineAnimationGraphics.lineStyle(10, 0x800000, 0.3);
            that.lineAnimationGraphics.moveTo(450, 455);
            that.lineAnimationGraphics.lineTo(735, 455);
            that.windowStage.addChild(that.lineAnimationGraphics);
        },
        
        heroesJEDICreate: function()
        {
            var movieClip = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexSideLukeSkywalker"));
            movieClip.name = "LukeSkywalker";
            movieClip.position.x = 500;
            movieClip.position.y = 150;
            movieClip.loop = true;
            movieClip.animationSpeed = 0.2;
            movieClip.play();
            that.windowStage.addChild(movieClip);
        },
        
        heroesSITHCreate: function()
        {
            var movieClip = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexSideDarthVader"));
            movieClip.name = "DarthVader";
            movieClip.position.x = 0;
            movieClip.position.y = 155;
            movieClip.loop = true;
            movieClip.animationSpeed = 0.2;
            movieClip.play();
            that.windowStage.addChild(movieClip);
        },
        
        corusantCreate: function(posX, posY)
        {
            var sprite = new PIXI.Sprite(parent.assets.getAsset("planetTextures").Coruscant[1]); 
            sprite.position.x = posX; 
            sprite.position.y = posY; 
            that.windowStage.addChild(sprite);
        },
        
        deathStarCreate: function(posX, posY)
        {
            var sprite = new PIXI.Sprite(parent.assets.getAsset("deathstarDestroyTexture")); 
            sprite.position.x = posX; 
            sprite.position.y = posY; 
            that.windowStage.addChild(sprite);
        },
        
        boomCreate: function(position)
        {
            if(position === "left")
            {
                that.boomMovieClip = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexBoom")); 
                that.boomMovieClip.status = "left";
                that.boomMovieClip.position.x = 200; 
                that.boomMovieClip.position.y = 200; 
                that.boomMovieClip.loop = false; 
                that.boomMovieClip.animationSpeed = 0.2;
                that.boomMovieClip.onComplete = that.onBoomUpdate;
                that.boomMovieClip.play();
                that.windowStage.addChild(that.boomMovieClip);
            }
            if(position === "right")
            {
                that.boomMovieClip = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexBoom")); 
                that.boomMovieClip.status = "right";
                that.boomMovieClip.position.x = 400; 
                that.boomMovieClip.position.y = 200; 
                that.boomMovieClip.loop = false; 
                that.boomMovieClip.animationSpeed = 0.2;
                that.boomMovieClip.onComplete = that.onBoomUpdate;
                that.boomMovieClip.play();
                that.windowStage.addChild(that.boomMovieClip);
            }
        },
        
        onBoomUpdate: function(e)
        {
            if(this.status === "left")
            {
                this.position.x = that.leftBoomArray[parent.initialization.randomIndex()][0];
                this.position.y = that.leftBoomArray[parent.initialization.randomIndex()][1];
            }
            if(this.status === "right")
            {
                this.position.x = that.rightBoomArray[parent.initialization.randomIndex()][0];
                this.position.y = that.rightBoomArray[parent.initialization.randomIndex()][1];
            }
            this.gotoAndPlay(0);
        },
        
        buttonsBlueCreate: function(status)
        {
            if(status === "win")
            {
                var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
                button.name = "post";
                button.position.x = 150; 
                button.position.y = 660; 
                button.interactive = true; 
                button.buttonMode = true; 
                button.loop = false; 
                button.animationSpeed = 0.2;
                button.onComplete = that.onButtonUpdate;
                button.tap = that.onButtonClick; 
                button.click = that.onButtonClick; 
                button.on('mouseover', that.onButtonOver);
                button.on('mouseout', that.onButtonOut);
                var text = new PIXI.Text("РАССКАЗАТЬ", that.styleDroidBlueText); 
                text.x = (button.width / 2) - (text.width / 2);
                text.y = button.height / 3;
                button.addChild(text); 
                that.windowStage.addChild(button);
            }
            
            var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
            button.name = "close";
            button.position.x = 350; 
            button.position.y = 660; 
            button.interactive = true; 
            button.buttonMode = true; 
            button.loop = false; 
            button.animationSpeed = 0.2;
            button.onComplete = that.onButtonUpdate;
            button.tap = that.onButtonClick; 
            button.click = that.onButtonClick; 
            button.on('mouseover', that.onButtonOver);
            button.on('mouseout', that.onButtonOut);
            var text = new PIXI.Text("ЗАКРЫТЬ", that.styleDroidBlueText); 
            text.x = (button.width / 2) - (text.width / 2);
            text.y = button.height / 3;
            button.addChild(text); 
            that.windowStage.addChild(button);
        },
        
        buttonsRedCreate: function(status)
        {
            if(status === "win")
            {
                var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed"));
                button.name = "post";
                button.position.x = 300; 
                button.position.y = 660; 
                button.interactive = true; 
                button.buttonMode = true; 
                button.loop = false; 
                button.animationSpeed = 0.2;
                button.onComplete = that.onButtonUpdate;
                button.tap = that.onButtonClick; 
                button.click = that.onButtonClick; 
                button.on('mouseover', that.onButtonOver);
                button.on('mouseout', that.onButtonOut);
                var text = new PIXI.Text("РАССКАЗАТЬ", that.styleDroidRedText); 
                text.x = (button.width / 2) - (text.width / 2);
                text.y = button.height / 3;
                button.addChild(text); 
                that.windowStage.addChild(button);
            }
            
            var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed"));
            button.name = "close";
            button.position.x = 500; 
            button.position.y = 660; 
            button.interactive = true; 
            button.buttonMode = true; 
            button.loop = false; 
            button.animationSpeed = 0.2;
            button.onComplete = that.onButtonUpdate;
            button.tap = that.onButtonClick; 
            button.click = that.onButtonClick; 
            button.on('mouseover', that.onButtonOver);
            button.on('mouseout', that.onButtonOut);
            var text = new PIXI.Text("ЗАКРЫТЬ", that.styleDroidRedText); 
            text.x = (button.width / 2) - (text.width / 2);
            text.y = button.height / 3;
            button.addChild(text); 
            that.windowStage.addChild(button);
        },
        
        onButtonOver: function()
        {
                this.isOver = true;
                this.gotoAndPlay(1);
        },

        onButtonOut: function()
        {
                this.isOver = false;
                this.gotoAndStop(0);
        },

        onButtonUpdate: function()
        {
                if(this.isOver)
                {
                        this.gotoAndPlay(1);
                }else{
                        this.gotoAndStop(0);
                }
        },

        onButtonClick: function() 
        {
                parent.sound.soundPlayStarWarsButtonClick();
                switch (this.name)
                {
                        case "post":
                                parent.vkWallPostEndGame(that.text);
                                break;
                        case "close":
                                parent.endGameClose();
                                break;
                        default:
                                break;
                }
        },
        
        tweenStart: function()
        {
            createjs.Tween.get(that.lineAnimationGraphics, {loop: true}) 
                .to({x: 0, y: 115}, 2500, createjs.Ease.getPowInOut(3));
            createjs.Ticker.setFPS(60);
        },
        
        tweenStop: function()
        {
            createjs.Tween.removeTweens(that.lineAnimationGraphics);
        },
        
        show: function()
        {
                that.tweenStart();
                return that.windowStage;
        },

        close: function()
        {
                that.tweenStop();
                that.boomMovieClip.stop();
                for(var child in that.windowStage.children) that.windowStage.removeChild(that.windowStage.children[child]);
                return that.windowStage;
        },

        getWindowStage: function()
        {
                return that.windowStage;
        },

        destroy: function()
        {
                for(var child in that.windowStage.children) that.windowStage.removeChild(that.windowStage.children[child]);
                that.windowStage.destroy();
                delete that.windowStage.children;

                for(var property in that) that[property] = null;
        }
    };
    return that;
};


/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var Initialization = function(planetTextures, heroesTextures, personagesJson, planetsJson, fieldLevelsJson, dataSide)
{
	var that = {
		mapPlanets: null,     // карта планет (объект)
		mapMessage: null,     // Сообщения на карте (объект)
		levels: null,         		// Уровни (объект)

		commandUser: null,    // команда пользователя (объект)
		commandAI: null,      // команда ИИ (объект)

		personages: null,      // список персонажей в игре (объект)
		planets: null,         // Прогресс игры в отношении планет (объект)

		userExperiencePoints: 0,			// Очки опыта
		userTotalPointsPlayerTournament: 0,	// Общие очки игрока за всю игру
		userlTotalPointsPlayerLevel: 0,            // Общие очки игрока за уровен
		userExperiencePointsAI: 0, 		// Очки опыта ИИ
		userTotalBattle: 0,                        // Общее количество проведённых битв (связь с сообщениями R2D2)
		
		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		USER_PLANET_QUEST_AWAITING: "user_planet_quest_awaiting",
		USER_PLANET_QUEST_COMPLETE_JEDI: "user_planet_quest_complete_jedi",
		USER_PLANET_QUEST_COMPLETE_SITH: "user_planet_quest_complete_sith",
		
		USER_PERSONAGE_AVAILABLE: "user_personage_available",
                AI_PERSONAGE_AVAILABLE: "ai_personage_available",
		USER_PERSONAGE_NOT_AVAILABLE: "user_personage_not_available",
		
		planetBlueStyleText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 },
		planetRedStyleText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 },
		
		Planet: function(id, name)
		{
			this.id = id;                       			// идентификатор планеты
			this.name = name;                   	// имя планеты
			this.bluePersonage1 = null;         	// персонаж планеты
			this.bluePersonage2 = null;         	// персонаж планеты
			this.bluePersonage3 = null;         	// персонаж планеты
			this.blueRewardPersonage1 = null;   // союзник
			this.blueRewardPersonage2 = null;   // союзник
			this.blueRewardPersonage3 = null;   // союзник
			this.redPersonage1 = null;          	// персонаж планеты
			this.redPersonage2 = null;          	// персонаж планеты
			this.redPersonage3 = null;          	// персонаж планеты
			this.redRewardPersonage1 = null;    // союзник
			this.redRewardPersonage2 = null;    // союзник
			this.redRewardPersonage3 = null;    // союзник
			this.status = "user_planet_quest_awaiting";   // статус
			this.description = "";              		// описнаие
		},
		
		Personage: function(id, name)
		{
			this.id = id;                       // идентификатор персонажа
			this.name = name;             // имя персонажа
			this.life = 0;                      // здоровье персонажа
			this.hitAttack1 = 0;                      // показатель атаки
			this.hitAttack2 = 0;                      // показатель атаки
			this.hitAttack3 = 0;                      // показатель атаки
			this.hitAttack4 = 0;                      // показатель атаки
			this.hitAttack5 = 0;                      // показатель атаки
			this.hitDefense1 = 0;                      // показатель защиты
			this.hitDefense2 = 0;                      // показатель защиты
			this.hitDefense3 = 0;                      // показатель защиты
			this.hitDefense4 = 0;                      // показатель защиты
			this.hitDefense5 = 0;                      // показатель защиты
			this.status = "user_personage_not_available"; // статус (выбран / не выбран)
			this.planet = "";					// планета
			this.command = false;               // входит в комманду или нет
			this.description = "";              // описание
		},
		
		initMap: function()
		{
			that.mapPlanets = new Object();
			
			that.mapPlanets["Coruscant"] = [
				"Coruscant",
				new PIXI.Sprite(planetTextures["Coruscant"][1]),
				new PIXI.Text(planetTextures["Coruscant"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Coruscant"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["darth_vader"][1]),
				new PIXI.Sprite(heroesTextures["darth_vader"][1]),
				new PIXI.Sprite(heroesTextures["darth_vader"][1]),
				new PIXI.Sprite(heroesTextures["luke_skywalker"][1]),
				new PIXI.Sprite(heroesTextures["mace_windu"][1]),
				new PIXI.Sprite(heroesTextures["mas_amedda"][1]),
				new PIXI.Text("Орден Джедай", that.planetBlueStyleText),
				new PIXI.Text("Победа Ситов", that.planetRedStyleText)
			];
			that.mapPlanets["Coruscant"][1].name = "Coruscant";
			that.mapPlanets["Coruscant"][1].position.x = 450;
			that.mapPlanets["Coruscant"][1].position.y = 575;
			that.mapPlanets["Coruscant"][1].interactive = true; 
			that.mapPlanets["Coruscant"][1].buttonMode = true;
			that.mapPlanets["Coruscant"][1].scale.set(0.2);
			that.mapPlanets["Coruscant"][2].position.x = 490; 
			that.mapPlanets["Coruscant"][2].position.y = 550; 
			that.mapPlanets["Coruscant"][3].position.x = 490; 
			that.mapPlanets["Coruscant"][3].position.y = 550;
			that.mapPlanets["Coruscant"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Coruscant"][4].drawCircle(492, 615, 39);
			that.mapPlanets["Coruscant"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Coruscant"][4].moveTo(475, 595);
			that.mapPlanets["Coruscant"][4].lineTo(485, 570);
			that.mapPlanets["Coruscant"][4].moveTo(485, 570);
			that.mapPlanets["Coruscant"][4].lineTo(650, 570);
			that.mapPlanets["Coruscant"][5].position.x = 0; 
			that.mapPlanets["Coruscant"][5].position.y = 0;
			that.mapPlanets["Coruscant"][5].scale.set(0.18);
			that.mapPlanets["Coruscant"][6].position.x = 0; 
			that.mapPlanets["Coruscant"][6].position.y = 0;
			that.mapPlanets["Coruscant"][6].scale.set(0.18);
			that.mapPlanets["Coruscant"][7].position.x = 0; 
			that.mapPlanets["Coruscant"][7].position.y = 0;
			that.mapPlanets["Coruscant"][7].scale.set(0.18);
			that.mapPlanets["Coruscant"][8].position.x = 525; 
			that.mapPlanets["Coruscant"][8].position.y = 575;
			that.mapPlanets["Coruscant"][8].scale.set(0.18);
			that.mapPlanets["Coruscant"][9].position.x = 575; 
			that.mapPlanets["Coruscant"][9].position.y = 575;
			that.mapPlanets["Coruscant"][9].scale.set(0.18);
			that.mapPlanets["Coruscant"][10].position.x = 625; 
			that.mapPlanets["Coruscant"][10].position.y = 575;
			that.mapPlanets["Coruscant"][10].scale.set(0.18);
			that.mapPlanets["Coruscant"][11].position.x = 520; 
			that.mapPlanets["Coruscant"][11].position.y = 570; 
			that.mapPlanets["Coruscant"][12].position.x = 520; 
			that.mapPlanets["Coruscant"][12].position.y = 570;
			
			that.mapPlanets["Totooine"] = [
				"Totooine",
				new PIXI.Sprite(planetTextures["Totooine"][1]),
				new PIXI.Text(planetTextures["Totooine"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Totooine"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["tusken"][1]),
				new PIXI.Sprite(heroesTextures["jawas"][1]),
				new PIXI.Sprite(heroesTextures["watto"][1]),
				new PIXI.Sprite(heroesTextures["qui_gon_jinn"][1]),
				new PIXI.Sprite(heroesTextures["owen_lars"][1]),
				new PIXI.Sprite(heroesTextures["tusken"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Totooine"][1].name = "Totooine";
			that.mapPlanets["Totooine"][1].position.x = 300; 
			that.mapPlanets["Totooine"][1].position.y = 425; 
			that.mapPlanets["Totooine"][1].interactive = true; 
			that.mapPlanets["Totooine"][1].buttonMode = true;
			that.mapPlanets["Totooine"][1].scale.set(0.2);
			that.mapPlanets["Totooine"][2].position.x = 340; 
			that.mapPlanets["Totooine"][2].position.y = 400; 
			that.mapPlanets["Totooine"][3].position.x = 340; 
			that.mapPlanets["Totooine"][3].position.y = 400;
			that.mapPlanets["Totooine"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Totooine"][4].drawCircle(341, 465, 39);
			that.mapPlanets["Totooine"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Totooine"][4].moveTo(325, 445);
			that.mapPlanets["Totooine"][4].lineTo(335, 420);
			that.mapPlanets["Totooine"][4].moveTo(335, 420);
			that.mapPlanets["Totooine"][4].lineTo(500, 420);
			that.mapPlanets["Totooine"][5].position.x = 375; 
			that.mapPlanets["Totooine"][5].position.y = 400;
			that.mapPlanets["Totooine"][5].scale.set(0.23);
			that.mapPlanets["Totooine"][6].position.x = 435; 
			that.mapPlanets["Totooine"][6].position.y = 400;
			that.mapPlanets["Totooine"][6].scale.set(0.23);
			that.mapPlanets["Totooine"][7].position.x = 490; 
			that.mapPlanets["Totooine"][7].position.y = 410;
			that.mapPlanets["Totooine"][7].scale.set(0.25);
			that.mapPlanets["Totooine"][8].position.x = 375; 
			that.mapPlanets["Totooine"][8].position.y = 425;
			that.mapPlanets["Totooine"][8].scale.set(0.18);
			that.mapPlanets["Totooine"][9].position.x = 425; 
			that.mapPlanets["Totooine"][9].position.y = 425;
			that.mapPlanets["Totooine"][9].scale.set(0.18);
			that.mapPlanets["Totooine"][10].position.x = 475; 
			that.mapPlanets["Totooine"][10].position.y = 400;
			that.mapPlanets["Totooine"][10].scale.set(0.25);
			that.mapPlanets["Totooine"][11].position.x = 370; 
			that.mapPlanets["Totooine"][11].position.y = 420; 
			that.mapPlanets["Totooine"][12].position.x = 370; 
			that.mapPlanets["Totooine"][12].position.y = 420;
			
			that.mapPlanets["Naboo"] = [
				"Naboo",
				new PIXI.Sprite(planetTextures["Naboo"][1]),
				new PIXI.Text(planetTextures["Naboo"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Naboo"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["darth_maul"][1]),
				new PIXI.Sprite(heroesTextures["trade_federation"][1]),
				new PIXI.Sprite(heroesTextures["b1_battle_droid"][2]),
				new PIXI.Sprite(heroesTextures["boss_nass"][2]),
				new PIXI.Sprite(heroesTextures["capitan_panaka"][1]),
				new PIXI.Sprite(heroesTextures["royal_guards"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Naboo"][1].name = "Naboo";
			that.mapPlanets["Naboo"][1].position.x = 630; 
			that.mapPlanets["Naboo"][1].position.y = 240; 
			that.mapPlanets["Naboo"][1].interactive = true; 
			that.mapPlanets["Naboo"][1].buttonMode = true;
			that.mapPlanets["Naboo"][1].scale.set(0.2);
			that.mapPlanets["Naboo"][2].position.x = 670; 
			that.mapPlanets["Naboo"][2].position.y = 215; 
			that.mapPlanets["Naboo"][3].position.x = 670; 
			that.mapPlanets["Naboo"][3].position.y = 215;
			that.mapPlanets["Naboo"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Naboo"][4].drawCircle(672, 280, 39);
			that.mapPlanets["Naboo"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Naboo"][4].moveTo(655, 260);
			that.mapPlanets["Naboo"][4].lineTo(665, 235);
			that.mapPlanets["Naboo"][4].moveTo(665, 235);
			that.mapPlanets["Naboo"][4].lineTo(830, 235);
			that.mapPlanets["Naboo"][5].position.x = 705; 
			that.mapPlanets["Naboo"][5].position.y = 240;
			that.mapPlanets["Naboo"][5].scale.set(0.18);
			that.mapPlanets["Naboo"][6].position.x = 752; 
			that.mapPlanets["Naboo"][6].position.y = 235;
			that.mapPlanets["Naboo"][6].scale.set(0.22);
			that.mapPlanets["Naboo"][7].position.x = 805; 
			that.mapPlanets["Naboo"][7].position.y = 240;
			that.mapPlanets["Naboo"][7].scale.set(0.18);
			that.mapPlanets["Naboo"][8].position.x = 705; 
			that.mapPlanets["Naboo"][8].position.y = 240;
			that.mapPlanets["Naboo"][8].scale.set(0.18);
			that.mapPlanets["Naboo"][9].position.x = 752; 
			that.mapPlanets["Naboo"][9].position.y = 240;
			that.mapPlanets["Naboo"][9].scale.set(0.18);
			that.mapPlanets["Naboo"][10].position.x = 805; 
			that.mapPlanets["Naboo"][10].position.y = 240;
			that.mapPlanets["Naboo"][10].scale.set(0.18);
			that.mapPlanets["Naboo"][11].position.x = 700; 
			that.mapPlanets["Naboo"][11].position.y = 235; 
			that.mapPlanets["Naboo"][12].position.x = 700; 
			that.mapPlanets["Naboo"][12].position.y = 235;
			
			that.mapPlanets["Endor"] = [
				"Endor",
				new PIXI.Sprite(planetTextures["Endor"][1]),
				new PIXI.Text(planetTextures["Endor"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Endor"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["nute_gunray"][1]),
				new PIXI.Sprite(heroesTextures["stormtroopers"][1]),
				new PIXI.Sprite(heroesTextures["aurra_sing"][2]),
				new PIXI.Sprite(heroesTextures["alliance_to_restore_the_republic"][2]),
				new PIXI.Sprite(heroesTextures["wicket_wysri_warrick"][1]),
				new PIXI.Sprite(heroesTextures["aayla_secura"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Endor"][1].name = "Endor";
			that.mapPlanets["Endor"][1].position.x = 200;
			that.mapPlanets["Endor"][1].position.y = 550;
			that.mapPlanets["Endor"][1].interactive = true; 
			that.mapPlanets["Endor"][1].buttonMode = true;
			that.mapPlanets["Endor"][1].scale.set(0.2);
			that.mapPlanets["Endor"][2].position.x = 240; 
			that.mapPlanets["Endor"][2].position.y = 525; 
			that.mapPlanets["Endor"][3].position.x = 240; 
			that.mapPlanets["Endor"][3].position.y = 525;
			that.mapPlanets["Endor"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Endor"][4].drawCircle(240, 590, 39);
			that.mapPlanets["Endor"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Endor"][4].moveTo(225, 570);
			that.mapPlanets["Endor"][4].lineTo(235, 545);
			that.mapPlanets["Endor"][4].moveTo(235, 545);
			that.mapPlanets["Endor"][4].lineTo(400, 545);
			that.mapPlanets["Endor"][5].position.x = 275; 
			that.mapPlanets["Endor"][5].position.y = 550;
			that.mapPlanets["Endor"][5].scale.set(0.18);
			that.mapPlanets["Endor"][6].position.x = 325; 
			that.mapPlanets["Endor"][6].position.y = 545;
			that.mapPlanets["Endor"][6].scale.set(0.2);
			that.mapPlanets["Endor"][7].position.x = 375; 
			that.mapPlanets["Endor"][7].position.y = 550;
			that.mapPlanets["Endor"][7].scale.set(0.19);
			that.mapPlanets["Endor"][8].position.x = 275; 
			that.mapPlanets["Endor"][8].position.y = 545;
			that.mapPlanets["Endor"][8].scale.set(0.20);
			that.mapPlanets["Endor"][9].position.x = 325; 
			that.mapPlanets["Endor"][9].position.y = 550;
			that.mapPlanets["Endor"][9].scale.set(0.18);
			that.mapPlanets["Endor"][10].position.x = 375; 
			that.mapPlanets["Endor"][10].position.y = 550;
			that.mapPlanets["Endor"][10].scale.set(0.18);
			that.mapPlanets["Endor"][11].position.x = 270; 
			that.mapPlanets["Endor"][11].position.y = 545; 
			that.mapPlanets["Endor"][12].position.x = 270; 
			that.mapPlanets["Endor"][12].position.y = 545; 
			
			that.mapPlanets["Hoth"] = [
				"Hoth",
				new PIXI.Sprite(planetTextures["Hoth"][1]),
				new PIXI.Text(planetTextures["Hoth"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Hoth"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["maximilian_veers"][1]),
				new PIXI.Sprite(heroesTextures["stormtrooper_2"][2]),
				new PIXI.Sprite(heroesTextures["stormtrooper_1"][1]),
				new PIXI.Sprite(heroesTextures["general_madine"][2]),
				new PIXI.Sprite(heroesTextures["han_solo"][1]),
				new PIXI.Sprite(heroesTextures["chewbacca"][2]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Hoth"][1].name = "Hoth";
			that.mapPlanets["Hoth"][1].position.x = 700; 
			that.mapPlanets["Hoth"][1].position.y = 485; // 475 +10
			that.mapPlanets["Hoth"][1].interactive = true; 
			that.mapPlanets["Hoth"][1].buttonMode = true;
			that.mapPlanets["Hoth"][1].scale.set(0.2);
			that.mapPlanets["Hoth"][2].position.x = 740; 
			that.mapPlanets["Hoth"][2].position.y = 460; 
			that.mapPlanets["Hoth"][3].position.x = 740; 
			that.mapPlanets["Hoth"][3].position.y = 460;
			that.mapPlanets["Hoth"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Hoth"][4].drawCircle(741, 525, 39);
			that.mapPlanets["Hoth"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Hoth"][4].moveTo(725, 505);
			that.mapPlanets["Hoth"][4].lineTo(735, 480);
			that.mapPlanets["Hoth"][4].moveTo(735, 480);
			that.mapPlanets["Hoth"][4].lineTo(900, 480);
			that.mapPlanets["Hoth"][5].position.x = 775; 
			that.mapPlanets["Hoth"][5].position.y = 485;
			that.mapPlanets["Hoth"][5].scale.set(0.18);
			that.mapPlanets["Hoth"][6].position.x = 825; 
			that.mapPlanets["Hoth"][6].position.y = 485;
			that.mapPlanets["Hoth"][6].scale.set(0.18);
			that.mapPlanets["Hoth"][7].position.x = 875; 
			that.mapPlanets["Hoth"][7].position.y = 485;
			that.mapPlanets["Hoth"][7].scale.set(0.18);
			that.mapPlanets["Hoth"][8].position.x = 775; 
			that.mapPlanets["Hoth"][8].position.y = 485;
			that.mapPlanets["Hoth"][8].scale.set(0.18);
			that.mapPlanets["Hoth"][9].position.x = 825; 
			that.mapPlanets["Hoth"][9].position.y = 485;
			that.mapPlanets["Hoth"][9].scale.set(0.18);
			that.mapPlanets["Hoth"][10].position.x = 875; 
			that.mapPlanets["Hoth"][10].position.y = 485;
			that.mapPlanets["Hoth"][10].scale.set(0.18);
			that.mapPlanets["Hoth"][11].position.x = 770; 
			that.mapPlanets["Hoth"][11].position.y = 480; 
			that.mapPlanets["Hoth"][12].position.x = 770; 
			that.mapPlanets["Hoth"][12].position.y = 480;
			
			that.mapPlanets["Mustafar"] = [
				"Mustafar",
				new PIXI.Sprite(planetTextures["Mustafar"][1]),
				new PIXI.Text(planetTextures["Mustafar"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Mustafar"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["anakin_skywalker"][1]),
				new PIXI.Sprite(heroesTextures["palpatine"][2]),
				new PIXI.Sprite(heroesTextures["separatists"][1]),
				new PIXI.Sprite(heroesTextures["obi_wan_kenobi"][2]),
				new PIXI.Sprite(heroesTextures["padme_amidala"][1]),
				new PIXI.Sprite(heroesTextures["wat_tambor"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Mustafar"][1].name = "Mustafar";
			that.mapPlanets["Mustafar"][1].position.x = 600; 
			that.mapPlanets["Mustafar"][1].position.y = 375;
			that.mapPlanets["Mustafar"][1].interactive = true; 
			that.mapPlanets["Mustafar"][1].buttonMode = true;
			that.mapPlanets["Mustafar"][1].scale.set(0.2);
			that.mapPlanets["Mustafar"][2].position.x = 640; 
			that.mapPlanets["Mustafar"][2].position.y = 350; 
			that.mapPlanets["Mustafar"][3].position.x = 640; 
			that.mapPlanets["Mustafar"][3].position.y = 350;
			that.mapPlanets["Mustafar"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Mustafar"][4].drawCircle(642, 415, 39);
			that.mapPlanets["Mustafar"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Mustafar"][4].moveTo(625, 395);
			that.mapPlanets["Mustafar"][4].lineTo(635, 370);
			that.mapPlanets["Mustafar"][4].moveTo(635, 370);
			that.mapPlanets["Mustafar"][4].lineTo(800, 370);
			that.mapPlanets["Mustafar"][5].position.x = 675; 
			that.mapPlanets["Mustafar"][5].position.y = 375;
			that.mapPlanets["Mustafar"][5].scale.set(0.18);
			that.mapPlanets["Mustafar"][6].position.x = 725; 
			that.mapPlanets["Mustafar"][6].position.y = 375;
			that.mapPlanets["Mustafar"][6].scale.set(0.18);
			that.mapPlanets["Mustafar"][7].position.x = 775; 
			that.mapPlanets["Mustafar"][7].position.y = 360;
			that.mapPlanets["Mustafar"][7].scale.set(0.22);
			that.mapPlanets["Mustafar"][8].position.x = 675; 
			that.mapPlanets["Mustafar"][8].position.y = 375;
			that.mapPlanets["Mustafar"][8].scale.set(0.18);
			that.mapPlanets["Mustafar"][9].position.x = 725; 
			that.mapPlanets["Mustafar"][9].position.y = 375;
			that.mapPlanets["Mustafar"][9].scale.set(0.18);
			that.mapPlanets["Mustafar"][10].position.x = 775; 
			that.mapPlanets["Mustafar"][10].position.y = 375;
			that.mapPlanets["Mustafar"][10].scale.set(0.18);
			that.mapPlanets["Mustafar"][11].position.x = 670; 
			that.mapPlanets["Mustafar"][11].position.y = 370; 
			that.mapPlanets["Mustafar"][12].position.x = 670; 
			that.mapPlanets["Mustafar"][12].position.y = 370;
			
			that.mapPlanets["Dagobah"] = [
				"Dagobah",
				new PIXI.Sprite(planetTextures["Dagobah"][1]),
				new PIXI.Text(planetTextures["Dagobah"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Dagobah"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["stormtroopers"][1]),
				new PIXI.Sprite(heroesTextures["clone_commander_bakara"][2]),
				new PIXI.Sprite(heroesTextures["clone_commander_cody"][1]),
				new PIXI.Sprite(heroesTextures["yoda"][1]),
				new PIXI.Sprite(heroesTextures["barriss_offee"][1]),
				new PIXI.Sprite(heroesTextures["kit_fisto"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Dagobah"][1].name = "Dagobah";
			that.mapPlanets["Dagobah"][1].position.x = 200; 
			that.mapPlanets["Dagobah"][1].position.y = 50; 
			that.mapPlanets["Dagobah"][1].interactive = true; 
			that.mapPlanets["Dagobah"][1].buttonMode = true;
			that.mapPlanets["Dagobah"][1].scale.set(0.2);
			that.mapPlanets["Dagobah"][2].position.x = 240; 
			that.mapPlanets["Dagobah"][2].position.y = 25; 
			that.mapPlanets["Dagobah"][3].position.x = 240; 
			that.mapPlanets["Dagobah"][3].position.y = 25;
			that.mapPlanets["Dagobah"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Dagobah"][4].drawCircle(241, 90, 39);
			that.mapPlanets["Dagobah"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Dagobah"][4].moveTo(225, 70);
			that.mapPlanets["Dagobah"][4].lineTo(235, 45);
			that.mapPlanets["Dagobah"][4].moveTo(235, 45);
			that.mapPlanets["Dagobah"][4].lineTo(400, 45);
			that.mapPlanets["Dagobah"][5].position.x = 275; 
			that.mapPlanets["Dagobah"][5].position.y = 45;
			that.mapPlanets["Dagobah"][5].scale.set(0.2);
			that.mapPlanets["Dagobah"][6].position.x = 325; 
			that.mapPlanets["Dagobah"][6].position.y = 50;
			that.mapPlanets["Dagobah"][6].scale.set(0.18);
			that.mapPlanets["Dagobah"][7].position.x = 375; 
			that.mapPlanets["Dagobah"][7].position.y = 50;
			that.mapPlanets["Dagobah"][7].scale.set(0.18);
			that.mapPlanets["Dagobah"][8].position.x = 275; 
			that.mapPlanets["Dagobah"][8].position.y = 50;
			that.mapPlanets["Dagobah"][8].scale.set(0.18);
			that.mapPlanets["Dagobah"][9].position.x = 325; 
			that.mapPlanets["Dagobah"][9].position.y = 50;
			that.mapPlanets["Dagobah"][9].scale.set(0.18);
			that.mapPlanets["Dagobah"][10].position.x = 375; 
			that.mapPlanets["Dagobah"][10].position.y = 50;
			that.mapPlanets["Dagobah"][10].scale.set(0.18);
			that.mapPlanets["Dagobah"][11].position.x = 270; 
			that.mapPlanets["Dagobah"][11].position.y = 45; 
			that.mapPlanets["Dagobah"][12].position.x = 270; 
			that.mapPlanets["Dagobah"][12].position.y = 45; 
			
			that.mapPlanets["Bespin"] = [
				"Bespin",
				new PIXI.Sprite(planetTextures["Bespin"][1]),
				new PIXI.Text(planetTextures["Bespin"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Bespin"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["boba_fett"][1]),
				new PIXI.Sprite(heroesTextures["stormtrooper_1"][1]),
				new PIXI.Sprite(heroesTextures["clone_commander_neyo"][1]),
				new PIXI.Sprite(heroesTextures["adigallia"][1]),
				new PIXI.Sprite(heroesTextures["lando_calrissian"][1]),
				new PIXI.Sprite(heroesTextures["ki_adi_mundi"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Bespin"][1].name = "Bespin";
			that.mapPlanets["Bespin"][1].position.x = 5;
			that.mapPlanets["Bespin"][1].position.y = 125;
			that.mapPlanets["Bespin"][1].interactive = true; 
			that.mapPlanets["Bespin"][1].buttonMode = true;
			that.mapPlanets["Bespin"][1].scale.set(0.2);
			that.mapPlanets["Bespin"][2].position.x = 45; 
			that.mapPlanets["Bespin"][2].position.y = 100; 
			that.mapPlanets["Bespin"][3].position.x = 45; 
			that.mapPlanets["Bespin"][3].position.y = 100;
			that.mapPlanets["Bespin"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Bespin"][4].drawCircle(47.5, 165.5, 38);
			that.mapPlanets["Bespin"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Bespin"][4].moveTo(30, 145);
			that.mapPlanets["Bespin"][4].lineTo(40, 120);
			that.mapPlanets["Bespin"][4].moveTo(40, 120);
			that.mapPlanets["Bespin"][4].lineTo(205, 120);
			that.mapPlanets["Bespin"][5].position.x = 80; 
			that.mapPlanets["Bespin"][5].position.y = 125;
			that.mapPlanets["Bespin"][5].scale.set(0.18);
			that.mapPlanets["Bespin"][6].position.x = 130; 
			that.mapPlanets["Bespin"][6].position.y = 125;
			that.mapPlanets["Bespin"][6].scale.set(0.18);
			that.mapPlanets["Bespin"][7].position.x = 180; 
			that.mapPlanets["Bespin"][7].position.y = 125;
			that.mapPlanets["Bespin"][7].scale.set(0.18);
			that.mapPlanets["Bespin"][8].position.x = 80; 
			that.mapPlanets["Bespin"][8].position.y = 125;
			that.mapPlanets["Bespin"][8].scale.set(0.18);
			that.mapPlanets["Bespin"][9].position.x = 130; 
			that.mapPlanets["Bespin"][9].position.y = 125;
			that.mapPlanets["Bespin"][9].scale.set(0.18);
			that.mapPlanets["Bespin"][10].position.x = 180; 
			that.mapPlanets["Bespin"][10].position.y = 125;
			that.mapPlanets["Bespin"][10].scale.set(0.18);
			that.mapPlanets["Bespin"][11].position.x = 75; 
			that.mapPlanets["Bespin"][11].position.y = 120; 
			that.mapPlanets["Bespin"][12].position.x = 75; 
			that.mapPlanets["Bespin"][12].position.y = 120;
			
			that.mapPlanets["Geonosis"] = [
				"Geonosis",
				new PIXI.Sprite(planetTextures["Geonosis"][1]),
				new PIXI.Text(planetTextures["Geonosis"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Geonosis"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["b1_battle_droid"][2]),
				new PIXI.Sprite(heroesTextures["dooku"][1]),
				new PIXI.Sprite(heroesTextures["red_battle_droid"][1]),
				new PIXI.Sprite(heroesTextures["republic_clone_army"][1]),
				new PIXI.Sprite(heroesTextures["poggle_the_lesser"][1]),
				new PIXI.Sprite(heroesTextures["saesee_tiin"][2]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Geonosis"][1].name = "Geonosis";
			that.mapPlanets["Geonosis"][1].position.x = 720; // 750 -30
			that.mapPlanets["Geonosis"][1].position.y = 600; 
			that.mapPlanets["Geonosis"][1].interactive = true; 
			that.mapPlanets["Geonosis"][1].buttonMode = true;
			that.mapPlanets["Geonosis"][1].scale.set(0.2);
			that.mapPlanets["Geonosis"][2].position.x = 760; 
			that.mapPlanets["Geonosis"][2].position.y = 575; 
			that.mapPlanets["Geonosis"][3].position.x = 760; 
			that.mapPlanets["Geonosis"][3].position.y = 575;
			that.mapPlanets["Geonosis"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Geonosis"][4].drawCircle(760, 639, 39);
			that.mapPlanets["Geonosis"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Geonosis"][4].moveTo(745, 620);
			that.mapPlanets["Geonosis"][4].lineTo(755, 595);
			that.mapPlanets["Geonosis"][4].moveTo(755, 595);
			that.mapPlanets["Geonosis"][4].lineTo(920, 595);
			that.mapPlanets["Geonosis"][5].position.x = 795; 
			that.mapPlanets["Geonosis"][5].position.y = 600;
			that.mapPlanets["Geonosis"][5].scale.set(0.18);
			that.mapPlanets["Geonosis"][6].position.x = 845; 
			that.mapPlanets["Geonosis"][6].position.y = 600;
			that.mapPlanets["Geonosis"][6].scale.set(0.19);
			that.mapPlanets["Geonosis"][7].position.x = 895; 
			that.mapPlanets["Geonosis"][7].position.y = 600;
			that.mapPlanets["Geonosis"][7].scale.set(0.18);
			that.mapPlanets["Geonosis"][8].position.x = 785; 
			that.mapPlanets["Geonosis"][8].position.y = 585;
			that.mapPlanets["Geonosis"][8].scale.set(0.23);
			that.mapPlanets["Geonosis"][9].position.x = 850; 
			that.mapPlanets["Geonosis"][9].position.y = 600;
			that.mapPlanets["Geonosis"][9].scale.set(0.18);
			that.mapPlanets["Geonosis"][10].position.x = 890; 
			that.mapPlanets["Geonosis"][10].position.y = 600;
			that.mapPlanets["Geonosis"][10].scale.set(0.18);
			that.mapPlanets["Geonosis"][11].position.x = 790; 
			that.mapPlanets["Geonosis"][11].position.y = 595; 
			that.mapPlanets["Geonosis"][12].position.x = 790; 
			that.mapPlanets["Geonosis"][12].position.y = 595; 
	
			that.mapPlanets["Alderaan"] = [
				"Alderaan",
				new PIXI.Sprite(planetTextures["Alderaan"][1]),
				new PIXI.Text(planetTextures["Alderaan"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Alderaan"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["admiral_ozzel"][1]),
				new PIXI.Sprite(heroesTextures["stormtroopers"][1]),
				new PIXI.Sprite(heroesTextures["rune_haako"][1]),
				new PIXI.Sprite(heroesTextures["bail_organa"][1]),
				new PIXI.Sprite(heroesTextures["leia_organa"][1]),
				new PIXI.Sprite(heroesTextures["kapitan_antilles"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Alderaan"][1].name = "Alderaan";
			that.mapPlanets["Alderaan"][1].position.x = 50; 
			that.mapPlanets["Alderaan"][1].position.y = 380;
			that.mapPlanets["Alderaan"][1].interactive = true; 
			that.mapPlanets["Alderaan"][1].buttonMode = true;
			that.mapPlanets["Alderaan"][1].scale.set(0.2);
			that.mapPlanets["Alderaan"][2].position.x = 90; 
			that.mapPlanets["Alderaan"][2].position.y = 355; 
			that.mapPlanets["Alderaan"][3].position.x = 90; 
			that.mapPlanets["Alderaan"][3].position.y = 355;
			that.mapPlanets["Alderaan"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Alderaan"][4].drawCircle(90, 420, 39);
			that.mapPlanets["Alderaan"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Alderaan"][4].moveTo(75, 400);
			that.mapPlanets["Alderaan"][4].lineTo(85, 375);
			that.mapPlanets["Alderaan"][4].moveTo(85, 375);
			that.mapPlanets["Alderaan"][4].lineTo(250, 375);
			that.mapPlanets["Alderaan"][5].position.x = 125; 
			that.mapPlanets["Alderaan"][5].position.y = 380;
			that.mapPlanets["Alderaan"][5].scale.set(0.18);
			that.mapPlanets["Alderaan"][6].position.x = 175; 
			that.mapPlanets["Alderaan"][6].position.y = 375;
			that.mapPlanets["Alderaan"][6].scale.set(0.2);
			that.mapPlanets["Alderaan"][7].position.x = 225; 
			that.mapPlanets["Alderaan"][7].position.y = 380;
			that.mapPlanets["Alderaan"][7].scale.set(0.18);
			that.mapPlanets["Alderaan"][8].position.x = 125; 
			that.mapPlanets["Alderaan"][8].position.y = 380;
			that.mapPlanets["Alderaan"][8].scale.set(0.18);
			that.mapPlanets["Alderaan"][9].position.x = 175; 
			that.mapPlanets["Alderaan"][9].position.y = 380;
			that.mapPlanets["Alderaan"][9].scale.set(0.17);
			that.mapPlanets["Alderaan"][10].position.x = 225; 
			that.mapPlanets["Alderaan"][10].position.y = 380;
			that.mapPlanets["Alderaan"][10].scale.set(0.18);
			that.mapPlanets["Alderaan"][11].position.x = 120; 
			that.mapPlanets["Alderaan"][11].position.y = 375; 
			that.mapPlanets["Alderaan"][12].position.x = 120; 
			that.mapPlanets["Alderaan"][12].position.y = 375;
	
			that.mapPlanets["Kamino"] = [
				"Kamino",
				new PIXI.Sprite(planetTextures["Kamino"][1]),
				new PIXI.Text(planetTextures["Kamino"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Kamino"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["jango_fett"][1]),
				new PIXI.Sprite(heroesTextures["republic_clone_army"][1]),
				new PIXI.Sprite(heroesTextures["clone_commander_rex"][1]),
				new PIXI.Sprite(heroesTextures["plo_koon"][1]),
				new PIXI.Sprite(heroesTextures["clone_commander_bakara"][1]),
				new PIXI.Sprite(heroesTextures["clone_commander_neyo"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Kamino"][1].name = "Kamino";
			that.mapPlanets["Kamino"][1].position.x = 400; 
			that.mapPlanets["Kamino"][1].position.y = 275; 
			that.mapPlanets["Kamino"][1].interactive = true; 
			that.mapPlanets["Kamino"][1].buttonMode = true;
			that.mapPlanets["Kamino"][1].scale.set(0.2);
			that.mapPlanets["Kamino"][2].position.x = 440; 
			that.mapPlanets["Kamino"][2].position.y = 250; 
			that.mapPlanets["Kamino"][3].position.x = 440; 
			that.mapPlanets["Kamino"][3].position.y = 250;
			that.mapPlanets["Kamino"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Kamino"][4].drawCircle(441, 315, 39);
			that.mapPlanets["Kamino"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Kamino"][4].moveTo(425, 295);
			that.mapPlanets["Kamino"][4].lineTo(435, 270);
			that.mapPlanets["Kamino"][4].moveTo(435, 270);
			that.mapPlanets["Kamino"][4].lineTo(600, 270);
			that.mapPlanets["Kamino"][5].position.x = 475; 
			that.mapPlanets["Kamino"][5].position.y = 275;
			that.mapPlanets["Kamino"][5].scale.set(0.18);
			that.mapPlanets["Kamino"][6].position.x = 515; 
			that.mapPlanets["Kamino"][6].position.y = 260;
			that.mapPlanets["Kamino"][6].scale.set(0.22);
			that.mapPlanets["Kamino"][7].position.x = 575; 
			that.mapPlanets["Kamino"][7].position.y = 275;
			that.mapPlanets["Kamino"][7].scale.set(0.18);
			that.mapPlanets["Kamino"][8].position.x = 475; 
			that.mapPlanets["Kamino"][8].position.y = 275;
			that.mapPlanets["Kamino"][8].scale.set(0.18);
			that.mapPlanets["Kamino"][9].position.x = 525; 
			that.mapPlanets["Kamino"][9].position.y = 275;
			that.mapPlanets["Kamino"][9].scale.set(0.18);
			that.mapPlanets["Kamino"][10].position.x = 575; 
			that.mapPlanets["Kamino"][10].position.y = 275;
			that.mapPlanets["Kamino"][10].scale.set(0.18);
			that.mapPlanets["Kamino"][11].position.x = 470; 
			that.mapPlanets["Kamino"][11].position.y = 270; 
			that.mapPlanets["Kamino"][12].position.x = 470; 
			that.mapPlanets["Kamino"][12].position.y = 270; 
	
			that.mapPlanets["DeathStar"] = [
				"DeathStar",
				new PIXI.Sprite(planetTextures["DeathStar"][1]),
				new PIXI.Text(planetTextures["DeathStar"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["DeathStar"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["darth_vader"][1]),
				new PIXI.Sprite(heroesTextures["darth_sidious"][1]),
				new PIXI.Sprite(heroesTextures["commander_jerjerrod"][1]),
				new PIXI.Sprite(heroesTextures["luke_skywalker"][1]),
				new PIXI.Sprite(heroesTextures["luke_skywalker"][1]),
				new PIXI.Sprite(heroesTextures["luke_skywalker"][1]),
				new PIXI.Text("Победа Джедай", that.planetBlueStyleText),
				new PIXI.Text("Орден Ситов", that.planetRedStyleText)
			];
			that.mapPlanets["DeathStar"][1].name = "DeathStar";
			that.mapPlanets["DeathStar"][1].position.x = 150;
			that.mapPlanets["DeathStar"][1].position.y = 245;
			that.mapPlanets["DeathStar"][1].interactive = true; 
			that.mapPlanets["DeathStar"][1].buttonMode = true;
			that.mapPlanets["DeathStar"][1].scale.set(0.2);
			that.mapPlanets["DeathStar"][2].position.x = 190; 
			that.mapPlanets["DeathStar"][2].position.y = 220; 
			that.mapPlanets["DeathStar"][3].position.x = 190; 
			that.mapPlanets["DeathStar"][3].position.y = 220;
			that.mapPlanets["DeathStar"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["DeathStar"][4].drawCircle(190, 285, 39);
			that.mapPlanets["DeathStar"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["DeathStar"][4].moveTo(175, 265);
			that.mapPlanets["DeathStar"][4].lineTo(185, 240);
			that.mapPlanets["DeathStar"][4].moveTo(185, 240);
			that.mapPlanets["DeathStar"][4].lineTo(350, 240);
			that.mapPlanets["DeathStar"][5].position.x = 225; 
			that.mapPlanets["DeathStar"][5].position.y = 245;
			that.mapPlanets["DeathStar"][5].scale.set(0.18);
			that.mapPlanets["DeathStar"][6].position.x = 275; 
			that.mapPlanets["DeathStar"][6].position.y = 240;
			that.mapPlanets["DeathStar"][6].scale.set(0.20);
			that.mapPlanets["DeathStar"][7].position.x = 325; 
			that.mapPlanets["DeathStar"][7].position.y = 245;
			that.mapPlanets["DeathStar"][7].scale.set(0.18);
			that.mapPlanets["DeathStar"][8].position.x = 225; 
			that.mapPlanets["DeathStar"][8].position.y = 245;
			that.mapPlanets["DeathStar"][8].scale.set(0.18);
			that.mapPlanets["DeathStar"][9].position.x = 275; 
			that.mapPlanets["DeathStar"][9].position.y = 245;
			that.mapPlanets["DeathStar"][9].scale.set(0.18);
			that.mapPlanets["DeathStar"][10].position.x = 325; 
			that.mapPlanets["DeathStar"][10].position.y = 245;
			that.mapPlanets["DeathStar"][10].scale.set(0.18);
			that.mapPlanets["DeathStar"][11].position.x = 220; 
			that.mapPlanets["DeathStar"][11].position.y = 240; 
			that.mapPlanets["DeathStar"][12].position.x = 220; 
			that.mapPlanets["DeathStar"][12].position.y = 240;
	
			that.mapPlanets["Utapau"] = [
				"Utapau",
				new PIXI.Sprite(planetTextures["Utapau"][1]),
				new PIXI.Text(planetTextures["Utapau"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Utapau"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["separatists"][1]),
				new PIXI.Sprite(heroesTextures["general_grievous"][1]),
				new PIXI.Sprite(heroesTextures["clone_commander_cody"][1]),
				new PIXI.Sprite(heroesTextures["shaak_ti"][1]),
				new PIXI.Sprite(heroesTextures["tion_medon"][1]),
				new PIXI.Sprite(heroesTextures["bib_fortuna"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Utapau"][1].name = "Utapau";
			that.mapPlanets["Utapau"][1].position.x = 700; 
			that.mapPlanets["Utapau"][1].position.y = 50; 
			that.mapPlanets["Utapau"][1].interactive = true; 
			that.mapPlanets["Utapau"][1].buttonMode = true;
			that.mapPlanets["Utapau"][1].scale.set(0.2);
			that.mapPlanets["Utapau"][2].position.x = 740; 
			that.mapPlanets["Utapau"][2].position.y = 25; 
			that.mapPlanets["Utapau"][3].position.x = 740; 
			that.mapPlanets["Utapau"][3].position.y = 25;
			that.mapPlanets["Utapau"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Utapau"][4].drawCircle(741, 90, 39);
			that.mapPlanets["Utapau"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Utapau"][4].moveTo(725, 70);
			that.mapPlanets["Utapau"][4].lineTo(735, 45);
			that.mapPlanets["Utapau"][4].moveTo(735, 45);
			that.mapPlanets["Utapau"][4].lineTo(900, 45);
			that.mapPlanets["Utapau"][5].position.x = 770; 
			that.mapPlanets["Utapau"][5].position.y = 40;
			that.mapPlanets["Utapau"][5].scale.set(0.22);
			that.mapPlanets["Utapau"][6].position.x = 820; 
			that.mapPlanets["Utapau"][6].position.y = 40;
			that.mapPlanets["Utapau"][6].scale.set(0.25);
			that.mapPlanets["Utapau"][7].position.x = 875; 
			that.mapPlanets["Utapau"][7].position.y = 50;
			that.mapPlanets["Utapau"][7].scale.set(0.18);
			that.mapPlanets["Utapau"][8].position.x = 775; 
			that.mapPlanets["Utapau"][8].position.y = 50;
			that.mapPlanets["Utapau"][8].scale.set(0.18);
			that.mapPlanets["Utapau"][9].position.x = 825; 
			that.mapPlanets["Utapau"][9].position.y = 50;
			that.mapPlanets["Utapau"][9].scale.set(0.18);
			that.mapPlanets["Utapau"][10].position.x = 875; 
			that.mapPlanets["Utapau"][10].position.y = 50;
			that.mapPlanets["Utapau"][10].scale.set(0.18);
			that.mapPlanets["Utapau"][11].position.x = 770; 
			that.mapPlanets["Utapau"][11].position.y = 45; 
			that.mapPlanets["Utapau"][12].position.x = 770; 
			that.mapPlanets["Utapau"][12].position.y = 45; 
	
			that.mapPlanets["Saleucami"] = [
				"Saleucami",
				new PIXI.Sprite(planetTextures["Saleucami"][1]),
				new PIXI.Text(planetTextures["Saleucami"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Saleucami"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["clone_commander_rex"][1]),
				new PIXI.Sprite(heroesTextures["general_grievous"][1]),
				new PIXI.Sprite(heroesTextures["b1_battle_droid"][1]),
				new PIXI.Sprite(heroesTextures["eeth_koth"][1]),
				new PIXI.Sprite(heroesTextures["mon_motma"][1]),
				new PIXI.Sprite(heroesTextures["c_3po"][2]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Saleucami"][1].name = "Saleucami";
			that.mapPlanets["Saleucami"][1].position.x = 810;
			that.mapPlanets["Saleucami"][1].position.y = 155;
			that.mapPlanets["Saleucami"][1].interactive = true; 
			that.mapPlanets["Saleucami"][1].buttonMode = true;
			that.mapPlanets["Saleucami"][1].scale.set(0.2);
			that.mapPlanets["Saleucami"][2].position.x = 850; 
			that.mapPlanets["Saleucami"][2].position.y = 130; 
			that.mapPlanets["Saleucami"][3].position.x = 850; 
			that.mapPlanets["Saleucami"][3].position.y = 130;
			that.mapPlanets["Saleucami"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Saleucami"][4].drawCircle(850, 195, 39);
			that.mapPlanets["Saleucami"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Saleucami"][4].moveTo(835, 175);
			that.mapPlanets["Saleucami"][4].lineTo(845, 150);
			that.mapPlanets["Saleucami"][4].moveTo(845, 150);
			that.mapPlanets["Saleucami"][4].lineTo(1010, 150);
			that.mapPlanets["Saleucami"][5].position.x = 885; 
			that.mapPlanets["Saleucami"][5].position.y = 155;
			that.mapPlanets["Saleucami"][5].scale.set(0.18);
			that.mapPlanets["Saleucami"][6].position.x = 930; 
			that.mapPlanets["Saleucami"][6].position.y = 140;
			that.mapPlanets["Saleucami"][6].scale.set(0.25);
			that.mapPlanets["Saleucami"][7].position.x = 985; 
			that.mapPlanets["Saleucami"][7].position.y = 155;
			that.mapPlanets["Saleucami"][7].scale.set(0.18);
			that.mapPlanets["Saleucami"][8].position.x = 885; 
			that.mapPlanets["Saleucami"][8].position.y = 155;
			that.mapPlanets["Saleucami"][8].scale.set(0.18);
			that.mapPlanets["Saleucami"][9].position.x = 935; 
			that.mapPlanets["Saleucami"][9].position.y = 155;
			that.mapPlanets["Saleucami"][9].scale.set(0.18);
			that.mapPlanets["Saleucami"][10].position.x = 985; 
			that.mapPlanets["Saleucami"][10].position.y = 155;
			that.mapPlanets["Saleucami"][10].scale.set(0.18);
			that.mapPlanets["Saleucami"][11].position.x = 880; 
			that.mapPlanets["Saleucami"][11].position.y = 150; 
			that.mapPlanets["Saleucami"][12].position.x = 880; 
			that.mapPlanets["Saleucami"][12].position.y = 150;
	
			that.mapPlanets["Jakku"] = [
				"Jakku",                                                                                        // 0 - наименование
				new PIXI.Sprite(planetTextures["Jakku"][1]),                                                    // 1 - текстура планеты
				new PIXI.Text(planetTextures["Jakku"][0], that.planetBlueStyleText),                             // 2 - имя планеты (свет)
				new PIXI.Text(planetTextures["Jakku"][0], that.planetRedStyleText),                              // 3 - имя планеты (тьма)
				new PIXI.Graphics(),                                                                            // 4 - графика
				new PIXI.Sprite(heroesTextures["kylo_ren"][1]),                                                 // 5 - персонаж (тьма)
				new PIXI.Sprite(heroesTextures["phasma"][1]),                                                   // 6 - персонажи (тьма)
				new PIXI.Sprite(heroesTextures["stormtrooper_1"][1]),                                           // 7 - персонажи (тьма)
				new PIXI.Sprite(heroesTextures["rey"][1]),                                                      // 8 - персонажи (свет)
				new PIXI.Sprite(heroesTextures["finn"][1]),                                                     // 9 - персонажи (свет)
				new PIXI.Sprite(heroesTextures["poe_dameron"][1]),                                              // 10 - персонажи (свет)
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),                                       // 11
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)                                      // 12
			];
			that.mapPlanets["Jakku"][1].name = "Jakku";
			that.mapPlanets["Jakku"][1].position.x = 450; 
			that.mapPlanets["Jakku"][1].position.y = 75; 
			that.mapPlanets["Jakku"][1].interactive = true; 
			that.mapPlanets["Jakku"][1].buttonMode = true;
			that.mapPlanets["Jakku"][1].scale.set(0.2);
			that.mapPlanets["Jakku"][2].position.x = 490; 
			that.mapPlanets["Jakku"][2].position.y = 50; 
			that.mapPlanets["Jakku"][3].position.x = 490; 
			that.mapPlanets["Jakku"][3].position.y = 50;
			that.mapPlanets["Jakku"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Jakku"][4].drawCircle(491, 115, 39);
			that.mapPlanets["Jakku"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Jakku"][4].moveTo(475, 95);
			that.mapPlanets["Jakku"][4].lineTo(485, 70);
			that.mapPlanets["Jakku"][4].moveTo(485, 70);
			that.mapPlanets["Jakku"][4].lineTo(650, 70);
			that.mapPlanets["Jakku"][5].position.x = 525; 
			that.mapPlanets["Jakku"][5].position.y = 75;
			that.mapPlanets["Jakku"][5].scale.set(0.18);
			that.mapPlanets["Jakku"][6].position.x = 575; 
			that.mapPlanets["Jakku"][6].position.y = 75;
			that.mapPlanets["Jakku"][6].scale.set(0.18);
			that.mapPlanets["Jakku"][7].position.x = 625; 
			that.mapPlanets["Jakku"][7].position.y = 75;
			that.mapPlanets["Jakku"][7].scale.set(0.18);
			that.mapPlanets["Jakku"][8].position.x = 525; 
			that.mapPlanets["Jakku"][8].position.y = 75;
			that.mapPlanets["Jakku"][8].scale.set(0.18);
			that.mapPlanets["Jakku"][9].position.x = 575; 
			that.mapPlanets["Jakku"][9].position.y = 75;
			that.mapPlanets["Jakku"][9].scale.set(0.18);
			that.mapPlanets["Jakku"][10].position.x = 625; 
			that.mapPlanets["Jakku"][10].position.y = 75;
			that.mapPlanets["Jakku"][10].scale.set(0.18);
			that.mapPlanets["Jakku"][11].position.x = 520; 
			that.mapPlanets["Jakku"][11].position.y = 70; 
			that.mapPlanets["Jakku"][12].position.x = 520; 
			that.mapPlanets["Jakku"][12].position.y = 70;
		},
		
		initMessage: function()
		{
			that.mapMessage = new Object();
			that.mapMessage["LastNews"] = ["Меня зовут R2D2, рад вас приветствовать.\n\nКорусант является основной целью Ситов.", "Меня зовут R3-S6, приветствую тебя мой повелитель. \n\nДжедаи хотят разрушить Звезду смерти и помешать нашим планам."];
			that.mapMessage["Coruscant"] = ["Корусант\nКорусант, так же известный как Центр Империи или Королева Ядра — сверкающая планета. Корусант тысячелетиями был политическим центром Галактики.\n\nВы должны защетить Корусант любой ценой иначе битва будет проиграна!", "Корусант\nКорусант, так же известный как Центр Империи или Королева Ядра — сверкающая планета. Корусант тысячелетиями был политическим центром Галактики.\n\nМой повелитель мы должны уничтожить Корусант чтобы победить!"];
			that.mapMessage["Totooine"] = ["Татуин\n\nДалекий от бдительных глаз Галактической Империи, Татуин стал пристанищем для различного рода авантюристов — контрабандистов, наёмников, охотников за головами. \nМесто рождения Энакина Скайуокера.", "Татуин\n\nДалекий от бдительных глаз Галактической Империи, Татуин стал пристанищем для различного рода авантюристов — контрабандистов, наёмников, охотников за головами. \nМесто рождения Энакина Скайуокера."];
			that.mapMessage["Naboo"] = ["Набу\n\nНабу населена двумя независимыми друг от друга обществами — гунганами, обитающими в подводных городах, и набуанцами - людьми. Родной мир Падме Амидалы Наберри и Джа Джа Бинкса, а также сенатора и будущего императора Палпатина.", "Набу\n\nНабу населена двумя независимыми друг от друга обществами — гунганами, обитающими в подводных городах, и набуанцами - людьми. Родной мир Падме Амидалы Наберри и Джа Джа Бинкса, а также сенатора и будущего императора Палпатина."];
			that.mapMessage["Endor"] = ["Эндор\n\nГазовый гигант, вращавшийся вокруг звезды Иблим во Внешнем Кольце. Галактическая Империя создала Запретный путепровод, чтобы быстро добираться до окрестностей планеты.", "Эндор\n\nГазовый гигант, вращавшийся вокруг звезды Иблим во Внешнем Кольце. Галактическая Империя создала Запретный путепровод, чтобы быстро добираться до окрестностей планеты."];
			that.mapMessage["Hoth"] = ["Хот\n\nПоверхность планеты - одна непрерывная корка льда и снега. \n\nХот не нанесен на большинство карт звездного неба, тем самым делая эту планету очень удобной для мятежников.", "Хот\n\nПоверхность планеты - одна непрерывная корка льда и снега. \n\nХот не нанесен на большинство карт звездного неба, тем самым делая эту планету очень удобной для мятежников."];
			that.mapMessage["Mustafar"] = ["Мустафар\n\nМаленький вулканический мир, где лава добывалась как ценный ресурс. Он также являлся последней столицей Конфедерации Независимых Систем.", "Мустафар\n\nМаленький вулканический мир, где лава добывалась как ценный ресурс. Он также являлся последней столицей Конфедерации Независимых Систем."];
			that.mapMessage["Dagobah"] = ["Дагоба\n\nДагоба — это суровая, влажная планета, практически полностью покрытая топями, перемежающимися с душными лесами.", "Дагоба\n\nДагоба — это суровая, влажная планета, практически полностью покрытая топями, перемежающимися с душными лесами."];
			that.mapMessage["Bespin"] = ["Беспин\n\nБеспин – это газовый гигант из системы Беспин сектора Аноат Внешнего Кольца. Планета являлась важным источником газа.", "Беспин\n\nБеспин – это газовый гигант из системы Беспин сектора Аноат Внешнего Кольца. Планета являлась важным источником газа."];
			that.mapMessage["Geonosis"] = ["Джеонозис\n\nРодная планета джеонозийцев, первая столица Конфедерации независимых систем и главный центр производства дроидов.", "Джеонозис\n\nРодная планета джеонозийцев, первая столица Конфедерации независимых систем и главный центр производства дроидов."];
			that.mapMessage["Alderaan"] = ["Альдераан\n\nАльдераан, родной дом для многих знаменитых героев, включая Лею Органу Соло, Бейла Органу и Улика Кель-Дрому. Известные по всей Галактике своей безупречной красотой, утончённой культурой.", "Альдераан\n\nАльдераан, родной дом для многих знаменитых героев, включая Лею Органу Соло, Бейла Органу и Улика Кель-Дрому. Известные по всей Галактике своей безупречной красотой, утончённой культурой."];
			that.mapMessage["Kamino"] = ["Камино\n\nКамино — водный мир, где была произведена армия клонов для Галактической Республики, позже ставшая имперским штурмовым корпусом, Каминоанский флот обороны.", "Камино\n\nКамино — водный мир, где была произведена армия клонов для Галактической Республики, позже ставшая имперским штурмовым корпусом, Каминоанский флот обороны."];
			that.mapMessage["DeathStar"] = ["Звезда смерти\n\nЗвезда Смерти супероружием шарообразной формы. \n\nНаша главная цель уничтожить Звезду Смерти и Дарт Вейдера. \nТолько так мы победим в войне с тёмной силой!", "Звезда смерти\n\nЗвезда Смерти супероружием шарообразной формы. \n\nМой повелитель мы должны уберечь Звезду Смерти от Джедаев, иначе битва будет проиграна."];
			that.mapMessage["Utapau"] = ["Утапау была населена двумя разумными видами: высокими, серокожими, медлительными, хрупковатыми на вид пау'анами, получившими прозвище «древний народ» за долгую продолжительность жизни, и коренастыми, низкорослыми утаями, прозванными «коротышками».", "Утапау была населена двумя разумными видами: высокими, серокожими, медлительными, хрупковатыми на вид пау'анами, получившими прозвище «древний народ» за долгую продолжительность жизни, и коренастыми, низкорослыми утаями, прозванными «коротышками»."];
			that.mapMessage["Saleucami"] = ["Салукемай\n\nСалукемай был тусклым, засушливым миром с разбросанными оазисами растений. Планета находилась на пути Талеского транзита, по которому поставлялись грузы по Перлемианскому торговому маршруту.", "Салукемай\n\nСалукемай был тусклым, засушливым миром с разбросанными оазисами растений. Планета находилась на пути Талеского транзита, по которому поставлялись грузы по Перлемианскому торговому маршруту."];
			that.mapMessage["Jakku"] = ["Джакку - представлял собой изолированный пустынный мир, который на севере пересекали Колёсные пути, а через всю планету шли горнодобывающие карьеры. В пустошах можно встретить отшельников, а также мусорщиков, которые перевозили своё добро на лаггабистах.", "Джакку - представлял собой изолированный пустынный мир, который на севере пересекали Колёсные пути, а через всю планету шли горнодобывающие карьеры. В пустошах можно встретить отшельников, а также мусорщиков, которые перевозили своё добро на лаггабистах."];
		},
		
		initPersonages: function()
		{
			that.personages = new Object();
			for (var key in personagesJson.data.Personages.personage)
			{
				that.personages[personagesJson.data.Personages.personage[key].id] = new that.Personage(personagesJson.data.Personages.personage[key].id, personagesJson.data.Personages.personage[key].name);
				that.personages[personagesJson.data.Personages.personage[key].id].life = personagesJson.data.Personages.personage[key].life;
				that.personages[personagesJson.data.Personages.personage[key].id].hitAttack1 = personagesJson.data.Personages.personage[key].hit1;
				that.personages[personagesJson.data.Personages.personage[key].id].hitAttack2 = personagesJson.data.Personages.personage[key].hit2;
				that.personages[personagesJson.data.Personages.personage[key].id].hitAttack3 = personagesJson.data.Personages.personage[key].hit3;
				that.personages[personagesJson.data.Personages.personage[key].id].hitAttack4 = personagesJson.data.Personages.personage[key].hit4;
				that.personages[personagesJson.data.Personages.personage[key].id].hitAttack5 = personagesJson.data.Personages.personage[key].hit5;
				that.personages[personagesJson.data.Personages.personage[key].id].hitDefense1 = personagesJson.data.Personages.personage[key].hit1;
				that.personages[personagesJson.data.Personages.personage[key].id].hitDefense2 = personagesJson.data.Personages.personage[key].hit2;
				that.personages[personagesJson.data.Personages.personage[key].id].hitDefense3 = personagesJson.data.Personages.personage[key].hit3;
				that.personages[personagesJson.data.Personages.personage[key].id].hitDefense4 = personagesJson.data.Personages.personage[key].hit4;
				that.personages[personagesJson.data.Personages.personage[key].id].hitDefense5 = personagesJson.data.Personages.personage[key].hit5;
				that.personages[personagesJson.data.Personages.personage[key].id].planet = "";
				that.personages[personagesJson.data.Personages.personage[key].id].status = personagesJson.data.Personages.personage[key].status;
				that.personages[personagesJson.data.Personages.personage[key].id].description = personagesJson.data.Personages.personage[key].description;
			}
		},
		
		initPlanets: function()
		{
			that.planets = new Object();
			for (var key in planetsJson.data.Planets.planet)
			{
				that.planets[planetsJson.data.Planets.planet[key].id] = new that.Planet(planetsJson.data.Planets.planet[key].id, planetsJson.data.Planets.planet[key].name);
				that.planets[planetsJson.data.Planets.planet[key].id].bluePersonage1 = planetsJson.data.Planets.planet[key].bluePersonage1;
				that.planets[planetsJson.data.Planets.planet[key].id].bluePersonage2 = planetsJson.data.Planets.planet[key].bluePersonage2;
				that.planets[planetsJson.data.Planets.planet[key].id].bluePersonage3 = planetsJson.data.Planets.planet[key].bluePersonage3;
				that.planets[planetsJson.data.Planets.planet[key].id].blueRewardPersonage1 = planetsJson.data.Planets.planet[key].bluePersonage1;
				that.planets[planetsJson.data.Planets.planet[key].id].blueRewardPersonage2 = planetsJson.data.Planets.planet[key].bluePersonage2;
				that.planets[planetsJson.data.Planets.planet[key].id].blueRewardPersonage3 = planetsJson.data.Planets.planet[key].bluePersonage3;
				
				that.planets[planetsJson.data.Planets.planet[key].id].redPersonage1 = planetsJson.data.Planets.planet[key].redPersonage1;
				that.planets[planetsJson.data.Planets.planet[key].id].redPersonage2 = planetsJson.data.Planets.planet[key].redPersonage2;
				that.planets[planetsJson.data.Planets.planet[key].id].redPersonage3 = planetsJson.data.Planets.planet[key].redPersonage3;
				that.planets[planetsJson.data.Planets.planet[key].id].redRewardPersonage1 = planetsJson.data.Planets.planet[key].redPersonage1;
				that.planets[planetsJson.data.Planets.planet[key].id].redRewardPersonage2 = planetsJson.data.Planets.planet[key].redPersonage2;
				that.planets[planetsJson.data.Planets.planet[key].id].redRewardPersonage3 = planetsJson.data.Planets.planet[key].redPersonage3;
				
				that.planets[planetsJson.data.Planets.planet[key].id].status = planetsJson.data.Planets.planet[key].status;
				that.planets[planetsJson.data.Planets.planet[key].id].description = planetsJson.data.Planets.planet[key].description;
			}
		},
		
		initCommandUser: function()
		{
			that.commandUser = new Object();
			if(dataSide === that.SIDE_JEDI)
			{
				that.commandUser["personage1"] = that.planets["Coruscant"].bluePersonage1;
				that.personages[that.planets["Coruscant"].bluePersonage1].status = that.USER_PERSONAGE_AVAILABLE;
				that.personages[that.planets["Coruscant"].bluePersonage1].command = true;
				that.commandUser["personage2"] = that.planets["Coruscant"].bluePersonage2;
				that.personages[that.planets["Coruscant"].bluePersonage2].status = that.USER_PERSONAGE_AVAILABLE;
				that.personages[that.planets["Coruscant"].bluePersonage2].command = true;
				that.commandUser["personage3"] = that.planets["Coruscant"].bluePersonage3;
				that.personages[that.planets["Coruscant"].bluePersonage3].status = that.USER_PERSONAGE_AVAILABLE;
				that.personages[that.planets["Coruscant"].bluePersonage3].command = true;
			}
			if(dataSide === that.SIDE_SITH)
			{
				that.commandUser["personage1"] = that.planets["DeathStar"].redPersonage1;
				that.personages[that.planets["DeathStar"].redPersonage1].status = that.USER_PERSONAGE_AVAILABLE;
				that.personages[that.planets["DeathStar"].redPersonage1].command = true;
				that.commandUser["personage2"] = that.planets["DeathStar"].redPersonage2;
				that.personages[that.planets["DeathStar"].redPersonage2].status = that.USER_PERSONAGE_AVAILABLE;
				that.personages[that.planets["DeathStar"].redPersonage2].command = true;
				that.commandUser["personage3"] = that.planets["DeathStar"].redPersonage3;
				that.personages[that.planets["DeathStar"].redPersonage3].status = that.USER_PERSONAGE_AVAILABLE;
				that.personages[that.planets["DeathStar"].redPersonage3].command = true;
			}
		},
		
		initCommandAI: function()
		{
			that.commandAI = new Object();
			if(dataSide === that.SIDE_JEDI)
			{
				that.commandAI["personage1"] = that.planets["DeathStar"].redPersonage1;
                                                                        that.personages[that.planets["DeathStar"].redPersonage1].status = that.AI_PERSONAGE_AVAILABLE;
				that.commandAI["personage2"] = that.planets["DeathStar"].redPersonage2;
                                                                        that.personages[that.planets["DeathStar"].redPersonage2].status = that.AI_PERSONAGE_AVAILABLE;
				that.commandAI["personage3"] = that.planets["DeathStar"].redPersonage3;
                                                                        that.personages[that.planets["DeathStar"].redPersonage3].status = that.AI_PERSONAGE_AVAILABLE;
			}
			if(dataSide === that.SIDE_SITH)
			{
				that.commandAI["personage1"] = that.planets["Coruscant"].bluePersonage1;
                                                                        that.personages[that.planets["Coruscant"].bluePersonage1].status = that.AI_PERSONAGE_AVAILABLE;
				that.commandAI["personage2"] = that.planets["Coruscant"].bluePersonage2;
                                                                        that.personages[that.planets["Coruscant"].bluePersonage2].status = that.AI_PERSONAGE_AVAILABLE;
				that.commandAI["personage3"] = that.planets["Coruscant"].bluePersonage3;
                                                                        that.personages[that.planets["Coruscant"].bluePersonage3].status = that.AI_PERSONAGE_AVAILABLE;
			}
		},
		
		randomIndex: function()
		{
			var indexRandom = Math.random() / 0.1;
			var index = Math.round(indexRandom);
			return index;
		},
		
		randomCharacteristic: function(valueArray)
		{
			var index = that.randomIndex();
			if (index >= 0 && index <= 3) return valueArray[0];
			if (index >= 4 && index <= 7) return valueArray[1];
			if (index >= 8 && index <= 10) return valueArray[2];
		},
		
		initLevels: function()
		{
			var index1 = 0;
			var index2 = 0;
			var planets = ["Coruscant", "Totooine", "Naboo", "Endor", "Hoth", "Mustafar", "Dagobah", "Bespin", "Geonosis", "Alderaan", "Kamino", "DeathStar", "Utapau", "Saleucami", "Jakku"];
    
			var levelsJson = new Object();
			for(var key in fieldLevelsJson)
			{
			   levelsJson[key] = fieldLevelsJson[key];
			}
		   
			that.levels = new Object();
			for(var i in planets)
			{
				do{
					index1 = that.randomIndex();
					if(index1 < 5) index1 = 1;
					else index1 = 2;
					index2 = that.randomIndex();
				} while(levelsJson["level_" + index1 + "_" + index2] === undefined)
				
				that.levels[planets[i]] = fieldLevelsJson["level_" + index1 + "_" + index2];
				delete levelsJson["level_" + index1 + "_" + index2];
			}
		},
		
		initCharacteristics: function()
		{
			    var characteristicsUser = new Object();
				characteristicsUser["planet-1"] = [3,4,4];
				characteristicsUser["planet-2"] = [2,2,5];
				characteristicsUser["planet-3"] = [2,3,6];
				characteristicsUser["planet-4"] = [3,3,7];
				characteristicsUser["planet-5"] = [3,4,8];
				characteristicsUser["planet-6"] = [4,4,9];
				characteristicsUser["planet-7"] = [4,5,10];
				characteristicsUser["planet-8"] = [5,5,11];
				characteristicsUser["planet-9"] = [5,6,12];
				characteristicsUser["planet-10"] = [6,6,13];
				characteristicsUser["planet-11"] = [6,7,14];
				characteristicsUser["planet-12"] = [7,7,15];
				characteristicsUser["planet-13"] = [7,8,16];    
				characteristicsUser["planet-14"] = [8,8,17];
				characteristicsUser["planet-15"] = [8,9,18]; 
				
				var characteristicsAI = new Object();
                                characteristicsAI["planet-1"] = [3,4,4];
				characteristicsAI["planet-2"] = [2,2,5];
				characteristicsAI["planet-3"] = [2,3,6];
				characteristicsAI["planet-4"] = [3,3,7];
				characteristicsAI["planet-5"] = [3,4,8];
				characteristicsAI["planet-6"] = [4,4,9];
				characteristicsAI["planet-7"] = [4,5,10];
				characteristicsAI["planet-8"] = [5,5,11];
				characteristicsAI["planet-9"] = [5,6,12];
				characteristicsAI["planet-10"] = [6,6,13];
				characteristicsAI["planet-11"] = [6,7,14];
				characteristicsAI["planet-12"] = [7,7,15];
				characteristicsAI["planet-13"] = [7,8,16];    
				characteristicsAI["planet-14"] = [8,8,17];
				characteristicsAI["planet-15"] = [8,9,18]; 
                                
				if(dataSide === that.SIDE_JEDI)
				{
					for(var key in that.planets)
					{
						var bluePersonage = [];
						var blueRewardPersonage = [];
						var redPersonage = [];
						var redRewardPersonage = [];
						
						if(key === "Coruscant")
						{
							bluePersonage = characteristicsUser["planet-15"];       // моя защита от ИИ
							blueRewardPersonage = characteristicsUser["planet-1"];  // моя команда
							
							redPersonage = characteristicsAI["planet-1"];           // не имеет значения
							redRewardPersonage = characteristicsAI["planet-15"];    // союзники ИИ
						}else{
							if(key === "DeathStar")
							{
								bluePersonage = characteristicsUser["planet-1"];        // не имеет значения
								blueRewardPersonage = characteristicsUser["planet-15"]; // мои соющники

								redPersonage = characteristicsAI["planet-15"];          // защита ИИ от меня
								redRewardPersonage = characteristicsAI["planet-1"];     // не имеет значения

								delete characteristicsUser["planet-1"];
								delete characteristicsUser["planet-15"];
								delete characteristicsAI["planet-1"];
								delete characteristicsAI["planet-15"];
							}else{
								var count = Object.keys(characteristicsUser).length;
								var index;
								var resultUser;
								var resultAI;

								index = that.randomIndex();
								if(index > count) resultUser = index - count;
								else resultUser = count - index;
								if(resultUser >= count) resultUser = 0;
								
								index = that.randomIndex();
								if(index > count) resultAI = index - count;
								else resultAI = count - index;
								if(resultAI >= count) resultAI = 0;

								bluePersonage = characteristicsUser[Object.keys(characteristicsUser)[resultUser]];	// моя защита
								redPersonage = characteristicsAI[Object.keys(characteristicsAI)[resultAI]];	// защита ИИ
								
								blueRewardPersonage = characteristicsAI[Object.keys(characteristicsAI)[resultAI]]; 	// мои соющники = защита ИИ
								redRewardPersonage = characteristicsUser[Object.keys(characteristicsUser)[resultUser]];		// союзники ИИ = моя защита
								
								delete characteristicsUser[Object.keys(characteristicsUser)[resultUser]];
								delete characteristicsAI[Object.keys(characteristicsAI)[resultAI]];
							}
						}
						
						that.personages[that.planets[key].bluePersonage1].hitAttack1 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack2 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack3 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack4 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack5 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack1 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack2 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack3 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack4 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack5 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack1 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack2 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack3 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack4 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack5 = that.randomCharacteristic(bluePersonage);
						
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense1 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense2 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense3 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense4 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense5 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense1 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense2 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense3 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense4 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense5 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense1 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense2 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense3 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense4 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense5 = that.randomCharacteristic(blueRewardPersonage);
						
						that.personages[that.planets[key].redPersonage1].hitAttack1 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack2 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack3 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack4 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack5 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack1 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack2 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack3 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack4 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack5 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack1 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack2 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack3 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack4 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack5 = that.randomCharacteristic(redPersonage);
						
						that.personages[that.planets[key].redRewardPersonage1].hitDefense1 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense2 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense3 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense4 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense5 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense1 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense2 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense3 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense4 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense5 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense1 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense2 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense3 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense4 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense5 = that.randomCharacteristic(redRewardPersonage);
						
					}
				}
				if(dataSide === that.SIDE_SITH)
				{
					for(var key in that.planets)
					{
						var redPersonage = [];
						var redRewardPersonage = [];
						var bluePersonage = [];
						var blueRewardPersonage = [];

						if(key === "DeathStar")
						{
							redPersonage = characteristicsUser["planet-15"];           // моя защита
							redRewardPersonage = characteristicsUser["planet-1"];    // моя команда
							
							bluePersonage = characteristicsAI["planet-1"];       // не имеет значения
							blueRewardPersonage = characteristicsAI["planet-15"];  // союзники ИИ

							delete characteristicsUser["planet-1"];
							delete characteristicsUser["planet-15"];
							delete characteristicsAI["planet-1"];
							delete characteristicsAI["planet-15"];
						}else{
							if(key === "Coruscant")
							{
								redPersonage = characteristicsUser["planet-1"];          // не имеет значения
								redRewardPersonage = characteristicsUser["planet-15"];     // мои соющники

								bluePersonage = characteristicsAI["planet-15"];          // защита ИИ
								blueRewardPersonage = characteristicsAI["planet-1"];     // не имеет значения
							}else{
								var count = Object.keys(characteristicsUser).length;
								var index;
								var resultUser;
								var resultAI;

								index = that.randomIndex();
								if(index > count) resultUser = index - count;
								else resultUser = count - index;
								if(resultUser >= count) resultUser = 0;
								
								index = that.randomIndex();
								if(index > count) resultAI = index - count;
								else resultAI = count - index;
								if(resultAI >= count) resultAI = 0;

								redPersonage = characteristicsUser[Object.keys(characteristicsUser)[resultUser]];	// моя защита
								bluePersonage = characteristicsAI[Object.keys(characteristicsAI)[resultAI]];	// защита ИИ
								
								redRewardPersonage = characteristicsAI[Object.keys(characteristicsAI)[resultAI]]; 	// мои соющники = защита ИИ
								blueRewardPersonage = characteristicsUser[Object.keys(characteristicsUser)[resultUser]];		// союзники ИИ = моя защита
								
								delete characteristicsUser[Object.keys(characteristicsUser)[resultUser]];
								delete characteristicsAI[Object.keys(characteristicsAI)[resultAI]];
							}
						}
						
						that.personages[that.planets[key].bluePersonage1].hitAttack1 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack2 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack3 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack4 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack5 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack1 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack2 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack3 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack4 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack5 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack1 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack2 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack3 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack4 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack5 = that.randomCharacteristic(bluePersonage);
						
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense1 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense2 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense3 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense4 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense5 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense1 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense2 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense3 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense4 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense5 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense1 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense2 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense3 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense4 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense5 = that.randomCharacteristic(blueRewardPersonage);
						
						that.personages[that.planets[key].redPersonage1].hitAttack1 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack2 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack3 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack4 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack5 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack1 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack2 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack3 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack4 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack5 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack1 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack2 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack3 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack4 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack5 = that.randomCharacteristic(redPersonage);
						
						that.personages[that.planets[key].redRewardPersonage1].hitDefense1 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense2 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense3 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense4 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense5 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense1 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense2 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense3 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense4 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense5 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense1 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense2 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense3 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense4 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense5 = that.randomCharacteristic(redRewardPersonage);
					   
					}
				}
		},
                
                initGame: function()
		{
			that.initMap();
			that.initMessage();
			that.initPersonages();
			that.initPlanets();
			that.initCommandUser();
			that.initCommandAI();
			that.initLevels();
			that.initCharacteristics();
			
			that.userExperiencePoints = 0;					// Очки опыта
			that.userTotalPointsPlayerTournament = 0;	// Общие очки игрока за всю игру
			that.userlTotalPointsPlayerLevel = 0;          // Общие очки игрока за уровен
			that.userExperiencePointsAI = 0; 				// Очки опыта ИИ
			that.userTotalBattle = 0;                        	// Общее количество проведённых битв (связь с сообщениями R2D2)
		},
                
                aiGetPersonageInCommand: function(aiSide, aiPersonageIgore) // поиск доступного персонажа в команду ИИ (map.js)
                {
                    var persID = "";
                    var persPower = 0;
                    for(var planetID in that.planets) // просматриваем 15 планет
                    {
                        if(aiSide === that.SIDE_JEDI) //  если ИИ джедай
                        {
                            if(that.planets[planetID].status === that.USER_PLANET_QUEST_COMPLETE_JEDI) //  если планета имеет статус джедаев
                            {
                                var hitCountAI = 0; //  показатель силы персонажа
                                
                                //  если персонаж 1 выбран и он не должен быть проигнорирован
                                if(that.personages[that.planets[planetID].blueRewardPersonage1].status  ===  that.AI_PERSONAGE_AVAILABLE 
                                        && that.personages[that.planets[planetID].blueRewardPersonage1].id !== "luke_skywalker" 
                                        && that.personages[that.planets[planetID].blueRewardPersonage1].id !== aiPersonageIgore) 
                                {
                                    hitCountAI += that.personages[that.planets[planetID].blueRewardPersonage1].hitDefense1
                                        + that.personages[that.planets[planetID].blueRewardPersonage1].hitDefense2
                                        + that.personages[that.planets[planetID].blueRewardPersonage1].hitDefense3
                                        + that.personages[that.planets[planetID].blueRewardPersonage1].hitDefense4
                                        + that.personages[that.planets[planetID].blueRewardPersonage1].hitDefense5;
                                    hitCountAI /= 10;
                                    if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                                    {
                                        persID = that.planets[planetID].blueRewardPersonage1;
                                        persPower = hitCountAI;
                                    }
                                }
                                
                                hitCountAI = 0;
                                
                                //  если персонаж 2 выбран и он не должен быть проигнорирован
                                if(that.personages[that.planets[planetID].blueRewardPersonage2].status  ===  that.AI_PERSONAGE_AVAILABLE 
                                        && that.personages[that.planets[planetID].blueRewardPersonage2].id !== "luke_skywalker" 
                                        && that.personages[that.planets[planetID].blueRewardPersonage2].id !== aiPersonageIgore) 
                                {
                                    hitCountAI += that.personages[that.planets[planetID].blueRewardPersonage2].hitDefense1
                                        + that.personages[that.planets[planetID].blueRewardPersonage2].hitDefense2
                                        + that.personages[that.planets[planetID].blueRewardPersonage2].hitDefense3
                                        + that.personages[that.planets[planetID].blueRewardPersonage2].hitDefense4
                                        + that.personages[that.planets[planetID].blueRewardPersonage2].hitDefense5;
                                    hitCountAI /= 10;
                                    if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                                    {
                                        persID = that.planets[planetID].blueRewardPersonage2;
                                        persPower = hitCountAI;
                                    }
                                }
                                
                                hitCountAI = 0;
                                
                                //  если персонаж 3 выбран и он не должен быть проигнорирован
                                if(that.personages[that.planets[planetID].blueRewardPersonage3].status  ===  that.AI_PERSONAGE_AVAILABLE 
                                        && that.personages[that.planets[planetID].blueRewardPersonage3].id !== "luke_skywalker" 
                                        && that.personages[that.planets[planetID].blueRewardPersonage3].id !== aiPersonageIgore) 
                                {
                                    hitCountAI += that.personages[that.planets[planetID].blueRewardPersonage3].hitDefense1
                                        + that.personages[that.planets[planetID].blueRewardPersonage3].hitDefense2
                                        + that.personages[that.planets[planetID].blueRewardPersonage3].hitDefense3
                                        + that.personages[that.planets[planetID].blueRewardPersonage3].hitDefense4
                                        + that.personages[that.planets[planetID].blueRewardPersonage3].hitDefense5;
                                    hitCountAI /= 10;
                                    if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                                    {
                                        persID = that.planets[planetID].blueRewardPersonage3;
                                        persPower = hitCountAI;
                                    }
                                }
                            }
                        }
                        
                        if(aiSide === that.SIDE_SITH) // если ИИ ситхи
                        {
                            if(that.planets[planetID].status === that.USER_PLANET_QUEST_COMPLETE_SITH)
                            {
                                var hitCountAI = 0; //  показатель силы персонажа
                                
                                //  если персонаж 1 выбран и он не должен быть проигнорирован
                                if(that.personages[that.planets[planetID].redRewardPersonage1].status  ===  that.AI_PERSONAGE_AVAILABLE 
                                        && that.personages[that.planets[planetID].redRewardPersonage1].id !== "darth_vader" 
                                        && that.personages[that.planets[planetID].redRewardPersonage1].id !== aiPersonageIgore) 
                                {
                                    hitCountAI += that.personages[that.planets[planetID].redRewardPersonage1].hitDefense1
                                        + that.personages[that.planets[planetID].redRewardPersonage1].hitDefense2
                                        + that.personages[that.planets[planetID].redRewardPersonage1].hitDefense3
                                        + that.personages[that.planets[planetID].redRewardPersonage1].hitDefense4
                                        + that.personages[that.planets[planetID].redRewardPersonage1].hitDefense5;
                                    hitCountAI /= 10;
                                    if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                                    {
                                        persID = that.planets[planetID].redRewardPersonage1;
                                        persPower = hitCountAI;
                                    }
                                }
                                
                                hitCountAI = 0; //  показатель силы персонажа
                                
                                //  если персонаж 2 выбран и он не должен быть проигнорирован
                                if(that.personages[that.planets[planetID].redRewardPersonage2].status  ===  that.AI_PERSONAGE_AVAILABLE 
                                        && that.personages[that.planets[planetID].redRewardPersonage2].id !== "darth_vader" 
                                        && that.personages[that.planets[planetID].redRewardPersonage2].id !== aiPersonageIgore) 
                                {
                                    hitCountAI += that.personages[that.planets[planetID].redRewardPersonage2].hitDefense1
                                        + that.personages[that.planets[planetID].redRewardPersonage2].hitDefense2
                                        + that.personages[that.planets[planetID].redRewardPersonage2].hitDefense3
                                        + that.personages[that.planets[planetID].redRewardPersonage2].hitDefense4
                                        + that.personages[that.planets[planetID].redRewardPersonage2].hitDefense5;
                                    hitCountAI /= 10;
                                    if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                                    {
                                        persID = that.planets[planetID].redRewardPersonage2;
                                        persPower = hitCountAI;
                                    }
                                }
                                
                                hitCountAI = 0; //  показатель силы персонажа
                                
                                //  если персонаж 3 выбран и он не должен быть проигнорирован
                                if(that.personages[that.planets[planetID].redRewardPersonage3].status  ===  that.AI_PERSONAGE_AVAILABLE 
                                        && that.personages[that.planets[planetID].redRewardPersonage3].id !== "darth_vader" 
                                        && that.personages[that.planets[planetID].redRewardPersonage3].id !== aiPersonageIgore) 
                                {
                                    hitCountAI += that.personages[that.planets[planetID].redRewardPersonage3].hitDefense1
                                        + that.personages[that.planets[planetID].redRewardPersonage3].hitDefense2
                                        + that.personages[that.planets[planetID].redRewardPersonage3].hitDefense3
                                        + that.personages[that.planets[planetID].redRewardPersonage3].hitDefense4
                                        + that.personages[that.planets[planetID].redRewardPersonage3].hitDefense5;
                                    hitCountAI /= 10;
                                    if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                                    {
                                        persID = that.planets[planetID].redRewardPersonage3;
                                        persPower = hitCountAI;
                                    }
                                }
                            }
                        }
                    }
                    return persID; // возвращаем идентификатор самого сильного персонажа
                },
                
                aiUpgradeCommand: function(aiSide, aiPlanetID) // обновление команды ИИ (распределение очков опыта, поиск лучшего бойца из списка доступных) (victory.js, lost.js)
                {
                    // Выбираем персонажа на завоёванной планеты
                    if(aiSide === that.SIDE_JEDI) //  если ИИ джедай
                    {
                        var persID = "";
                        var persPower = 0;
                        var hitCountAI = 0; //  показатель силы персонажа
                                
                        //  если персонаж 1 не выбран ранее
                        if(that.personages[that.planets[aiPlanetID].blueRewardPersonage1].status  !==  that.AI_PERSONAGE_AVAILABLE)
                        {
                            hitCountAI += that.personages[that.planets[aiPlanetID].blueRewardPersonage1].hitDefense1
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage1].hitDefense2
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage1].hitDefense3
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage1].hitDefense4
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage1].hitDefense5;
                            hitCountAI /= 10;
                            if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                            {
                                persID = that.planets[aiPlanetID].blueRewardPersonage1;
                                persPower = hitCountAI;
                            }
                        }
                        hitCountAI = 0;
                        //  если персонаж 2 не выбран ранее
                        if(that.personages[that.planets[aiPlanetID].blueRewardPersonage2].status  !==  that.AI_PERSONAGE_AVAILABLE)
                        {
                            hitCountAI += that.personages[that.planets[aiPlanetID].blueRewardPersonage2].hitDefense1
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage2].hitDefense2
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage2].hitDefense3
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage2].hitDefense4
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage2].hitDefense5;
                            hitCountAI /= 10;
                            if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                            {
                                persID = that.planets[aiPlanetID].blueRewardPersonage2;
                                persPower = hitCountAI;
                            }
                        }
                        hitCountAI = 0;
                        //  если персонаж 3 не выбран ранее
                        if(that.personages[that.planets[aiPlanetID].blueRewardPersonage3].status  !==  that.AI_PERSONAGE_AVAILABLE)
                        {
                            hitCountAI += that.personages[that.planets[aiPlanetID].blueRewardPersonage3].hitDefense1
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage3].hitDefense2
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage3].hitDefense3
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage3].hitDefense4
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage3].hitDefense5;
                            hitCountAI /= 10;
                            if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                            {
                                persID = that.planets[aiPlanetID].blueRewardPersonage3;
                                persPower = hitCountAI;
                            }
                        }
                        hitCountAI = 0;
                        // присваиваем персонажу статус "выбран"
                        if(persID !== "" && persPower !== 0) that.personages[persID].status = that.AI_PERSONAGE_AVAILABLE;
                    }
                    
                    if(aiSide === that.SIDE_SITH) // если ИИ ситхи
                    {
                        var persID = "";
                        var persPower = 0;
                        var hitCountAI = 0; //  показатель силы персонажа
                                
                        //  если персонаж 1 не выбран ранее
                        if(that.personages[that.planets[aiPlanetID].redRewardPersonage1].status  !==  that.AI_PERSONAGE_AVAILABLE)
                        {
                            hitCountAI += that.personages[that.planets[aiPlanetID].redRewardPersonage1].hitDefense1
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage1].hitDefense2
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage1].hitDefense3
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage1].hitDefense4
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage1].hitDefense5;
                            hitCountAI /= 10;
                            if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                            {
                                persID = that.planets[aiPlanetID].redRewardPersonage1;
                                persPower = hitCountAI;
                            }
                        }
                        hitCountAI = 0;
                        //  если персонаж 2 не выбран ранее
                        if(that.personages[that.planets[aiPlanetID].redRewardPersonage2].status  !==  that.AI_PERSONAGE_AVAILABLE)
                        {
                            hitCountAI += that.personages[that.planets[aiPlanetID].redRewardPersonage2].hitDefense1
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage2].hitDefense2
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage2].hitDefense3
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage2].hitDefense4
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage2].hitDefense5;
                            hitCountAI /= 10;
                            if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                            {
                                persID = that.planets[aiPlanetID].redRewardPersonage2;
                                persPower = hitCountAI;
                            }
                        }
                        hitCountAI = 0;
                        //  если персонаж 3 не выбран ранее
                        if(that.personages[that.planets[aiPlanetID].redRewardPersonage3].status  !==  that.AI_PERSONAGE_AVAILABLE)
                        {
                            hitCountAI += that.personages[that.planets[aiPlanetID].redRewardPersonage3].hitDefense1
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage3].hitDefense2
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage3].hitDefense3
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage3].hitDefense4
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage3].hitDefense5;
                            hitCountAI /= 10;
                            if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                            {
                                persID = that.planets[aiPlanetID].redRewardPersonage3;
                                persPower = hitCountAI;
                            }
                        }
                        hitCountAI = 0;
                        // присваиваем персонажу статус "выбран"
                        if(persID !== "" && persPower !== 0) that.personages[persID].status = that.AI_PERSONAGE_AVAILABLE;
                    }
                    
                    // Распределяем очки опыта на главном персонаже
                    if(aiSide === that.SIDE_JEDI)
                    {
                        for(var i = 0; i < that.userExperiencePointsAI; i++)
                        {
                            var index = that.randomIndex();
                            if(index >= 0 && index < 2) that.personages["luke_skywalker"].hitDefense1++;
                            if(index >= 2 && index < 4) that.personages["luke_skywalker"].hitDefense2++;
                            if(index >= 4 && index < 6) that.personages["luke_skywalker"].hitDefense3++;
                            if(index >= 6 && index < 8) that.personages["luke_skywalker"].hitDefense4++;
                            if(index >= 8 && index <= 10) that.personages["luke_skywalker"].hitDefense5++;
                        }
                        that.userExperiencePointsAI = 0;
                    }
                    
                    if(aiSide === that.SIDE_SITH)
                    {
                        for(var i = 0; i < that.userExperiencePointsAI; i++)
                        {
                            var index = that.randomIndex();
                            if(index >= 0 && index < 2) that.personages["darth_vader"].hitDefense1++;
                            if(index >= 2 && index < 4) that.personages["darth_vader"].hitDefense2++;
                            if(index >= 4 && index < 6) that.personages["darth_vader"].hitDefense3++;
                            if(index >= 6 && index < 8) that.personages["darth_vader"].hitDefense4++;
                            if(index >= 8 && index <= 10) that.personages["darth_vader"].hitDefense5++;
                        }
                        that.userExperiencePointsAI = 0;
                    }
                    
                    // Проверяем доступность персонажей в команде ИИ
                    for(var key in that.commandAI)
                    {
                        for(var planetID in that.planets)
                        {
                            if( (aiSide === that.SIDE_SITH)
                            && (that.planets[planetID].redRewardPersonage1 === that.commandAI[key] || that.planets[planetID].redRewardPersonage2 === that.commandAI[key] || that.planets[planetID].redRewardPersonage3 === that.commandAI[key]) 
                            && (that.planets[planetID].status === that.USER_PLANET_QUEST_COMPLETE_JEDI)) 
                            {
                                that.personages[that.commandAI[key]].status = that.USER_PERSONAGE_NOT_AVAILABLE;
                            }
                            if( (aiSide === that.SIDE_JEDI)
                            && (that.planets[planetID].blueRewardPersonage1 === that.commandAI[key] || that.planets[planetID].blueRewardPersonage2 === that.commandAI[key] || that.planets[planetID].blueRewardPersonage3 === that.commandAI[key]) 
                            && (that.planets[planetID].status === that.USER_PLANET_QUEST_AWAITING || that.planets[planetID].status === that.USER_PLANET_QUEST_COMPLETE_SITH)) 
                            {
                                that.personages[that.commandAI[key]].status = that.USER_PERSONAGE_NOT_AVAILABLE;
                            }
                        }
                    }
                    
                    // Обновляем список персонажей в команде
                    if(aiSide === that.SIDE_JEDI)
                    {
                        for(var key in that.commandAI)
			{
                            if(key === "personage2") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_JEDI, that.commandAI["personage3"]);
                            if(key === "personage3") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_JEDI, that.commandAI["personage2"]);
                        }
                    }
                    
                    if(aiSide === that.SIDE_SITH)
                    {
                        for(var key in that.commandAI)
			{
                            if(key === "personage2") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_SITH, that.commandAI["personage3"]);
                            if(key === "personage3") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_SITH, that.commandAI["personage2"]);
                        }
                    }
                },
                
                aiRemovePersonageCommand: function(aiSide)
                {
                    // Проверяем доступность персонажей в команде ИИ
                    for(var key in that.commandAI)
                    {
                        for(var planetID in that.planets)
                        {
                            if( (aiSide === that.SIDE_SITH)
                            && (that.planets[planetID].redRewardPersonage1 === that.commandAI[key] || that.planets[planetID].redRewardPersonage2 === that.commandAI[key] || that.planets[planetID].redRewardPersonage3 === that.commandAI[key]) 
                            && (that.planets[planetID].status === that.USER_PLANET_QUEST_COMPLETE_JEDI)) 
                            {
                                that.personages[that.commandAI[key]].status = that.USER_PERSONAGE_NOT_AVAILABLE;
                            }
                            if( (aiSide === that.SIDE_JEDI)
                            && (that.planets[planetID].blueRewardPersonage1 === that.commandAI[key] || that.planets[planetID].blueRewardPersonage2 === that.commandAI[key] || that.planets[planetID].blueRewardPersonage3 === that.commandAI[key]) 
                            && (that.planets[planetID].status === that.USER_PLANET_QUEST_AWAITING || that.planets[planetID].status === that.USER_PLANET_QUEST_COMPLETE_SITH)) 
                            {
                                that.personages[that.commandAI[key]].status = that.USER_PERSONAGE_NOT_AVAILABLE;
                            }
                        }
                    }
                    // Обновляем список персонажей в команде
                    if(aiSide === that.SIDE_JEDI)
                    {
                        for(var key in that.commandAI)
			{
                            if(key === "personage2") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_JEDI, that.commandAI["personage3"]);
                            if(key === "personage3") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_JEDI, that.commandAI["personage2"]);
                        }
                    }
                    
                    if(aiSide === that.SIDE_SITH)
                    {
                        for(var key in that.commandAI)
			{
                            if(key === "personage2") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_SITH, that.commandAI["personage3"]);
                            if(key === "personage3") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_SITH, that.commandAI["personage2"]);
                        }
                    }
                },
                
                aiResultBattle: function() // расчёт результата сражения ИИ (victory.js, lost.js)
                {
                    var index = that.randomIndex();
                    if(index >= 0 && index < 7) return true; // ИИ победил
                    else return false; // ИИ проиграл
                }
		
	};
	return that;
};

/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var Level = function(parent)
{
	var that = {
		levelStage: null,
		levelPlanetID: null,
                levelAIPlanetID: null,
		levelStarsSprite: null,
		levelPlanetSprite: null,
		levelLandscapeSprite: null,
		
		levelStatus: null,
		LEVEL_STATUS_BATTLE: "that.LEVEL_STATUS_BATTLE",
		LEVEL_STATUS_END_BATTLE_WIN_USER: "that.LEVEL_STATUS_END_BATTLE_WIN_USER",
		LEVEL_STATUS_END_BATTLE_WIN_AI: "that.LEVEL_STATUS_END_BATTLE_WIN_AI",
		
		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",

		levelStyleButtonBlueText: { font : 'bold 18px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 },
		levelStyleButtonRedText: { font : 'bold 18px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }, 
		levelStyleDroidBlueText: { font : 'bold 14px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 270 },
		levelStyleDroidRedText: { font : 'bold 14px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 270 }, 
		levelStyleButtonsBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 },
		levelStyleButtonsRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }, 

		levelIntercept: false,
		levelCommandUser: [],  // команда пользователя (parent.initialization.commandUser)
		levelCommandAI: [],    // команда ИИ (parent.initialization.commandAI)
		levelIndexUser: 0,     // индекс персонажа в команде пользователя
		levelIndexAI: 0,       // индекс персонажа в команде ИИ
		levelBorderPersonageUser: null,
		levelBorderPersonageAI: null,
		levelPersonageUserSprite: null,
		levelPersonageAISprite: null,
		levelUserHit1Text: null,
		levelUserHit2Text: null,
		levelUserHit3Text: null,
		levelUserHit4Text: null,
		levelUserHit5Text: null,
		levelUserLifeText: null,
		levelUserHit1: null,
		levelUserHit2: null,
		levelUserHit3: null,
		levelUserHit4: null,
		levelUserHit5: null,
		levelUserLife: null,
		levelAIHit1Text: null,
		levelAIHit2Text: null,
		levelAIHit3Text: null,
		levelAIHit4Text: null,
		levelAIHit5Text: null,
		levelAILifeText: null,
		levelAIHit1: null,
		levelAIHit2: null,
		levelAIHit3: null,
		levelAIHit4: null,
		levelAIHit5: null,
		levelAILife: null,

		levelLineUserAnimationGraphics: null,
		levelLineAIAnimationGraphics: null,
		levelMessageLineGraphics: null,
                
                hitLeftText: null,
                hitRightText: null,
		
		levelCreate: function(planetID, intercept, aiPlanetID)
		{
                        parent.initialization.userlTotalPointsPlayerLevel = 0;
                        parent.initialization.userTotalBattle++;
                        
			that.levelStage = new PIXI.Container();
			
			that.levelIntercept = intercept;
			that.levelPlanetID = planetID;
                        that.levelAIPlanetID = aiPlanetID;
			that.levelStatus = that.LEVEL_STATUS_BATTLE;
			that.levelCommandUser = [];
			that.levelCommandAI = [];
			that.levelIndexUser = 0;
			that.levelIndexAI = 0;
			
			that.levelInitCommands(intercept);
			
			that.levelBackground();
			
                        if(parent.config.side === that.SIDE_JEDI)
			{
				that.levelBorderBlue();
				that.levelDesktopBlue();
				that.levelDroidBlue();
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				that.levelBorderRed();
				that.levelDesktopRed();
				that.levelDroidRed();
			}
			that.levelBattons();
			that.levelShowCommandUser();
			that.levelShowCommandAI();
                        that.hitTextCreate();
		},
		
		levelInitCommands: function(intercept)
		{
			if(intercept === true)
			{
				that.levelCommandUser = [];
				for(var key in parent.initialization.commandUser)
				{
					if(parent.initialization.commandUser[key] !== null)
					{
						var life = (parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense1 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense2 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense3 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense4 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense5) / 10 * 50;
						parent.initialization.personages[parent.initialization.commandUser[key]].life = Math.round(life);
						that.levelCommandUser.push(parent.initialization.personages[parent.initialization.commandUser[key]]);
					}
				}
				that.levelUserHit1 = that.levelCommandUser[that.levelIndexUser].hitDefense1;
				that.levelUserHit2 = that.levelCommandUser[that.levelIndexUser].hitDefense2;
				that.levelUserHit3 = that.levelCommandUser[that.levelIndexUser].hitDefense3;
				that.levelUserHit4 = that.levelCommandUser[that.levelIndexUser].hitDefense4;
				that.levelUserHit5 = that.levelCommandUser[that.levelIndexUser].hitDefense5;
				that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;

				that.levelCommandAI = [];
				for(var key in parent.initialization.commandAI)
				{
					if(parent.initialization.commandAI[key] !== null)
					{
						var life = (parent.initialization.personages[parent.initialization.commandAI[key]].hitDefense1 + parent.initialization.personages[parent.initialization.commandAI[key]].hitDefense2 + parent.initialization.personages[parent.initialization.commandAI[key]].hitDefense3 + parent.initialization.personages[parent.initialization.commandAI[key]].hitDefense4 + parent.initialization.personages[parent.initialization.commandAI[key]].hitDefense5) / 10 * 50;
						parent.initialization.personages[parent.initialization.commandAI[key]].life = Math.round(life);
						that.levelCommandAI.push(parent.initialization.personages[parent.initialization.commandAI[key]]);
					}
				}
				
				that.levelAIHit1 = that.levelCommandAI[that.levelIndexAI].hitDefense1;
				that.levelAIHit2 = that.levelCommandAI[that.levelIndexAI].hitDefense2;
				that.levelAIHit3 = that.levelCommandAI[that.levelIndexAI].hitDefense3;
				that.levelAIHit4 = that.levelCommandAI[that.levelIndexAI].hitDefense4;
				that.levelAIHit5 = that.levelCommandAI[that.levelIndexAI].hitDefense5;
				that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
				
			}else{
				that.levelCommandUser = [];
				for(var key in parent.initialization.commandUser)
				{
					if(parent.initialization.commandUser[key] !== null)
					{
						var life = (parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense1 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense2 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense3 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense4 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense5) / 10 * 50;
						parent.initialization.personages[parent.initialization.commandUser[key]].life = Math.round(life);
						that.levelCommandUser.push(parent.initialization.personages[parent.initialization.commandUser[key]]);
					}
				}
				that.levelUserHit1 = that.levelCommandUser[that.levelIndexUser].hitDefense1;
				that.levelUserHit2 = that.levelCommandUser[that.levelIndexUser].hitDefense2;
				that.levelUserHit3 = that.levelCommandUser[that.levelIndexUser].hitDefense3;
				that.levelUserHit4 = that.levelCommandUser[that.levelIndexUser].hitDefense4;
				that.levelUserHit5 = that.levelCommandUser[that.levelIndexUser].hitDefense5;
				that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;
				
				if(parent.config.side === that.SIDE_JEDI)
				{
					that.levelCommandAI = [];
					var life = (parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage1].hitAttack1 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage1].hitAttack2 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage1].hitAttack3 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage1].hitAttack4 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage1].hitAttack5) / 10 * 50;
					parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage1].life = Math.round(life);
					that.levelCommandAI.push(parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage1]);
					
					life = (parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage2].hitAttack1 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage2].hitAttack2 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage2].hitAttack3 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage2].hitAttack4 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage2].hitAttack5) / 10 * 50;
					parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage2].life = Math.round(life);
					that.levelCommandAI.push(parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage2]);
					
					life = (parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage3].hitAttack1 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage3].hitAttack2 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage3].hitAttack3 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage3].hitAttack4 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage3].hitAttack5) / 10 * 50;
					parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage3].life = Math.round(life);
					that.levelCommandAI.push(parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage3]);
				}
				if(parent.config.side === that.SIDE_SITH)
				{
					that.levelCommandAI = [];
					var life = (parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage1].hitAttack1 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage1].hitAttack2 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage1].hitAttack3 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage1].hitAttack4 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage1].hitAttack5) / 10 * 50;
					parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage1].life = Math.round(life);
					that.levelCommandAI.push(parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage1]);
					
					life = (parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage2].hitAttack1 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage2].hitAttack2 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage2].hitAttack3 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage2].hitAttack4 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage2].hitAttack5) / 10 * 50;
					parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage2].life = Math.round(life);
					that.levelCommandAI.push(parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage2]);
					
					life = (parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage3].hitAttack1 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage3].hitAttack2 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage3].hitAttack3 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage3].hitAttack4 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage3].hitAttack5) / 10 * 50;
					parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage3].life = Math.round(life);
					that.levelCommandAI.push(parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage3]);
				}
				
				that.levelAIHit1 = that.levelCommandAI[that.levelIndexAI].hitAttack1;
				that.levelAIHit2 = that.levelCommandAI[that.levelIndexAI].hitAttack2;
				that.levelAIHit3 = that.levelCommandAI[that.levelIndexAI].hitAttack3;
				that.levelAIHit4 = that.levelCommandAI[that.levelIndexAI].hitAttack4;
				that.levelAIHit5 = that.levelCommandAI[that.levelIndexAI].hitAttack5;
				that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
			}
		},
		
		levelBackground: function(planetID)
		{
			that.levelStarsSprite = new PIXI.Sprite(parent.assets.getAsset("stars1Texture")); 
			that.levelStarsSprite.position.x = 0; 
			that.levelStarsSprite.position.y = 0; 
			that.levelStage.addChild(that.levelStarsSprite);
			  
			that.levelPlanetSprite = new PIXI.Sprite(parent.assets.getAsset("planetTextures")[that.levelPlanetID][1]); 
			that.levelPlanetSprite.position.x = 300; 
			that.levelPlanetSprite.position.y = 100;
			that.levelStage.addChild(that.levelPlanetSprite);
			
			that.levelLandscapeSprite = new PIXI.Sprite(parent.assets.getAsset("planetTextures")[that.levelPlanetID][2]);
			that.levelLandscapeSprite.position.x = 0; 
			that.levelLandscapeSprite.position.y = 0; 
			that.levelLandscapeSprite.alpha = 0.0;
			that.levelStage.addChild(that.levelLandscapeSprite);
		},
		
		levelBorderBlue: function()
		{
			var graphics = new PIXI.Graphics(); 

			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);
			graphics.endFill();
			
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(170, 562,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(170, 562);
			graphics.lineTo(5, 562);
			graphics.moveTo(5, 562);
			graphics.lineTo(5, 725);
			graphics.moveTo(5, 725);
			graphics.lineTo(470, 725);
			graphics.moveTo(470, 725);
			graphics.lineTo(490, 710);
			graphics.moveTo(490, 710);
			graphics.lineTo(840, 710);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(840, 710,4);
			graphics.endFill();

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(20, 20,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(20,20);
			graphics.lineTo(370, 20);
			graphics.moveTo(370, 20);
			graphics.lineTo(390, 5);
			graphics.moveTo(390,5);
			graphics.lineTo(855, 5);
			graphics.moveTo(855,5);
			graphics.lineTo(855, 170);
			graphics.moveTo(855, 170);
			graphics.lineTo(690, 170);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(690, 170,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.beginFill(0x0000FF, 0.0);
			graphics.drawRoundedRect(((parent.config.MAIN_WIDTH / 2) - (500 / 2)), ((parent.config.MAIN_HEIGH / 2) - (500 / 2)), 500, 500, 25);
			graphics.endFill();
			
			that.levelStage.addChild(graphics);
		},
		
		levelBorderRed: function()
		{
			var graphics = new PIXI.Graphics(); 

			graphics.lineStyle(2, 0xFF0000, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);
			graphics.endFill();
			
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(170, 562, 4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(170, 562);
			graphics.lineTo(5, 562);
			graphics.moveTo(5, 562);
			graphics.lineTo(5, 725);
			graphics.moveTo(5, 725);
			graphics.lineTo(470, 725);
			graphics.moveTo(470, 725);
			graphics.lineTo(490, 710);
			graphics.moveTo(490, 710);
			graphics.lineTo(840, 710);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(840, 710,4);
			graphics.endFill();

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(20, 20,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(20,20);
			graphics.lineTo(370, 20);
			graphics.moveTo(370, 20);
			graphics.lineTo(390, 5);
			graphics.moveTo(390,5);
			graphics.lineTo(855, 5);
			graphics.moveTo(855,5);
			graphics.lineTo(855, 170);
			graphics.moveTo(855, 170);
			graphics.lineTo(690, 170);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(690, 170,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.beginFill(0xFF0000, 0.0);
			graphics.drawRoundedRect(((parent.config.MAIN_WIDTH / 2) - (500 / 2)), ((parent.config.MAIN_HEIGH / 2) - (500 / 2)), 500, 500, 25);
			graphics.endFill();
			
			that.levelStage.addChild(graphics);
		},
		
		levelDesktopBlue: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x0080FF, 0.2);
			graphics.moveTo(25, 22);
			graphics.lineTo(370, 22);
			graphics.lineTo(370, 110);
			graphics.lineTo(25, 110);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x800000, 1);
			graphics.beginFill(0x800000, 0.2);
			graphics.moveTo(490, 620);
			graphics.lineTo(835, 620);
			graphics.lineTo(835, 708);
			graphics.lineTo(490, 708);
			graphics.endFill();
			that.levelStage.addChild(graphics);
		},
		
		levelDesktopRed: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x800000, 1);
			graphics.beginFill(0x800000, 0.2);
			graphics.moveTo(25, 22);
			graphics.lineTo(370, 22);
			graphics.lineTo(370, 110);
			graphics.lineTo(25, 110);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x0080FF, 0.2);
			graphics.moveTo(490, 620);
			graphics.lineTo(835, 620);
			graphics.lineTo(835, 708);
			graphics.lineTo(490, 708);
			graphics.endFill();
			that.levelStage.addChild(graphics);
		},
		
		levelShowCommandUser: function()
		{
			/* персонажи */
			for(var i in that.levelCommandUser)
			{
				var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[that.levelCommandUser[i].id][3]); 
				textureSprite.position.x = 55 + (105 * i); 
				textureSprite.position.y = 30; 
				that.levelStage.addChild(textureSprite);
				
				var graphics = new PIXI.Graphics();
				if(parent.config.side === that.SIDE_JEDI) graphics.lineStyle(2, 0x0000FF, 0.2);
				if(parent.config.side === that.SIDE_SITH) graphics.lineStyle(2, 0xFF0000, 0.2);
				graphics.drawRect(55 + (105 * i), 30, 75, 75);
				
				for(var j = 0; j < 25; j++)
				{
					if(parent.config.side === that.SIDE_JEDI) graphics.lineStyle(1, 0x0000FF, 0.2);
					if(parent.config.side === that.SIDE_SITH) graphics.lineStyle(1, 0xFF0000, 0.2);
					graphics.moveTo(55 + (105 * i), 30 +(3*j));
					graphics.lineTo(55 + (105 * i) + 75, 30 +(3*j));
					
				}
				that.levelStage.addChild(graphics);
			}
			
			/* рамка */
			that.levelBorderPersonageUser = new PIXI.Graphics();
			if(parent.config.side === that.SIDE_JEDI) that.levelBorderPersonageUser.lineStyle(2, 0xFFFFFF, 1);
			if(parent.config.side === that.SIDE_SITH) that.levelBorderPersonageUser.lineStyle(2, 0xFFFF80, 1);
			that.levelBorderPersonageUser.drawRect(55, 30, 75, 75);
			that.levelStage.addChild(that.levelBorderPersonageUser);
			
			/* дисплей фон */
			var graphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_JEDI)
			{
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0080FF, 0.2);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
			}
			graphics.moveTo(25, 115);
			graphics.lineTo(170, 115);
			graphics.lineTo(170, 400);
			graphics.lineTo(25, 400);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			/* персонаж во весь рост */
			that.levelPersonageUserSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[that.levelCommandUser[that.levelIndexUser].id][1]); 
			that.levelPersonageUserSprite.position.x = 30; 
			that.levelPersonageUserSprite.position.y = 140; 
			that.levelPersonageUserSprite.scale.set(0.5);
			that.levelStage.addChild(that.levelPersonageUserSprite);
			
			/* фон полоски */
			graphics = new PIXI.Graphics();
			for(var i = 0; i < 95; i++)
			{
				if(parent.config.side === that.SIDE_JEDI) graphics.lineStyle(1, 0x0000FF, 0.5);
				if(parent.config.side === that.SIDE_SITH) graphics.lineStyle(1, 0x800000, 0.5);
				graphics.moveTo(25, 115+(3*i));
				graphics.lineTo(170, 115+(3*i));
			}
			that.levelStage.addChild(graphics);
			
			/* бегущая полоска */
			that.levelLineUserAnimationGraphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_JEDI) that.levelLineUserAnimationGraphics.lineStyle(10, 0x0000FF, 0.3);
			if(parent.config.side === that.SIDE_SITH) that.levelLineUserAnimationGraphics.lineStyle(10, 0x800000, 0.3);
			that.levelLineUserAnimationGraphics.moveTo(25, 120);
			that.levelLineUserAnimationGraphics.lineTo(170, 120);
			that.levelStage.addChild(that.levelLineUserAnimationGraphics);
			
			/* харктеристики */
			graphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_JEDI)
			{
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0080FF, 0.2);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
			}
			graphics.moveTo(25, 405);
			graphics.lineTo(170, 405);
			graphics.lineTo(170, 520);
			graphics.lineTo(25, 520);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			var sprite = new PIXI.Sprite(parent.assets.getAsset("hit1Texture"));
			sprite.position.x = 30; sprite.position.y = 410; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_JEDI) that.levelUserHit1Text = new PIXI.Text("- " + that.levelUserHit1, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_SITH) that.levelUserHit1Text = new PIXI.Text("- " + that.levelUserHit1, that.levelStyleButtonRedText);
			that.levelUserHit1Text.x = 55; that.levelUserHit1Text.y = 410;
			that.levelStage.addChild(that.levelUserHit1Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit2Texture"));
			sprite.position.x = 100; sprite.position.y = 410; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_JEDI) that.levelUserHit2Text = new PIXI.Text("- " + that.levelUserHit2, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_SITH) that.levelUserHit2Text = new PIXI.Text("- " + that.levelUserHit2, that.levelStyleButtonRedText); 
			that.levelUserHit2Text.x = 125; that.levelUserHit2Text.y = 410;
			that.levelStage.addChild(that.levelUserHit2Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit3Texture"));
			sprite.position.x = 30; sprite.position.y = 450; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_JEDI) that.levelUserHit3Text = new PIXI.Text("+ " + that.levelUserHit3, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_SITH) that.levelUserHit3Text = new PIXI.Text("+ " + that.levelUserHit3, that.levelStyleButtonRedText); 
			that.levelUserHit3Text.x = 55; that.levelUserHit3Text.y = 450;
			that.levelStage.addChild(that.levelUserHit3Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit4Texture"));
			sprite.position.x = 100; sprite.position.y = 450; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_JEDI) that.levelUserHit4Text = new PIXI.Text("- " + that.levelUserHit4, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_SITH) that.levelUserHit4Text = new PIXI.Text("- " + that.levelUserHit4, that.levelStyleButtonRedText);
			that.levelUserHit4Text.x = 125; that.levelUserHit4Text.y = 450;
			that.levelStage.addChild(that.levelUserHit4Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit5Texture"));
			sprite.position.x = 30; sprite.position.y = 490; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_JEDI) that.levelUserHit5Text = new PIXI.Text("- " + that.levelUserHit5, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_SITH) that.levelUserHit5Text = new PIXI.Text("- " + that.levelUserHit5, that.levelStyleButtonRedText); 
			that.levelUserHit5Text.x = 55; that.levelUserHit5Text.y = 490;
			that.levelStage.addChild(that.levelUserHit5Text);
			
			graphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_JEDI)
			{
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0080FF, 0.2);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
			}
			graphics.moveTo(25, 525);
			graphics.lineTo(170, 525);
			graphics.lineTo(170, 555);
			graphics.lineTo(25, 555);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			if(parent.config.side === that.SIDE_JEDI) that.levelUserLifeText = new PIXI.Text("Здоровье: " + that.levelUserLife, that.levelStyleButtonBlueText); 
			if(parent.config.side === that.SIDE_SITH) that.levelUserLifeText = new PIXI.Text("Здоровье: " + that.levelUserLife, that.levelStyleButtonRedText); 
			that.levelUserLifeText.x = 27; that.levelUserLifeText.y = 530;
			that.levelStage.addChild(that.levelUserLifeText);
		},
		
		levelShowCommandAI: function()
		{
			/* персонажи */
			for(var i in that.levelCommandAI)
			{
				var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[that.levelCommandAI[i].id][3]); 
				textureSprite.position.x = 520 + (105 * i); 
				textureSprite.position.y = 628; 
				that.levelStage.addChild(textureSprite);
				
				var graphics = new PIXI.Graphics();
				if(parent.config.side === that.SIDE_JEDI) graphics.lineStyle(2, 0xFF0000, 0.2);
				if(parent.config.side === that.SIDE_SITH) graphics.lineStyle(2, 0x0000FF, 0.2);
				graphics.drawRect(520 + (105 * i), 628, 75, 75);
				
				for(var j = 0; j < 25; j++)
				{
					if(parent.config.side === that.SIDE_JEDI) graphics.lineStyle(1, 0xFF0000, 0.2);
					if(parent.config.side === that.SIDE_SITH) graphics.lineStyle(1, 0x0000FF, 0.2);
					graphics.moveTo(520 + (105 * i), 628 +(3*j));
					graphics.lineTo(520 + (105 * i) + 75, 628 +(3*j));
				}
				that.levelStage.addChild(graphics);
			}
			
			/* рамка */
			that.levelBorderPersonageAI = new PIXI.Graphics();
			if(parent.config.side === that.SIDE_JEDI) that.levelBorderPersonageAI.lineStyle(2, 0xFFFF80, 1);
			if(parent.config.side === that.SIDE_SITH) that.levelBorderPersonageAI.lineStyle(2, 0xFFFFFF, 1);
			that.levelBorderPersonageAI.drawRect(520, 628, 75, 75);
			that.levelStage.addChild(that.levelBorderPersonageAI);
			
			/* дисплей фон */
			var graphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_SITH)
			{
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0080FF, 0.2);
			}
			if(parent.config.side === that.SIDE_JEDI)
			{
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
			}
			graphics.moveTo(690, 330);
			graphics.lineTo(835, 330);
			graphics.lineTo(835, 615);
			graphics.lineTo(690, 615);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			/* персонаж во весь рост */
			that.levelPersonageAISprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[that.levelCommandAI[that.levelIndexAI].id][2]); 
			that.levelPersonageAISprite.position.x = 695; 
			that.levelPersonageAISprite.position.y = 350; 
			that.levelPersonageAISprite.scale.set(0.5);
			that.levelStage.addChild(that.levelPersonageAISprite);
			
			/* фон полоски */
			graphics = new PIXI.Graphics();
			for(var i = 0; i < 95; i++)
			{
				if(parent.config.side === that.SIDE_SITH) graphics.lineStyle(1, 0x0000FF, 0.5);
				if(parent.config.side === that.SIDE_JEDI) graphics.lineStyle(1, 0x800000, 0.5);
				graphics.moveTo(690, 330+(3*i));
				graphics.lineTo(835, 330+(3*i));
			}
			that.levelStage.addChild(graphics);
			
			/* бегущая полоска */
			that.levelLineAIAnimationGraphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_SITH) that.levelLineAIAnimationGraphics.lineStyle(10, 0x0000FF, 0.3);
			if(parent.config.side === that.SIDE_JEDI) that.levelLineAIAnimationGraphics.lineStyle(10, 0x800000, 0.3);
			that.levelLineAIAnimationGraphics.moveTo(690, 335);
			that.levelLineAIAnimationGraphics.lineTo(835, 335);
			that.levelStage.addChild(that.levelLineAIAnimationGraphics);
						
			/* харктеристики */
			graphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_SITH)
			{
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0080FF, 0.2);
			}
			if(parent.config.side === that.SIDE_JEDI)
			{
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
			}
			graphics.moveTo(690, 325);
			graphics.lineTo(835, 325);
			graphics.lineTo(835, 210);
			graphics.lineTo(690, 210);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			var sprite = new PIXI.Sprite(parent.assets.getAsset("hit1Texture"));
			sprite.position.x = 695; sprite.position.y = 215; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_SITH) that.levelAIHit1Text = new PIXI.Text("- " + that.levelAIHit1, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_JEDI) that.levelAIHit1Text = new PIXI.Text("- " + that.levelAIHit1, that.levelStyleButtonRedText); 
			that.levelAIHit1Text.x = 720; that.levelAIHit1Text.y = 215;
			that.levelStage.addChild(that.levelAIHit1Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit2Texture"));
			sprite.position.x = 765; sprite.position.y = 215; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_SITH) that.levelAIHit2Text = new PIXI.Text("- " + that.levelAIHit2, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_JEDI) that.levelAIHit2Text = new PIXI.Text("- " + that.levelAIHit2, that.levelStyleButtonRedText);  
			that.levelAIHit2Text.x = 790; that.levelAIHit2Text.y = 215;
			that.levelStage.addChild(that.levelAIHit2Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit3Texture"));
			sprite.position.x = 695; sprite.position.y = 250; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_SITH) that.levelAIHit3Text = new PIXI.Text("+ " + that.levelAIHit3, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_JEDI) that.levelAIHit3Text = new PIXI.Text("+ " + that.levelAIHit3, that.levelStyleButtonRedText);  
			that.levelAIHit3Text.x = 720; that.levelAIHit3Text.y = 250;
			that.levelStage.addChild(that.levelAIHit3Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit4Texture"));
			sprite.position.x = 765; sprite.position.y = 250; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_SITH) that.levelAIHit4Text = new PIXI.Text("- " + that.levelAIHit4, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_JEDI) that.levelAIHit4Text = new PIXI.Text("- " + that.levelAIHit4, that.levelStyleButtonRedText); 
			that.levelAIHit4Text.x = 790; that.levelAIHit4Text.y = 250;
			that.levelStage.addChild(that.levelAIHit4Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit5Texture"));
			sprite.position.x = 695; sprite.position.y = 290; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_SITH) that.levelAIHit5Text = new PIXI.Text("- " + that.levelAIHit5, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_JEDI) that.levelAIHit5Text = new PIXI.Text("- " + that.levelAIHit5, that.levelStyleButtonRedText);  
			that.levelAIHit5Text.x = 720; that.levelAIHit5Text.y = 290;
			that.levelStage.addChild(that.levelAIHit5Text);
			
			graphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_SITH)
			{
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0080FF, 0.2);
			}
			if(parent.config.side === that.SIDE_JEDI)
			{
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
			}
			graphics.moveTo(690, 205);
			graphics.lineTo(835, 205);
			graphics.lineTo(835, 175);
			graphics.lineTo(690, 175);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			if(parent.config.side === that.SIDE_SITH) that.levelAILifeText = new PIXI.Text("Здоровье: " + that.levelAILife, that.levelStyleButtonBlueText); 
			if(parent.config.side === that.SIDE_JEDI) that.levelAILifeText = new PIXI.Text("Здоровье: " + that.levelAILife, that.levelStyleButtonRedText); 
			that.levelAILifeText.x = 692; that.levelAILifeText.y = 180;
			that.levelStage.addChild(that.levelAILifeText);
		},

		levelDroidBlue: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidBlueRightTexture")); 
			textureSprite.position.x = 765; 
			textureSprite.position.y = 50; 
			textureSprite.scale.set(0.3);
			that.levelStage.addChild(textureSprite);
			
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0090F0, 0.2);
			graphics.beginFill(0x0090F0, 0.2);
			graphics.moveTo(795, 65);
			graphics.lineTo(760, 20);
			graphics.lineTo(760, 110);
			graphics.lineTo(795, 65);
			graphics.endFill;
			
			for(var i = 0; i < 31; i++)
			{
				graphics.lineStyle(1, 0x0090F0, 0.2);
				graphics.moveTo(480, 20+(3*i));
				graphics.lineTo(760, 20+(3*i));
			}
			that.levelStage.addChild(graphics);
			
			that.levelMessageLineGraphics = new PIXI.Graphics(); 
			that.levelMessageLineGraphics.lineStyle(10, 0x0090F0, 0.3);
			that.levelMessageLineGraphics.moveTo(480, 25);
			that.levelMessageLineGraphics.lineTo(760, 25);
			that.levelStage.addChild(that.levelMessageLineGraphics);
			
			var text = new PIXI.Text("Миссия " + parent.initialization.planets[that.levelPlanetID].name + "\nПобедите всех своих соперников.\nДля этого наносите удары собирая кристалы три в ряд.\nУдары наносите по очереди.", that.levelStyleDroidBlueText); 
			text.x = 490; 
			text.y = 23; 
			that.levelStage.addChild(text);
		},
		
		levelDroidRed: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidRedRightTexture")); 
			textureSprite.position.x = 765; 
			textureSprite.position.y = 50; 
			textureSprite.scale.set(0.3);
			that.levelStage.addChild(textureSprite);
			
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0xA63A24, 0.2);
			graphics.beginFill(0xA63A24, 0.2);
			graphics.moveTo(795, 65);
			graphics.lineTo(760, 20);
			graphics.lineTo(760, 110);
			graphics.lineTo(795, 65);
			graphics.endFill;
			
			for(var i = 0; i < 31; i++)
			{
				graphics.lineStyle(1, 0xA63A24, 0.2);
				graphics.moveTo(480, 20+(3*i));
				graphics.lineTo(760, 20+(3*i));
			}
			that.levelStage.addChild(graphics);
			
			that.levelMessageLineGraphics = new PIXI.Graphics(); 
			that.levelMessageLineGraphics.lineStyle(10, 0xA63A24, 0.3);
			that.levelMessageLineGraphics.moveTo(480, 25);
			that.levelMessageLineGraphics.lineTo(760, 25);
			that.levelStage.addChild(that.levelMessageLineGraphics);
			
			var text = new PIXI.Text("Миссия " + parent.initialization.planets[that.levelPlanetID].name + "\nПобедите всех своих соперников.\nДля этого наносите удары собирая кристалы три в ряд.\nУдары наносите по очереди.", that.levelStyleDroidRedText); 
			text.x = 490; 
			text.y = 23; 
			that.levelStage.addChild(text);
		},
		
		levelSelectPersonageUser: function()
		{
			var position = [[0,0],[105,0],[210,0]];
			that.levelBorderPersonageUser.x = position[that.levelIndexUser][0];
			that.levelBorderPersonageUser.y = position[that.levelIndexUser][1];
			position = null;
			that.levelPersonageUserSprite.texture = parent.assets.getAsset("heroesTextures")[that.levelCommandUser[that.levelIndexUser].id][1];
			that.levelUserHit1 = that.levelCommandUser[that.levelIndexUser].hitDefense1;
			that.levelUserHit2 = that.levelCommandUser[that.levelIndexUser].hitDefense2;
			that.levelUserHit3 = that.levelCommandUser[that.levelIndexUser].hitDefense3;
			that.levelUserHit4 = that.levelCommandUser[that.levelIndexUser].hitDefense4;
			that.levelUserHit5 = that.levelCommandUser[that.levelIndexUser].hitDefense5;
			that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;
			that.levelUserHit1Text.text = "- " + that.levelUserHit1;
			that.levelUserHit2Text.text = "- " + that.levelUserHit2;
			that.levelUserHit3Text.text = "+ " + that.levelUserHit3;
			that.levelUserHit4Text.text = "- " + that.levelUserHit4;
			that.levelUserHit5Text.text = "- " + that.levelUserHit5;
			that.levelUserLifeText.text = "Здоровье: " + that.levelUserLife;
		},
		
		levelSelectPersonageAI: function()
		{
			var position = [[0,0],[105,0],[210,0]];
			that.levelBorderPersonageAI.x = position[that.levelIndexAI][0];
			that.levelBorderPersonageAI.y = position[that.levelIndexAI][1];
			position = null;
			that.levelPersonageAISprite.texture = parent.assets.getAsset("heroesTextures")[that.levelCommandAI[that.levelIndexAI].id][2];
			if(that.levelIntercept === true)
			{
				that.levelAIHit1 = that.levelCommandAI[that.levelIndexAI].hitDefense1;
				that.levelAIHit2 = that.levelCommandAI[that.levelIndexAI].hitDefense2;
				that.levelAIHit3 = that.levelCommandAI[that.levelIndexAI].hitDefense3;
				that.levelAIHit4 = that.levelCommandAI[that.levelIndexAI].hitDefense4;
				that.levelAIHit5 = that.levelCommandAI[that.levelIndexAI].hitDefense5;
			}else{
				that.levelAIHit1 = that.levelCommandAI[that.levelIndexAI].hitAttack1;
				that.levelAIHit2 = that.levelCommandAI[that.levelIndexAI].hitAttack2;
				that.levelAIHit3 = that.levelCommandAI[that.levelIndexAI].hitAttack3;
				that.levelAIHit4 = that.levelCommandAI[that.levelIndexAI].hitAttack4;
				that.levelAIHit5 = that.levelCommandAI[that.levelIndexAI].hitAttack5;
			}
			that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
			that.levelAIHit1Text.text = "- " + that.levelAIHit1;
			that.levelAIHit2Text.text = "- " + that.levelAIHit2;
			that.levelAIHit3Text.text = "+ " + that.levelAIHit3;
			that.levelAIHit4Text.text = "- " + that.levelAIHit4;
			that.levelAIHit5Text.text = "- " + that.levelAIHit5;
			that.levelAILifeText.text = "Здоровье: " + that.levelAILife;
		},
		
		levelBattons: function()
		{
			var textArr = ["ЗАКОНЧИТЬ БИТВУ", "НАСТРОЙКИ", "ВЫЙТИ В МЕНЮ", "ПРИГЛАСИТЬ"];
			var nameArr = ["EndBattle", "Settings", "BackMenu", "Invite"];
			
			var button; 
			if(parent.config.side === that.SIDE_JEDI) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
			if(parent.config.side === that.SIDE_SITH) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed"));
			button.name = nameArr[0];
			button.position.x = 35; 
			button.position.y = 670; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onLevelButtonUpdate;
			button.tap = that.onLevelButtonClick; 
			button.click = that.onLevelButtonClick; 
			button.on('mouseover', that.onLevelButtonOver);
			button.on('mouseout', that.onLevelButtonOut);
			var text; 
			if(parent.config.side === that.SIDE_JEDI) text = new PIXI.Text(textArr[0], that.levelStyleButtonsBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text(textArr[0], that.levelStyleButtonsRedText); 
			text.x = (button.width / 2) - (text.width / 2);
			text.y = button.height / 3;
			button.addChild(text); 
			that.levelStage.addChild(button);
			
			if(parent.config.side === that.SIDE_JEDI) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
			if(parent.config.side === that.SIDE_SITH) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
			button.name = nameArr[1];
			button.position.x = 255; 
			button.position.y = 670; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onLevelButtonUpdate;
			button.tap = that.onLevelButtonClick; 
			button.click = that.onLevelButtonClick; 
			button.on('mouseover', that.onLevelButtonOver);
			button.on('mouseout', that.onLevelButtonOut);
			if(parent.config.side === that.SIDE_JEDI) text = new PIXI.Text(textArr[1], that.levelStyleButtonsBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text(textArr[1], that.levelStyleButtonsRedText);
			text.x = (button.width / 2) - (text.width / 2);
			text.y = button.height / 3;
			button.addChild(text); 
			that.levelStage.addChild(button);
			
			if(parent.config.side === that.SIDE_JEDI) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
			if(parent.config.side === that.SIDE_SITH) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
			button.name = nameArr[2];
			button.position.x = 35; 
			button.position.y = 620; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onLevelButtonUpdate;
			button.tap = that.onLevelButtonClick; 
			button.click = that.onLevelButtonClick; 
			button.on('mouseover', that.onLevelButtonOver);
			button.on('mouseout', that.onLevelButtonOut);
			if(parent.config.side === that.SIDE_JEDI) text = new PIXI.Text(textArr[2], that.levelStyleButtonsBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text(textArr[2], that.levelStyleButtonsRedText);
			text.x = (button.width / 2) - (text.width / 2);
			text.y = button.height / 3;
			button.addChild(text); 
			that.levelStage.addChild(button);
			
			if(parent.config.side === that.SIDE_JEDI) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
			if(parent.config.side === that.SIDE_SITH) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
			button.name = nameArr[3];
			button.position.x = 255; 
			button.position.y = 620; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onLevelButtonUpdate;
			button.tap = that.onLevelButtonClick; 
			button.click = that.onLevelButtonClick; 
			button.on('mouseover', that.onLevelButtonOver);
			button.on('mouseout', that.onLevelButtonOut);
			if(parent.config.side === that.SIDE_JEDI) text = new PIXI.Text(textArr[3], that.levelStyleButtonsBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text(textArr[3], that.levelStyleButtonsRedText); 
			text.x = (button.width / 2) - (text.width / 2);
			text.y = button.height / 3;
			button.addChild(text); 
			that.levelStage.addChild(button);
		},

		onLevelButtonOver: function()
		{
			this.isOver = true;
			this.gotoAndPlay(1);
		},

		onLevelButtonOut: function()
		{
			this.isOver = false;
			this.gotoAndStop(0);
		},

		onLevelButtonUpdate: function()
		{
			if(this.isOver)
			{
				this.gotoAndPlay(1);
			}else{
				this.gotoAndStop(0);
			}
		},
		
		onLevelButtonClick: function() 
		{
                        parent.sound.soundPlayStarWarsButtonClick();
			switch (this.name)
			{
				case "EndBattle":
                                        parent.lostShow(that.levelPlanetID, that.levelIntercept, that.levelAIPlanetID);
                                        break;
				case "Settings":
					parent.settingsShow("level");
					break;
				case "BackMenu":
					parent.backmenuShow();
                                        break;
				case "Invite": 
					parent.vkInvite();
                                        break;
				default:
					break;
			}
		},
		
		/* Создание игрового поля =================================================== */
		levelFieldCreate: function()
		{
			parent.matchShow(parent.initialization.levels[that.levelPlanetID]);
		},
		/* ========================================================================== */
		
		/* ПРОГРЕСС: Уменьшение значений LifeBars =================================== */
		levelReduceLifeBar: function(hitType, hitCount, hitModeAI) 
		{
			if(hitModeAI === false) // удар пользователя (урон ИИ)
			{
				if(hitType === parent.match.MATCH_HIT_1)
				{
                                        parent.sound.soundPlayStarWarsHit1();
                                        parent.initialization.userlTotalPointsPlayerLevel += (that.levelUserHit1 * hitCount) * 10;
					that.levelCommandAI[that.levelIndexAI].life -= (that.levelUserHit1 * hitCount);
                                        that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
					if(that.levelAILife < 0)
                                        {
                                            that.levelAILife = 0;
                                        }
					that.levelAILifeText.text = "Здоровье: " + that.levelAILife;
                                        that.hitTextRightShow("-" + (that.levelUserHit1 * hitCount));
				}
				if(hitType === parent.match.MATCH_HIT_2)
				{
                                        parent.sound.soundPlayStarWarsHit2();
                                        parent.initialization.userlTotalPointsPlayerLevel += (that.levelUserHit2 * hitCount) * 10;
					that.levelCommandAI[that.levelIndexAI].life -= (that.levelUserHit2 * hitCount);
					that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
					if(that.levelAILife < 0){
                                            that.levelAILife = 0;
                                        }
					that.levelAILifeText.text = "Здоровье: " + that.levelAILife;
                                        that.hitTextRightShow("-" + (that.levelUserHit2 * hitCount));
				}
				if(hitType === parent.match.MATCH_HIT_3)
				{
                                        parent.sound.soundPlayStarWarsHit3();
                                        parent.initialization.userlTotalPointsPlayerLevel += (that.levelUserHit3 * hitCount) * 10;
					that.levelCommandUser[that.levelIndexUser].life += (that.levelUserHit3 * hitCount);
					that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;
					if(that.levelAILife < 0)
                                        {
                                            that.levelAILife = 0;
                                        }
					that.levelUserLifeText.text = "Здоровье: " + that.levelUserLife;
                                        that.hitTextLeftShow("+" + (that.levelUserHit3 * hitCount));
				}
				if(hitType === parent.match.MATCH_HIT_4)
				{
                                        parent.sound.soundPlayStarWarsHit4();
                                        parent.initialization.userlTotalPointsPlayerLevel += (that.levelUserHit4 * hitCount) * 10;
					that.levelCommandAI[that.levelIndexAI].life -= (that.levelUserHit4 * hitCount);
					that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
					if(that.levelAILife < 0)
                                        {
                                            that.levelAILife = 0;
                                        }
					that.levelAILifeText.text = "Здоровье: " + that.levelAILife;
                                        that.hitTextRightShow("-" + (that.levelUserHit4 * hitCount));
				}
				if(hitType === parent.match.MATCH_HIT_5)
				{
                                        parent.sound.soundPlayStarWarsHit5();
                                        parent.initialization.userlTotalPointsPlayerLevel += (that.levelUserHit5 * hitCount) * 10;
					that.levelCommandAI[that.levelIndexAI].life -= (that.levelUserHit5 * hitCount);
					that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
					if(that.levelAILife < 0)
                                        {
                                            that.levelAILife = 0;
                                        }
					that.levelAILifeText.text = "Здоровье: " + that.levelAILife;
                                        that.hitTextRightShow("-" + (that.levelUserHit5 * hitCount));
				}
			}else{ // удар ИИ (урон пользователю)
				if(hitType === parent.match.MATCH_HIT_1)
				{
                                        parent.sound.soundPlayStarWarsHit1();
					that.levelCommandUser[that.levelIndexUser].life -= (that.levelAIHit1 * hitCount);
					that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;
					if(that.levelUserLife < 0)
                                        {
                                            that.levelUserLife = 0;
                                        }
					that.levelUserLifeText.text = "Здоровье: " + that.levelUserLife;
                                        that.hitTextLeftShow("-" + (that.levelAIHit1 * hitCount));
				}
				if(hitType === parent.match.MATCH_HIT_2)
				{
                                        parent.sound.soundPlayStarWarsHit2();
					that.levelCommandUser[that.levelIndexUser].life -= (that.levelAIHit2 * hitCount);
					that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;
					if(that.levelUserLife < 0)
                                        {
                                            that.levelUserLife = 0;
                                        }
					that.levelUserLifeText.text = "Здоровье: " + that.levelUserLife;
                                        that.hitTextLeftShow("-" + (that.levelAIHit2 * hitCount));
				}
				if(hitType === parent.match.MATCH_HIT_3)
				{
                                        parent.sound.soundPlayStarWarsHit3();
					that.levelCommandAI[that.levelIndexAI].life += (that.levelAIHit3 * hitCount);
					that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
					if(that.levelUserLife < 0)
                                        {
                                            that.levelUserLife = 0;
                                        }
					that.levelAILifeText.text = "Здоровье: " + that.levelAILife;
                                        that.hitTextRightShow("+" + (that.levelAIHit3 * hitCount));
                               }
				if(hitType === parent.match.MATCH_HIT_4)
				{
                                        parent.sound.soundPlayStarWarsHit4();
					that.levelCommandUser[that.levelIndexUser].life -= (that.levelAIHit4 * hitCount);
					that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;
					if(that.levelUserLife < 0)
                                        {
                                            that.levelUserLife = 0;
                                        }
					that.levelUserLifeText.text = "Здоровье: " + that.levelUserLife;
                                        that.hitTextLeftShow("-" + (that.levelAIHit4 * hitCount));
				}
				if(hitType === parent.match.MATCH_HIT_5)
				{
                                        parent.sound.soundPlayStarWarsHit5();
					that.levelCommandUser[that.levelIndexUser].life -= (that.levelAIHit5 * hitCount);
					that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;
					if(that.levelUserLife < 0)
                                        {
                                            that.levelUserLife = 0;
                                        }
					that.levelUserLifeText.text = "Здоровье: " + that.levelUserLife;
                                        that.hitTextLeftShow("-" + (that.levelAIHit5 * hitCount));
				}
			}
		},
		/* ========================================================================== */
		
		/* Меняем персонаж ========================================================== */
		levelExchangePersonage: function(mode)
		{
                    if(parent.timer !== null)
                    {
			if(mode === "AI") // меняем персонаж ИИ
			{
				var removePers = 0;
				for(var i in that.levelCommandAI)
				{
					if(that.levelCommandAI[i].life <= 0)
					{
						removePers++;
					}
				}
				if(removePers === (that.levelCommandAI.length))
				{
					// битва завершена ИИ проиграл!
					parent.timer.timerPause = true;
					parent.timer.timerStop();
					that.levelStage.removeChild(that.levelPersonageAISprite);
					that.levelStage.removeChild(that.levelAIHit1Text);
					that.levelStage.removeChild(that.levelAIHit2Text);
					that.levelStage.removeChild(that.levelAIHit3Text);
					that.levelStage.removeChild(that.levelAIHit4Text);
					that.levelStage.removeChild(that.levelAIHit5Text);
					that.levelStage.removeChild(that.levelAILifeText);
                                        
                                        parent.initialization.userTotalPointsPlayerTournament = parent.initialization.userlTotalPointsPlayerLevel;
                                        
                                        if(parent.config.side === that.SIDE_JEDI && that.levelPlanetID === "DeathStar")
                                        {
                                            parent.victoryShow(that.levelPlanetID, true, that.levelAIPlanetID);
                                        }
                                        else{
                                            if(parent.config.side === that.SIDE_SITH && that.levelPlanetID === "Coruscant")
                                            {
                                               parent.victoryShow(that.levelPlanetID, true, that.levelAIPlanetID);
                                            }
                                            else {
                                                if(parent.victory === null) parent.victoryShow(that.levelPlanetID, that.levelIntercept, that.levelAIPlanetID);
                                            }
                                        }
                                	
				}else{
					if(that.levelIndexAI < that.levelCommandAI.length - 1) that.levelIndexAI++; // < 2
					else that.levelIndexAI = 0;
					if(that.levelCommandAI[that.levelIndexAI].life <= 0) that.levelExchangePersonage("AI");
					else that.levelSelectPersonageAI();
					
					if(that.levelCommandUser[that.levelIndexUser].life <= 0)
					{
						var position = [[55,30],[160,30],[265,30]];
						var sprite = new PIXI.Sprite(parent.assets.getAsset("personageDeadTexture"));
						sprite.position.x = position[that.levelIndexUser][0];
						sprite.position.y = position[that.levelIndexUser][1];
						that.levelStage.addChild(sprite);
						position = null;
						that.levelExchangePersonage("USER");
					}
				}
			}
			if(mode === "USER") // меняем персонажа пользователя
			{
				var removePers = 0;
				for(var i in that.levelCommandUser)
				{
					if(that.levelCommandUser[i].life <= 0)
					{
						removePers++;
					}
				}
				if(removePers === (that.levelCommandUser.length))
				{
					// битва завершена Пользователь проиграл!
					parent.timer.timerPause = true;
					parent.timer.timerStop();
					that.levelStage.removeChild(that.levelPersonageUserSprite);
					that.levelStage.removeChild(that.levelUserHit1Text);
					that.levelStage.removeChild(that.levelUserHit2Text);
					that.levelStage.removeChild(that.levelUserHit3Text);
					that.levelStage.removeChild(that.levelUserHit4Text);
					that.levelStage.removeChild(that.levelUserHit5Text);
					that.levelStage.removeChild(that.levelUserLifeText);
					
                                        if(parent.config.side === that.SIDE_JEDI && that.levelPlanetID === "Coruscant") 
                                        {
                                            if(parent.lost === null) parent.lostShow(that.levelPlanetID, true, that.levelAIPlanetID);
                                        }
                                        else {
                                           if(parent.config.side === that.SIDE_SITH && that.levelPlanetID === "DeathStar")
                                           {
                                              if(parent.lost === null) parent.lostShow(that.levelPlanetID, true, that.levelAIPlanetID);  
                                           }
                                           else{
                                               if(parent.lost === null) parent.lostShow(that.levelPlanetID, that.levelIntercept, that.levelAIPlanetID);
                                           }
                                        }
                            		
				}else{
					if(that.levelIndexUser < that.levelCommandUser.length - 1)that.levelIndexUser++; // < 2
					else that.levelIndexUser = 0;
					if(that.levelCommandUser[that.levelIndexUser].life <= 0) that.levelExchangePersonage("USER");
					else that.levelSelectPersonageUser();
					
					if(that.levelCommandAI[that.levelIndexAI].life <= 0)
					{
						var position = [[520,628],[625,628],[730,628]];
						var sprite = new PIXI.Sprite(parent.assets.getAsset("personageDeadTexture"));
						sprite.position.x = position[that.levelIndexAI][0];
						sprite.position.y = position[that.levelIndexAI][1];
						that.levelStage.addChild(sprite);
						position = null;
						that.levelExchangePersonage("AI");
					}
				}
			}
                    }
		},
		/* ========================================================================== */	
		
                /* Показываем очки урона в бою ============================================== */
                hitTextCreate: function()
                {
                    if(parent.config.side === that.SIDE_JEDI)
                    {
                        that.hitLeftText = new PIXI.Text("", { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }); 
                        that.hitLeftText.x = 40;
                        that.hitLeftText.y = 150;
                        that.levelStage.addChild(that.hitLeftText);
                        
                        that.hitRightText = new PIXI.Text("", { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }); 
                        that.hitRightText.x = 775;
                        that.hitRightText.y = 350;
                        that.levelStage.addChild(that.hitRightText);
                    }
                    if(parent.config.side === that.SIDE_SITH)
                    {
                        that.hitLeftText = new PIXI.Text("", { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }); 
                        that.hitLeftText.x = 40;
                        that.hitLeftText.y = 150;
                        that.levelStage.addChild(that.hitLeftText);
                        
                        that.hitRightText = new PIXI.Text("", { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }); 
                        that.hitRightText.x = 775;
                        that.hitRightText.y = 350;
                        that.levelStage.addChild(that.hitRightText);   
                    }
                },
                
                hitTextLeftShow: function(textMessage)
                {
                    that.hitLeftText.text += "\n" + textMessage;
                },
                
                onCompleteTextLeftShow: function()
                {
                    that.hitLeftText.text = "";
                },
                
                hitTextRightShow: function(textMessage)
                {
                    that.hitRightText.text += "\n" + textMessage;
                },
                
                onCompleteTextRightShow: function()
                {
                    that.hitRightText.text = "";
                },
                
                /* ========================================================================== */	
		
		/* Завершение работы с классом ======================================== */
		tweenStart: function()
		{
			createjs.Tween.get(that.levelStarsSprite, {loop: true}) 
					.to({x: -50, y: 0}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: -50, y: -50}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 0, y: -50}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 0, y: 0}, 10000, createjs.Ease.getPowInOut(3));

			createjs.Tween.get(that.levelPlanetSprite, {loop: true}) 
					.to({x: 200, y: 100}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 200, y: 0}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 300, y: 0}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 300, y: 100}, 10000, createjs.Ease.getPowInOut(3));
					
			createjs.Tween.get(that.levelLandscapeSprite, {loop: true}) 
					.to({x: -50, y: 0}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: -50, y: -50}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 0, y: -50}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 0, y: 0}, 10000, createjs.Ease.getPowInOut(3))
					.to({alpha: 1.0}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: -50, y: 0}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: -50, y: -50}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 0, y: -50}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 0, y: 0}, 10000, createjs.Ease.getPowInOut(3))
					.to({alpha: 0.0}, 10000, createjs.Ease.getPowInOut(3));
					
			createjs.Tween.get(that.levelLineUserAnimationGraphics, {loop: true}) 
				.to({x: 0, y: 275}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Tween.get(that.levelLineAIAnimationGraphics, {loop: true}) 
				.to({x: 0, y: 275}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Tween.get(that.levelMessageLineGraphics, {loop: true}) 
				.to({x: 0, y: 80}, 2000, createjs.Ease.getPowInOut(3));
				
			createjs.Ticker.setFPS(60);
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.levelStarsSprite);
			createjs.Tween.removeTweens(that.levelPlanetSprite);
			createjs.Tween.removeTweens(that.levelLandscapeSprite);
			createjs.Tween.removeTweens(that.levelLineUserAnimationGraphics);
			createjs.Tween.removeTweens(that.levelLineAIAnimationGraphics);
			createjs.Tween.removeTweens(that.levelMessageLineGraphics);
            	},
                
                show: function()
		{
			that.tweenStart();
			return that.levelStage;
		},
		
		close: function()
		{
			that.tweenStop();
			for(var child in that.levelStage.children) that.levelStage.removeChild(that.levelStage.children[child]);
			return that.levelStage;
		},
		
		getWindowStage: function()
		{
			return that.levelStage;
		},
		
		destroy: function()
		{
			for(var child in that.levelStage.children) that.levelStage.removeChild(that.levelStage.children[child]);
			that.levelStage.destroy();
			delete that.levelStage.children;
			
			for(var property in that) that[property] = null;
		}
	};
	return that;
};


/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var Lost = function(parent)
{
    var that = {
        windowStage: null,
        lineAnimationGraphics: null,
        styleBlueText: { font : 'bold 18px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 400, align: "center"},
        styleRedText: { font : 'bold 18px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 400, align: "center"}, 
        styleBlueText2: { font : 'bold 12px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200, align: "center"},
        styleRedText2: { font : 'bold 12px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200, align: "center"}, 
        buttonStyleBlueText: { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 },
        buttonStyleRedText: { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }, 

        SIDE_NONE: "side_none",
	SIDE_JEDI: "side_jedi",
	SIDE_SITH: "side_sith",
        
        intercept: null,
        planetID: null,
        aiPlanetID: null,
        
        create: function(planetID, intercept, aiPlanetID)
        {
            that.intercept = intercept;
            that.planetID = planetID;
            that.aiPlanetID = aiPlanetID;
            
            that.windowStage = new PIXI.Container();
            that.backgroundCreate();
            that.windowCreate();
            that.titleCreate();
            that.textCreate();
            that.buttonCloseCreate();
        },
        
        backgroundCreate: function()
        {
            var graphics = new PIXI.Graphics(); 
            graphics.hitArea = new PIXI.Rectangle(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
            graphics.interactive = true;
            graphics.lineStyle(1, 0x000000, 0.05);
            graphics.beginFill(0x000000, 0.5);
            graphics.drawRect(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
            graphics.endFill();
            that.windowStage.addChild(graphics); 
        },
        
        windowCreate: function()
        {
            if(parent.config.side === that.SIDE_JEDI)
            {
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(2, 0xFFFF80, 1);
                graphics.drawRoundedRect(200, 150, 460, 420, 15);
                graphics.lineStyle(2, 0xFF0000, 1);
                graphics.beginFill(0x800000, 0.5);
                graphics.drawRoundedRect(210, 160, 440, 400, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var textureSprite; 
                if(that.intercept === false) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].redPersonage1][1]);
                else {
                    if(parent.initialization.commandAI["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][1]);
                    else{
                        if(parent.initialization.commandAI["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage2"]][1]);
                        else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage3"]][1]);
                    }
                }
                textureSprite.position.x = 360; 
                textureSprite.position.y = 265; 
                textureSprite.scale.set(0.5);
                that.windowStage.addChild(textureSprite);
                
                graphics = new PIXI.Graphics();
                for(var i = 0; i < 133; i++)
                {
                    graphics.lineStyle(1, 0xA63A24, 0.5);
                    graphics.moveTo(210, 160+(3*i));
                    graphics.lineTo(650, 160+(3*i));
                }
                that.windowStage.addChild(graphics);

                that.lineAnimationGraphics = new PIXI.Graphics(); 
                that.lineAnimationGraphics.lineStyle(10, 0xA63A24, 0.3);
                that.lineAnimationGraphics.moveTo(210, 165);
                that.lineAnimationGraphics.lineTo(650, 165);
                that.windowStage.addChild(that.lineAnimationGraphics);
            }
            if(parent.config.side === that.SIDE_SITH)
            {
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(2, 0xFFFFFF, 1);
                graphics.drawRoundedRect(200, 150, 460, 420, 15);
                graphics.lineStyle(2, 0x0000FF, 1);
                graphics.beginFill(0x00000F, 0.5);
                graphics.drawRoundedRect(210, 160, 440, 400, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var textureSprite; 
                if(that.intercept === false) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].bluePersonage1][1]);
                else {
                    if(parent.initialization.commandAI["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][1]);
                    else{
                        if(parent.initialization.commandAI["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage2"]][1]);
                        else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage3"]][1]);
                    }
                }
                textureSprite.position.x = 360; 
                textureSprite.position.y = 265; 
                textureSprite.scale.set(0.5);
                that.windowStage.addChild(textureSprite);
                
                graphics = new PIXI.Graphics();
                for(var i = 0; i < 133; i++)
                {
                    graphics.lineStyle(1, 0x0000FF, 0.5);
                    graphics.moveTo(210, 160+(3*i));
                    graphics.lineTo(650, 160+(3*i));
                }
                that.windowStage.addChild(graphics);

                that.lineAnimationGraphics = new PIXI.Graphics(); 
                that.lineAnimationGraphics.lineStyle(10, 0x0000FF, 0.3);
                that.lineAnimationGraphics.moveTo(210, 165);
                that.lineAnimationGraphics.lineTo(650, 165);
                that.windowStage.addChild(that.lineAnimationGraphics);
            }
        },
        
         titleCreate: function()
        {
            var text;
            if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text("ВЫ ПРОИГРАЛИ!", that.buttonStyleBlueText); 
            if(parent.config.side === that.SIDE_JEDI) text = new PIXI.Text("ВЫ ПРОИГРАЛИ!", that.buttonStyleRedText); 
            text.x = 335;
            text.y = 180;
            that.windowStage.addChild(text);
        },
        
         textCreate: function()
        {
            var text;
            if(parent.config.side === that.SIDE_SITH)
            {
                if(that.intercept === false) text = new PIXI.Text(parent.initialization.personages[parent.initialization.planets[that.planetID].bluePersonage1].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleBlueText);
                else{
                    if(parent.initialization.commandAI["personage1"] != undefined) text = new PIXI.Text(parent.initialization.personages[parent.initialization.commandAI["personage1"]].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleBlueText);
                    else{
                        if(parent.initialization.commandAI["personage2"] != undefined) text = new PIXI.Text(parent.initialization.personages[parent.initialization.commandAI["personage2"]].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleBlueText);
                        else text = new PIXI.Text(parent.initialization.personages[parent.initialization.commandAI["personage3"]].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleBlueText);
                    }
                }
                text.x = 260;
                text.y = 210;
                that.windowStage.addChild(text);
            }
			
            if(parent.config.side === that.SIDE_JEDI)
            {
                if(that.intercept === false) text = new PIXI.Text(parent.initialization.personages[parent.initialization.planets[that.planetID].redPersonage1].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleRedText);
                else{
                    if(parent.initialization.commandAI["personage1"] != undefined) text = new PIXI.Text(parent.initialization.personages[parent.initialization.commandAI["personage1"]].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleRedText);
                    else{
                        if(parent.initialization.commandAI["personage2"] != undefined) text = new PIXI.Text(parent.initialization.personages[parent.initialization.commandAI["personage2"]].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleRedText);
                        else text = new PIXI.Text(parent.initialization.personages[parent.initialization.commandAI["personage3"]].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleRedText);
                    }
                }
                text.x = 260;
                text.y = 210;
                that.windowStage.addChild(text);
            }
        },
        
        buttonCloseCreate: function()
        {
            if(parent.config.side === that.SIDE_SITH)
            {
                var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
                button.name = "button_close";
                button.position.x = 330; 
                button.position.y = 510; 
                button.interactive = true; 
                button.buttonMode = true; 
                button.loop = false; 
                button.animationSpeed = 0.2;
                button.onComplete = that.onButtonCloseUpdate;
                button.tap = that.onButtonCloseClick; 
                button.click = that.onButtonCloseClick; 
                button.on('mouseover', that.onButtonCloseOver);
                button.on('mouseout', that.onButtonCloseOut);
                var text = new PIXI.Text("Закрыть", that.styleBlueText); 
                text.x = (button.width / 2) - (text.width / 2);
                text.y = button.height / 3.2;
                button.addChild(text); 
                that.windowStage.addChild(button);
            }
			
            if(parent.config.side === that.SIDE_JEDI)
            {
                var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
                button.name = "button_close";
                button.position.x = 330; 
                button.position.y = 510; 
                button.interactive = true; 
                button.buttonMode = true; 
                button.loop = false; 
                button.animationSpeed = 0.2;
                button.onComplete = that.onButtonCloseUpdate;
                button.tap = that.onButtonCloseClick; 
                button.click = that.onButtonCloseClick; 
                button.on('mouseover', that.onButtonCloseOver);
                button.on('mouseout', that.onButtonCloseOut);
                var text = new PIXI.Text("Закрыть", that.styleRedText); 
                text.x = (button.width / 2) - (text.width / 2);
                text.y = button.height / 3.2;
                button.addChild(text); 
                that.windowStage.addChild(button);
            }
        },
        
        onButtonCloseOver: function(event)
        {
                this.isOver = true;
                this.gotoAndPlay(1);
        },

        onButtonCloseOut: function(event)
        {
                this.isOver = false;
                this.gotoAndStop(0);
        },

        onButtonCloseUpdate: function(event)
        {
                if(this.isOver)
                {
                    this.gotoAndPlay(1);
                }else{
                    this.gotoAndStop(0);
                }
        },

        onButtonCloseClick: function(event)
        {
            parent.sound.soundPlayStarWarsButtonClick();
            
            // ИИ присваиваем планете статус завоёванной если это был перехват
            if(that.intercept === true)
            {
                if(parent.config.side === that.SIDE_SITH) parent.initialization.planets[that.planetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI; 
                if(parent.config.side === that.SIDE_JEDI) parent.initialization.planets[that.planetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH; 
                // Увеличиваем очки опыта ИИ
                parent.initialization.userExperiencePointsAI += 3;
                // ИИ получает разрешение на выполнение действий!
                parent.config.stopAI = false;
                // обновление команды ИИ распределение очков опыта
                if(parent.config.side === that.SIDE_JEDI) parent.initialization.aiUpgradeCommand(that.SIDE_SITH, that.aiPlanetID);
                if(parent.config.side === that.SIDE_SITH) parent.initialization.aiUpgradeCommand(that.SIDE_JEDI, that.aiPlanetID);
                
                if(parent.config.side === that.SIDE_JEDI && parent.initialization.planets[that.aiPlanetID].id === "Coruscant") parent.endGameShow("lost");
                else{
                    if(parent.config.side === that.SIDE_SITH && parent.initialization.planets[that.aiPlanetID].id === "DeathStar") parent.endGameShow("lost");
                    else{
                        parent.lostClose(); // закрываем окно
                    }
                }
                
            }else{
                if(parent.initialization.aiResultBattle() === true) // ИИ присваиваем планете статус завоёванной
                {
                    if(parent.config.side === that.SIDE_SITH) parent.initialization.planets[that.aiPlanetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI; 
                    if(parent.config.side === that.SIDE_JEDI) parent.initialization.planets[that.aiPlanetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH; 
                    // Увеличиваем очки опыта ИИ
                    parent.initialization.userExperiencePointsAI += 3;
                    // ИИ получает разрешение на выполнение действий!
                    parent.config.stopAI = false;
                    // обновление команды ИИ распределение очков опыта
                    if(parent.config.side === that.SIDE_JEDI) parent.initialization.aiUpgradeCommand(that.SIDE_SITH, that.aiPlanetID);
                    if(parent.config.side === that.SIDE_SITH) parent.initialization.aiUpgradeCommand(that.SIDE_JEDI, that.aiPlanetID);
                    
                    if(parent.config.side === that.SIDE_JEDI && parent.initialization.planets[that.aiPlanetID].id === "Coruscant") parent.endGameShow("lost");
                    else{
                        if(parent.config.side === that.SIDE_SITH && parent.initialization.planets[that.aiPlanetID].id === "DeathStar") parent.endGameShow("lost");
                        else{
                            parent.lostClose(); // закрываем окно
                        }
                    }
                }else{
                    // ИИ получает разрешение на выполнение действий!
                    parent.config.stopAI = false;
                    parent.lostClose(); // закрываем окно
                }
            }
        },
        
        tweenStart: function()
        {
            createjs.Tween.get(that.lineAnimationGraphics, {loop: true}) 
                    .to({x: 0, y: 390}, 2500, createjs.Ease.getPowInOut(3));
            createjs.Ticker.setFPS(60);
        },

        tweenStop: function()
        {
            createjs.Tween.removeTweens(that.lineAnimationGraphics);
        },

        show: function()
        {
                if(parent.level !== null) parent.timer.timerPauseBegin();
                that.tweenStart();
                return that.windowStage;
        },

        close: function()
        {
                that.tweenStop();
                for(var child in that.windowStage.children) that.windowStage.removeChild(that.windowStage.children[child]);
                return that.windowStage;
        },

        getWindowStage: function()
        {
                return that.windowStage;
        },

        destroy: function()
        {
                for(var child in that.windowStage.children) that.windowStage.removeChild(that.windowStage.children[child]);
                that.windowStage.destroy();
                delete that.windowStage.children;

                for(var property in that) that[property] = null;
        }
        
    };
    return that;
};

/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var Map = function(parent)
{
	var that = {
		windowStage: null,
		mapSprite: null,
		mapStartPosX: null,
		mapStartPosY: null,
		desktopLineGraphics: null,
		messageLineGraphics: null,
		styleDroidBlueText: { font : 'bold 12px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 145 },
		styleButtonBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 },
		styleDroidRedText: { font : 'bold 12px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 145 },
		styleButtonRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 },
		textMessage: null,
		targetPlanetBlue: null,
		targetPlanetRed: null,
		targetAI: null,    // текущая цель ИИ
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		create: function()
		{
			that.windowStage = new PIXI.Container();
			that.checkAvailablePersonage();	// определение доступности персонажей команды
			that.spaceCreate();
			that.planetsCreate();
			that.interfaceCreate();
			that.targetsCreate();
			that.targetSearch();
		},
		
		checkAvailablePersonage: function()
		{
			for(var key in parent.initialization.commandUser)
			{
				for(var planetID in parent.initialization.planets)
				{
					if( (parent.config.side === that.SIDE_JEDI)
					&& (parent.initialization.planets[planetID].blueRewardPersonage1 === parent.initialization.commandUser[key] || parent.initialization.planets[planetID].blueRewardPersonage2 === parent.initialization.commandUser[key] || parent.initialization.planets[planetID].blueRewardPersonage3 === parent.initialization.commandUser[key]) 
					&& (parent.initialization.planets[planetID].status === parent.initialization.USER_PLANET_QUEST_AWAITING || parent.initialization.planets[planetID].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH)) 
					{
						parent.initialization.commandUser[key] = null;
					}
					if( (parent.config.side === that.SIDE_SITH)
					&& (parent.initialization.planets[planetID].redRewardPersonage1 === parent.initialization.commandUser[key] || parent.initialization.planets[planetID].redRewardPersonage2 === parent.initialization.commandUser[key] || parent.initialization.planets[planetID].redRewardPersonage3 === parent.initialization.commandUser[key]) 
					&& (parent.initialization.planets[planetID].status === parent.initialization.USER_PLANET_QUEST_AWAITING || parent.initialization.planets[planetID].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI)) 
					{
						parent.initialization.commandUser[key] = null;
					}
				}
			}
            	},
		
		spaceCreate: function()
		{
			if(parent.config.side === that.SIDE_JEDI) that.mapSprite = new PIXI.Sprite(parent.assets.getAsset("mapSpaceBlueTexture")); 
			if(parent.config.side === that.SIDE_SITH) that.mapSprite = new PIXI.Sprite(parent.assets.getAsset("mapSpaceRedTexture")); 
			that.mapSprite.position.x = -82; 
			that.mapSprite.position.y = -19; 
			that.mapSprite.interactive = true;
			that.mapSprite.on('mousedown', that.onSpaceDown);
			that.mapSprite.on('touchstart', that.onSpaceDown);
			that.mapSprite.on('mouseup', that.onSpaceUp);
			that.mapSprite.on('touchend', that.onSpaceUp);
			that.mapSprite.on('mouseupoutside', that.onSpaceUp);
			that.mapSprite.on('touchendoutside', that.onSpaceUp);
			that.mapSprite.on('mousemove', that.onSpaceMove);
			that.mapSprite.on('touchmove', that.onSpaceMove);
			that.windowStage.addChild(that.mapSprite);
			
		},
		
		onSpaceDown: function(event)
		{
			var cursorPosition = event.data.getLocalPosition(this.parent);
			that.mapStartPosX = cursorPosition.x;
			that.mapStartPosY = cursorPosition.y;
			this.data = event.data;
			this.move = true;
		},
		
		onSpaceUp: function(event)
		{
			that.mapStartPosX = 0;
			that.mapStartPosY = 0;
			this.move = false;
			this.data = null;
		},
		
		onSpaceMove: function(event)
		{
			if (this.move)
			{
				var newPosition = this.data.getLocalPosition(this.parent);
				if(that.mapStartPosX < newPosition.x)
				{
					if(this.position.x < -5) this.position.x += 5;
					that.mapStartPosX = newPosition.x;
				}
				if(that.mapStartPosX > newPosition.x)
				{
					if(this.position.x  > -160)this.position.x -= 5;
					that.mapStartPosX = newPosition.x;
				}
				
				if(that.mapStartPosY < newPosition.y)
				{
					if(this.position.y < -10) this.position.y += 5;
					that.mapStartPosY = newPosition.y;
				}
				if(that.mapStartPosY > newPosition.y)
				{
					if(this.position.y > -10)this.position.y -= 5;
					that.mapStartPosY = newPosition.y;
				}
			}
		},
		
		planetsCreate: function()
		{
			for (var key in parent.initialization.mapPlanets)
			{
				parent.initialization.mapPlanets[key][1].tap = that.onPlanetClick;
				parent.initialization.mapPlanets[key][1].click = that.onPlanetClick;
				parent.initialization.mapPlanets[key][1].on('mouseover', that.onPlanetOver);
				parent.initialization.mapPlanets[key][1].on('mouseout', that.onPlanetOut);
				
				if(parent.config.side === that.SIDE_JEDI)
				{
					if(parent.initialization.planets[key].status === parent.initialization.USER_PLANET_QUEST_AWAITING)
					{
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][1]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][4]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][2]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][5]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][6]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][7]);
					}
					if(parent.initialization.planets[key].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI)
					{
						var graphics = new PIXI.Graphics();
						graphics.beginFill(0x0000FF, 0.25);
						graphics.lineStyle(1, 0x0000FF, 0.8);
						graphics.drawCircle(parent.initialization.mapPlanets[key][2].position.x + 1, parent.initialization.mapPlanets[key][2].position.y + 65, 50);
						graphics.lineStyle(1, 0x0000FF, 1);
						graphics.endFill();
						that.mapSprite.addChild(graphics);
					
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][1]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][4]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][2]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][11]);
					}
					if(parent.initialization.planets[key].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH)
					{
						var graphics = new PIXI.Graphics();
						graphics.beginFill(0xFF0000, 0.25);
						graphics.lineStyle(1, 0xFF0000, 0.3);
						graphics.drawCircle(parent.initialization.mapPlanets[key][2].position.x + 1, parent.initialization.mapPlanets[key][2].position.y + 65, 50);
						graphics.lineStyle(1, 0xFF0000, 1);
						graphics.endFill();
						that.mapSprite.addChild(graphics);
					
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][1]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][4]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][2]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][12]);
					}
				}
				if(parent.config.side === that.SIDE_SITH) 
				{
					if(parent.initialization.planets[key].status === parent.initialization.USER_PLANET_QUEST_AWAITING)
					{
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][1]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][4]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][3]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][8]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][9]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][10]);
					}
					if(parent.initialization.planets[key].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI)
					{
						var graphics = new PIXI.Graphics();
						graphics.beginFill(0x0000FF, 0.25);
						graphics.lineStyle(1, 0x0000FF, 0.8);
						graphics.drawCircle(parent.initialization.mapPlanets[key][2].position.x + 1, parent.initialization.mapPlanets[key][2].position.y + 65, 50);
						graphics.lineStyle(1, 0x0000FF, 1);
						graphics.endFill();
						that.mapSprite.addChild(graphics);
						
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][1]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][4]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][3]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][11]);
					}
					if(parent.initialization.planets[key].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH)
					{
						var graphics = new PIXI.Graphics();
						graphics.beginFill(0xFF0000, 0.25);
						graphics.lineStyle(1, 0xFF0000, 0.3);
						graphics.drawCircle(parent.initialization.mapPlanets[key][2].position.x + 1, parent.initialization.mapPlanets[key][2].position.y + 65, 50);
						graphics.lineStyle(1, 0xFF0000, 1);
						graphics.endFill();
						that.mapSprite.addChild(graphics);
						
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][1]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][4]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][3]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][12]);
					}
				}
			}
		},
		
		onPlanetClick: function(event)
		{
                        parent.sound.soundPlayStarWarsButtonClick();
                        
			if(parent.initialization.commandUser["personage1"] === null && parent.initialization.commandUser["personage2"] === null && parent.initialization.commandUser["personage3"] === null)
			{
				parent.messageShow("ПРЕДУПРЕЖДЕНИЕ", "В вашей комманде нет не одного персонажа. \nВы не можите начать битву пока в команде не будет хотя бы один персонаж!");
			}else{
				if(parent.config.side === that.SIDE_JEDI)
				{
					if(parent.initialization.planets[this.name].status !== parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI || this.name === that.targetAI)
					{
						that.mapSprite.move = false;
						parent.startbattleShow(this.name, that.targetAI);
					}
				}
				if(parent.config.side === that.SIDE_SITH)
				{
					if(parent.initialization.planets[this.name].status !== parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH || this.name === that.targetAI)
					{
						that.mapSprite.move = false;
						parent.startbattleShow(this.name, that.targetAI);
					}
				}
			}
		},
		
		onPlanetOver: function(event)
		{
			if(parent.config.side === that.SIDE_JEDI) that.textMessage.text = parent.initialization.mapMessage[event.target.name][0];
			if(parent.config.side === that.SIDE_SITH) that.textMessage.text = parent.initialization.mapMessage[event.target.name][1];
		},
		
		onPlanetOut: function(event)
		{
			if(parent.config.side === that.SIDE_JEDI) that.textMessage.text = parent.initialization.mapMessage["LastNews"][0];
			if(parent.config.side === that.SIDE_SITH) that.textMessage.text = parent.initialization.mapMessage["LastNews"][1];
		},
		
		interfaceCreate: function()
		{
			that.commandShow();
			if(parent.config.side === that.SIDE_JEDI)
			{
				that.borderBlue();
				that.desktopBlue();
				that.droidBlue();
				that.droidBlueMessage();
				that.buttonsBlue();
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				that.borderRed();
				that.desktopRed();
				that.droidRed();
				that.droidRedMessage();
				that.buttonsRed();
			}
		},
		
		commandShow: function()
		{
			var index = 0;
			for(var key in parent.initialization.commandUser)
			{
				if(parent.initialization.commandUser[key] !== null)
				{
					var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser[key]][3]); 
					textureSprite.position.x = 35 + (105 * index); 
					textureSprite.position.y = 625; 
					that.windowStage.addChild(textureSprite);
				}
				index++;
			}
		},
		
		borderBlue: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(50, 605,4);
			graphics.endFill();
			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(50,605);
			graphics.lineTo(5, 605);
			graphics.moveTo(5,605);
			graphics.lineTo(5, 725);
			graphics.moveTo(5, 725);
			graphics.lineTo(840, 725);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(840, 725,4);
			graphics.endFill();
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(355, 680,4);
			graphics.endFill();
			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(355, 680);
			graphics.lineTo(355, 725);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(855, 550, 4);
			graphics.endFill();
			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(855,550);
			graphics.lineTo(855, 5);
			graphics.moveTo(855,5);
			graphics.lineTo(5, 5);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(5, 5, 4);
			graphics.endFill();
			that.windowStage.addChild(graphics);
		},
		
		desktopBlue: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x0000FF, 0.2);
			graphics.moveTo(15, 610);
			graphics.lineTo(350, 610);
			graphics.lineTo(350, 715);
			graphics.lineTo(15, 715);
			graphics.endFill();
			for(var i = 0; i < 35; i++)
			{
				graphics.lineStyle(1, 0x0000FF, 0.5);
				graphics.moveTo(15, 610+(3*i));
				graphics.lineTo(350, 610+(3*i));
			}
			that.windowStage.addChild(graphics);
			
			that.desktopLineGraphics = new PIXI.Graphics(); 
			that.desktopLineGraphics.lineStyle(10, 0x0000FF, 0.3);
			that.desktopLineGraphics.moveTo(15,615);
			that.desktopLineGraphics.lineTo(350, 615);
			that.windowStage.addChild(that.desktopLineGraphics);
		},
		
		droidBlue: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidBlueRightTexture")); 
			textureSprite.position.x = 765; 
			textureSprite.position.y = 605; 
			textureSprite.scale.set(0.3);
			that.windowStage.addChild(textureSprite);
			
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0090F0, 0.2);
			graphics.beginFill(0x0090F0, 0.2);
			graphics.moveTo(792, 620);
			graphics.lineTo(700, 455);
			graphics.lineTo(845, 455);
			graphics.lineTo(792, 620);
			graphics.endFill;
			that.windowStage.addChild(graphics);
			
			graphics = new PIXI.Graphics();
			for(var i = 0; i < 72; i++)
			{
				graphics.lineStyle(1, 0x0090F0, 0.2);
				graphics.moveTo(698, 239+(3*i));
				graphics.lineTo(846, 239+(3*i));
			}
			that.windowStage.addChild(graphics);
			
			that.messageLineGraphics = new PIXI.Graphics(); 
			that.messageLineGraphics.lineStyle(10, 0x0090F0, 0.3);
			that.messageLineGraphics.moveTo(698, 243);
			that.messageLineGraphics.lineTo(846, 243);
			that.windowStage.addChild(that.messageLineGraphics);
		},
		
		droidBlueMessage: function()
		{
			that.textMessage = new PIXI.Text(parent.initialization.mapMessage["LastNews"][0], that.styleDroidBlueText); 
			that.textMessage.x = 700; 
			that.textMessage.y = 240; 
			that.windowStage.addChild(that.textMessage);
		},
		
		buttonsBlue: function()
		{
			var textArr = ["КОМАНДА", "НАСТРОЙКИ"];
			var nameArr = ["Command", "Settings"];
			
			for(var i = 0; i < textArr.length; i++)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = nameArr[i];
				button.position.x = 360 + (200 * i); 
				button.position.y = 670; 
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);

				var text = new PIXI.Text(textArr[i], that.styleButtonBlueText); 
				text.x = button.width / 3.8;
				text.y = button.height / 3;

				button.addChild(text); 
				that.windowStage.addChild(button);
			}
			
			textArr = ["НАЗАД В МЕНЮ", "ПРИГЛАСИТЬ"];
			nameArr = ["BackMenu", "Invite"];
			
			for(var i = 0; i < textArr.length; i++)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = nameArr[i];
				button.position.x = 10; 
				button.position.y = 10 + (545 * i); 
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);

				var text = new PIXI.Text(textArr[i], that.styleButtonBlueText); 
				text.x = button.width / 3.8;
				text.y = button.height / 3;

				button.addChild(text); 
				that.windowStage.addChild(button);
			}
		},
		
		borderRed: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0xFF0000, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(50, 605,4);
			graphics.endFill();
			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(50,605);
			graphics.lineTo(5, 605);
			graphics.moveTo(5, 605);
			graphics.lineTo(5, 725);
			graphics.moveTo(5, 725);
			graphics.lineTo(840, 725);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(840, 725,4);
			graphics.endFill();
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(355, 680,4);
			graphics.endFill();
			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(355, 680);
			graphics.lineTo(355, 725);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(855, 550, 4);
			graphics.endFill();
			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(855,550);
			graphics.lineTo(855, 5);
			graphics.moveTo(855,5);
			graphics.lineTo(5, 5);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(5, 5, 4);
			graphics.endFill();
			that.windowStage.addChild(graphics);
		},
		
		desktopRed: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x800000, 1);
			graphics.beginFill(0x800000, 0.2);
			graphics.moveTo(15, 610);
			graphics.lineTo(350, 610);
			graphics.lineTo(350, 715);
			graphics.lineTo(15, 715);
			graphics.endFill();
			for(var i = 0; i < 35; i++)
			{
				graphics.lineStyle(1, 0x800000, 0.5);
				graphics.moveTo(15, 610+(3*i));
				graphics.lineTo(350, 610+(3*i));
			}
			that.windowStage.addChild(graphics);
			
			that.desktopLineGraphics = new PIXI.Graphics(); 
			that.desktopLineGraphics.lineStyle(10, 0x800000, 0.3);
			that.desktopLineGraphics.moveTo(15,615);
			that.desktopLineGraphics.lineTo(350, 615);
			that.windowStage.addChild(that.desktopLineGraphics);
		},
		
		droidRed: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidRedRightTexture")); 
			textureSprite.position.x = 765; 
			textureSprite.position.y = 605; 
			textureSprite.scale.set(0.3);
			that.windowStage.addChild(textureSprite);
			
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0xA63A24, 0.2);
			graphics.beginFill(0xA63A24, 0.2);
			graphics.moveTo(792, 620);
			graphics.lineTo(700, 455);
			graphics.lineTo(845, 455);
			graphics.lineTo(792, 620);
			graphics.endFill;
			that.windowStage.addChild(graphics);
			
			graphics = new PIXI.Graphics();
			for(var i = 0; i < 72; i++)
			{
				graphics.lineStyle(1, 0xA63A24, 0.2);
				graphics.moveTo(698, 239+(3*i));
				graphics.lineTo(846, 239+(3*i));
			}
			that.windowStage.addChild(graphics);
			
			that.messageLineGraphics = new PIXI.Graphics(); 
			that.messageLineGraphics.lineStyle(10, 0xA63A24, 0.3);
			that.messageLineGraphics.moveTo(698, 243);
			that.messageLineGraphics.lineTo(846, 243);
			that.windowStage.addChild(that.messageLineGraphics);
		},
		
		droidRedMessage: function()
		{
			that.textMessage = new PIXI.Text(parent.initialization.mapMessage["LastNews"][1], that.styleDroidRedText); 
			that.textMessage.x = 700; 
			that.textMessage.y = 240; 
			that.windowStage.addChild(that.textMessage);
		},
		
		buttonsRed: function()
		{
			var textArr = ["КОМАНДА", "НАСТРОЙКИ"];
			var nameArr = ["Command", "Settings"];
			
			for(var i = 0; i < textArr.length; i++)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
				button.name = nameArr[i];
				button.position.x = 360 + (200 * i); 
				button.position.y = 670; 
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);

				var text = new PIXI.Text(textArr[i], that.styleButtonRedText); 
				text.x = button.width / 3.8;
				text.y = button.height / 3;

				button.addChild(text); 
				that.windowStage.addChild(button);
			}
			
			textArr = ["НАЗАД В МЕНЮ", "ПРИГЛАСИТЬ"];
			nameArr = ["BackMenu", "Invite"];
			
			for(var i = 0; i < textArr.length; i++)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
				button.name = nameArr[i];
				button.position.x = 10; 
				button.position.y = 10 + (545 * i); 
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);

				var text = new PIXI.Text(textArr[i], that.styleButtonRedText); 
				text.x = button.width / 3.8;
				text.y = button.height / 3;

				button.addChild(text); 
				that.windowStage.addChild(button);
			}
		},
		
		onButtonOver: function(e)
		{
			this.isOver = true;
			this.gotoAndPlay(1);
		},
		
		onButtonOut: function(e)
		{
			this.isOver = false;
			this.gotoAndStop(0);
		},
		
		onButtonUpdate: function(e)
		{
			if(this.isOver)
			{
				this.gotoAndPlay(1);
			}else{
				this.gotoAndStop(0);
			}
		},
		
		onButtonClick: function(e)
		{
                        parent.sound.soundPlayStarWarsButtonClick();
			switch (this.name)
			{
				case "Command":
					parent.commandShow();
					break;
				case "Settings":
					parent.settingsShow("menu_map");
					break;
				case "BackMenu":
					parent.backmenuShow();
					break;
				case "Invite":
					parent.vkInvite();
					break;
				default:
					break;
			}
		},
		
		targetsCreate: function()
		{
			that.targetPlanetRed = new PIXI.Graphics();
			that.targetPlanetRed.lineStyle(2, 0xFF0000, 0.5);
			that.targetPlanetRed.beginFill(0xFF0000, 0.2);
			that.targetPlanetRed.moveTo(0, -5);
			that.targetPlanetRed.lineTo(-15, -55);
			that.targetPlanetRed.lineTo(15, -55);
			that.targetPlanetRed.lineTo(0, -5);
			that.targetPlanetRed.endFill;
			
			that.targetPlanetRed.lineStyle(2, 0xFF0000, 0.5);
			that.targetPlanetRed.beginFill(0xFF0000, 0.2);
			that.targetPlanetRed.moveTo(0, 5);
			that.targetPlanetRed.lineTo(-15, 55);
			that.targetPlanetRed.lineTo(15, 55);
			that.targetPlanetRed.lineTo(0, 5);
			that.targetPlanetRed.endFill;
			
			that.targetPlanetRed.lineStyle(2, 0xFF0000, 0.5);
			that.targetPlanetRed.beginFill(0xFF0000, 0.2);
			that.targetPlanetRed.moveTo(-5, 0);
			that.targetPlanetRed.lineTo(-55, -15);
			that.targetPlanetRed.lineTo(-55, 15);
			that.targetPlanetRed.lineTo(-5, 0);
			that.targetPlanetRed.endFill;
			
			that.targetPlanetRed.lineStyle(2, 0xFF0000, 0.5);
			that.targetPlanetRed.beginFill(0xFF0000, 0.2);
			that.targetPlanetRed.moveTo(5, 0);
			that.targetPlanetRed.lineTo(55, -15);
			that.targetPlanetRed.lineTo(55, 15);
			that.targetPlanetRed.lineTo(5, 0);
			that.targetPlanetRed.endFill;
			
			that.targetPlanetRed.position.x = 100;
			that.targetPlanetRed.position.y = 100;
			that.targetPlanetRed.visible = false;
			that.mapSprite.addChild(that.targetPlanetRed);
			
			that.targetPlanetBlue = new PIXI.Graphics();
			that.targetPlanetBlue.lineStyle(2, 0x0000FF, 0.5);
			that.targetPlanetBlue.beginFill(0x0000FF, 0.5);
			that.targetPlanetBlue.moveTo(0, -5);
			that.targetPlanetBlue.lineTo(-15, -55);
			that.targetPlanetBlue.lineTo(15, -55);
			that.targetPlanetBlue.lineTo(0, -5);
			that.targetPlanetBlue.endFill;
			
			that.targetPlanetBlue.lineStyle(2, 0x0000FF, 0.5);
			that.targetPlanetBlue.beginFill(0x0000FF, 0.5);
			that.targetPlanetBlue.moveTo(0, 5);
			that.targetPlanetBlue.lineTo(-15, 55);
			that.targetPlanetBlue.lineTo(15, 55);
			that.targetPlanetBlue.lineTo(0, 5);
			that.targetPlanetBlue.endFill;
			
			that.targetPlanetBlue.lineStyle(2, 0x0000FF, 0.5);
			that.targetPlanetBlue.beginFill(0x0000FF, 0.5);
			that.targetPlanetBlue.moveTo(-5, 0);
			that.targetPlanetBlue.lineTo(-55, -15);
			that.targetPlanetBlue.lineTo(-55, 15);
			that.targetPlanetBlue.lineTo(-5, 0);
			that.targetPlanetBlue.endFill;
			
			that.targetPlanetBlue.lineStyle(2, 0x0000FF, 0.5);
			that.targetPlanetBlue.beginFill(0x0000FF, 0.5);
			that.targetPlanetBlue.moveTo(5, 0);
			that.targetPlanetBlue.lineTo(55, -15);
			that.targetPlanetBlue.lineTo(55, 15);
			that.targetPlanetBlue.lineTo(5, 0);
			that.targetPlanetBlue.endFill;
			
			that.targetPlanetBlue.position.x = 100;
			that.targetPlanetBlue.position.y = 100;
			that.targetPlanetBlue.visible = false;
			that.mapSprite.addChild(that.targetPlanetBlue);
		},
		
		targetSearch: function()
		{
			var target = new Object();
			target["planetUser"] = "";
			target["indexUser"] = 1000;
			target["planetAI"] = "";
			target["indexAI"] = 1000;
			
			for(var key in parent.initialization.planets)
			{
				if(parent.config.side === that.SIDE_JEDI)
				{
				   if(parent.initialization.planets[key].status !== parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI)
				   {
						var hitCount = 0;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack1 
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack2 
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack3 
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack5;
						hitCount /= 10;
						if(hitCount < target["indexUser"])
						{
						   target["planetUser"] = parent.initialization.planets[key].id; 
						   target["indexUser"] = hitCount;
						}
				   }
				   if(parent.initialization.planets[key].status !== parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH)
				   {
						var hitCount = 0;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack1 
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack2 
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack3 
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack5;
						hitCount /= 10;
						if(hitCount < target["indexAI"])
						{
						   target["planetAI"] = parent.initialization.planets[key].id; 
						   target["indexAI"] = hitCount;
						}
					}
				}
				
				if(parent.config.side === that.SIDE_SITH)
				{
				   if(parent.initialization.planets[key].status !== parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH)
				   {
						var hitCount = 0;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack1 
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack2 
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack3 
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack5;
						hitCount /= 10;
						if(hitCount < target["indexUser"])
						{
						   target["planetUser"] = parent.initialization.planets[key].id; 
						   target["indexUser"] = hitCount;
						}
				   }
				   if(parent.initialization.planets[key].status !== parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI)
				   {
						var hitCount = 0;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack1 
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack2 
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack3 
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack5;
						hitCount /= 10;
						if(hitCount < target["indexAI"])
						{
						   target["planetAI"] = parent.initialization.planets[key].id; 
						   target["indexAI"] = hitCount;
						}
					}
				}
			}

			if(parent.config.side === that.SIDE_JEDI)
			{
                            that.blueTargetsShow(target["planetUser"]);
                            if(parent.config.stopAI === false) that.redTargetsShow(target["planetAI"]);
                            that.targetAI = target["planetAI"];

                            if(parent.initialization.userTotalBattle === 0)
                            {
                                parent.initialization.mapMessage["LastNews"][0] = "Меня зовут R2D2, рад вас приветствовать.\n\nКорусант является основной целью Ситов." + " В данное время Дарт Вейдер напали на " + parent.initialization.planets[target["planetAI"]].name + " вы можите попытаться помешать ему. \n\nИли выполните миссию " + parent.initialization.planets[target["planetUser"]].name + " и получите нового союзника.";
                            }else{
                                if(parent.config.stopAI === false) parent.initialization.mapMessage["LastNews"][0] = "На планете " + parent.initialization.planets[target["planetUser"]].name + " нуждаются в нашей помощи. Выполните миссию "  + parent.initialization.planets[target["planetUser"]].name + " и вам будет доступен новый союзник. \n\nТак же мы получаем сигнал с планеты " + parent.initialization.planets[target["planetAI"]].name + " о вторжении Дарт Вейдера. Вы можите предпринять попытку отбить нападение на " + parent.initialization.planets[target["planetAI"]].name + ".";
                                else parent.initialization.mapMessage["LastNews"][0] = "На планете " + parent.initialization.planets[target["planetUser"]].name + " нуждаются в нашей помощи. Выполните миссию "  + parent.initialization.planets[target["planetUser"]].name + " и вам будет доступен новый союзник. \n\nПоражение Дарт Вейдера в прошлой битве даёт вам преимущество в один ход.";
                            }

                            that.textMessage.text = parent.initialization.mapMessage["LastNews"][0];
			}
			if(parent.config.side === that.SIDE_SITH)
			{
                            if(parent.config.stopAI === false) that.blueTargetsShow(target["planetAI"]);
                            that.redTargetsShow(target["planetUser"]);
                            that.targetAI = target["planetAI"];

                            if(parent.initialization.userTotalBattle === 0)
                            {
                                parent.initialization.mapMessage["LastNews"][1] = "Меня зовут R3-S6, приветствую тебя мой повелитель. \n\nДжедаи хотят разрушить Звезду смерти и помешать нашим планам." + " Они направелись на " + parent.initialization.planets[target["planetAI"]].name + " можем помешать им. \n\nИли напасть на " + parent.initialization.planets[target["planetUser"]].name + " и получите нового союзника.";
                            }else{
                                if(parent.config.stopAI === false) parent.initialization.mapMessage["LastNews"][1] = "Оборона планеты " + parent.initialization.planets[target["planetUser"]].name + " слаба мы с лёгкостью захватим её и вам будет доступен новый союзник. \n\nТак же наш шпион докладывает что Джедаи направились на " + parent.initialization.planets[target["planetAI"]].name + " можем помешать им.";
                                else parent.initialization.mapMessage["LastNews"][1] = "Оборона планеты " + parent.initialization.planets[target["planetUser"]].name + " слаба мы с лёгкостью захватим её и вам будет доступен новый союзник. \n\nПосле нашей победы над  Люком Скайуокером, Джедаи отступили и у нас есть преимущество в один ход.";
                            }

                            that.textMessage.text = parent.initialization.mapMessage["LastNews"][1];
			}
		},
	
		blueTargetsShow: function(planetName)
		{
			that.targetPlanetBlue.position.x = parent.initialization.mapPlanets[planetName][1].position.x + 40;
			that.targetPlanetBlue.position.y = parent.initialization.mapPlanets[planetName][1].position.y + 40;
			that.targetPlanetBlue.visible = true;
		},

		redTargetsShow: function(planetName)
		{
			that.targetPlanetRed.position.x = parent.initialization.mapPlanets[planetName][1].position.x + 40;
			that.targetPlanetRed.position.y = parent.initialization.mapPlanets[planetName][1].position.y + 40;
			that.targetPlanetRed.visible = true;
		},
	
		tweenStart: function()
		{
			createjs.Tween.get(that.desktopLineGraphics, {loop: true}) 
				.to({x: 0, y: 95}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Tween.get(that.messageLineGraphics, {loop: true}) 
				.to({x: 0, y: 205}, 2500, createjs.Ease.getPowInOut(3));
			 createjs.Tween.get(that.targetPlanetBlue, {loop: true}) 
				.to({rotation: 3.15 }, 2500, createjs.Ease.getPowInOut(1));
			createjs.Tween.get(that.targetPlanetRed, {loop: true}) 
				.to({rotation: 3.15 }, 2500, createjs.Ease.getPowInOut(1));
			
			createjs.Ticker.setFPS(60);
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.desktopLineGraphics);
			createjs.Tween.removeTweens(that.messageLineGraphics);
			createjs.Tween.removeTweens(that.targetPlanetBlue);
			createjs.Tween.removeTweens(that.targetPlanetRed);
		},
		
		show: function()
		{
			that.tweenStart();
			return that.windowStage;
		},
		
		close: function()
		{
			that.tweenStop();
			
			for(var child in that.mapSprite.children) that.mapSprite.removeChild(that.mapSprite.children[child]);
			that.mapSprite.destroy();
			delete that.mapSprite.children;
			
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);

			return that.windowStage;
		},
		
		getWindowStage: function()
		{
			return that.windowStage;
		},
		
		destroy: function()
		{
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			that.windowStage.destroy();
			delete that.windowStage.children;
			
			for(var property in that) that[property] = null;
		}
	};
	return that;
};

/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var Match3 = function(parent)
{
	var that = {
		
		MATCH_COLUMNS: 6,
		MATCH_ROWS: 6,
		MATCH_CELL_WIDTH: 82,
		MATCH_CELL_HEIGHT: 82,
		MATCH_CELL_TYPE_DROP: "CELL_TYPE_DROP",
		MATCH_CELL_TYPE_CLEAR: "CELL_TYPE_CLEAR",
		MATCH_CELL_TYPE_EMPTY: "CELL_TYPE_EMPTY",
		MATCH_HIT_0: "HIT_0",
		MATCH_HIT_1: "HIT_1",
		MATCH_HIT_2: "HIT_2",
		MATCH_HIT_3: "HIT_3",
		MATCH_HIT_4: "HIT_4",
		MATCH_HIT_5: "HIT_5",
		
		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		matchStage: null,													// главный stage
		matchMatrixCell: new Object(),								// Матрица ячеек игрового поля
		matchMatrixUnit: new Object(),						 		// Матрица юнитов на игровом поле

		matchMatrixFrontPosition: new Object(),					// Матрица позиций x,y юнитов игрового поля
		matchMatrixBackPosition: new Object(),					// Матрица позиций x,y юнитов за пределами игрового поля

		matchMoveDownProcesses: new Object(),				// запущенные процессы спуска юнитов

		matchSelectUnit1: null,											// выбранный первый юнит
		matchSelectUnit2: null,											// выбран второй юнит

		matchFieldBlocked: false,										// блокирование игрового поля

		modeAI: false,														// режим искуственного интелекта (по умолчанию отключен в начале)
                
                matchLevelJSON: null,											// json игрового поля
		
		/* Инициализация матриц позиций ================================================================ */
		initMatchMatrixPosition: function()
		{
			that.matchMatrixFrontPosition = new Object();
			that.matchMatrixBackPosition = new Object();
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
				for(var j = 0; j < that.MATCH_ROWS; j++)
				{
					that.matchMatrixFrontPosition["i"+i+":j"+j] = [184 + (that.MATCH_CELL_WIDTH * i), 120 + (that.MATCH_CELL_HEIGHT * j)]; // x,y
					that.matchMatrixBackPosition["i"+i+":j"+j] = [180 + (that.MATCH_CELL_WIDTH * i), -372 + (that.MATCH_CELL_HEIGHT * j)]; // x,y
				}
			}
		},
		
		/* Создание игрового поля ====================================================================== */
		createMatchField: function(levelJSON)
		{
			that.matchLevelJSON = levelJSON;
    
			that.initMatchMatrixPosition();
			
			that.matchStage = new PIXI.Container();
			that.matchMatrixCell = new Object();
			that.matchMatrixUnit = new Object();

			/* ячейки */
			var index = 0;
			for(var iCell = 0; iCell < that.MATCH_COLUMNS; iCell++)
			{
					for(var jCell = 0; jCell < that.MATCH_ROWS; jCell++)
					{
							if(levelJSON.data.Level.cell[index].cellType !== that.MATCH_CELL_TYPE_DROP)
							{
									var graphics = new PIXI.Graphics();
									if(parent.config.side === that.SIDE_JEDI)
									{
										graphics.lineStyle(1, 0x0080FF, 0.25);
										graphics.beginFill(0x0080FF, 0.25);
									}
									if(parent.config.side === that.SIDE_SITH)
									{
										graphics.lineStyle(1, 0x880000, 0.25);
										graphics.beginFill(0x880000, 0.25);
									}
									graphics.drawRoundedRect(0, 0, that.MATCH_CELL_WIDTH, that.MATCH_CELL_HEIGHT, 15);
									graphics.endFill();
									graphics.cellType = levelJSON.data.Level.cell[index].cellType;
									graphics.position.x = that.matchMatrixFrontPosition["i"+iCell+":j"+jCell][0];
									graphics.position.y = that.matchMatrixFrontPosition["i"+iCell+":j"+jCell][1];
									that.matchMatrixCell["i"+iCell+":j"+jCell] = graphics;
									that.matchStage.addChild(that.matchMatrixCell["i"+iCell+":j"+jCell]);
							}else{
									that.matchMatrixCell["i"+iCell+":j"+jCell] = null;
							}
							index++;
					}
			}

			/* Юниты */
			index = 0;
			var sprite;
			for(var iUnit = 0; iUnit < that.MATCH_COLUMNS; iUnit++)
			{
					for(var jUnit = 0; jUnit < that.MATCH_ROWS; jUnit++)
					{
                                                    if(levelJSON.data.Level.cell[index].cellObject !== that.MATCH_HIT_0)
                                                    {
									if(levelJSON.data.Level.cell[index].cellObject === that.MATCH_HIT_1) sprite = new PIXI.Sprite(parent.assets.getAsset("hit1Texture"));
									if(levelJSON.data.Level.cell[index].cellObject === that.MATCH_HIT_2) sprite = new PIXI.Sprite(parent.assets.getAsset("hit2Texture"));
									if(levelJSON.data.Level.cell[index].cellObject === that.MATCH_HIT_3) sprite = new PIXI.Sprite(parent.assets.getAsset("hit3Texture"));
									if(levelJSON.data.Level.cell[index].cellObject === that.MATCH_HIT_4) sprite = new PIXI.Sprite(parent.assets.getAsset("hit4Texture"));
									if(levelJSON.data.Level.cell[index].cellObject === that.MATCH_HIT_5) sprite = new PIXI.Sprite(parent.assets.getAsset("hit5Texture"));
									sprite.name = "i"+iUnit+":j"+jUnit;
									sprite.position.x = that.matchMatrixFrontPosition["i"+iUnit+":j"+jUnit][0];
									sprite.position.y = that.matchMatrixFrontPosition["i"+iUnit+":j"+jUnit][1];
									sprite.interactive = true;
									sprite.buttonMode = true;

									sprite.unitType = levelJSON.data.Level.cell[index].cellObject;
									sprite.flagRemove = false;
									sprite.posColumnI = iUnit;
									sprite.posRowJ = jUnit;
                                                                        
									sprite.click = that.onMatchUnitClick;
									sprite.tap = that.onMatchUnitClick;
                                                                        sprite.on('mousedown', that.onMatchUnitClick);
                                                                        sprite.on('touchstart', that.onMatchUnitClick);
                                                                        sprite.on('mouseup', that.onMatchUnitEndClick);
                                                                        sprite.on('touchend', that.onMatchUnitEndClick);
                                                                        
									that.matchMatrixUnit["i"+iUnit+":j"+jUnit] = sprite;
									that.matchStage.addChild(that.matchMatrixUnit["i"+iUnit+":j"+jUnit]);
						   }else{
									sprite = new PIXI.Sprite(parent.assets.getAsset("hit1Texture"));
									sprite.name = "i"+iUnit+":j"+jUnit;
									sprite.position.x = that.matchMatrixFrontPosition["i"+iUnit+":j"+jUnit][0];
									sprite.position.y = that.matchMatrixFrontPosition["i"+iUnit+":j"+jUnit][1];
									sprite.unitType = that.MATCH_HIT_0;
									sprite.flagRemove = false;
									sprite.posColumnI = iUnit;
									sprite.posRowJ = jUnit;
									that.matchMatrixUnit["i"+iUnit+":j"+jUnit] = sprite;
                                                    }
                                                    index++;
					}
			}
			that.matchMask();
		},
		
		/* Событие: нажатие на юнит */
		onMatchUnitClick: function()
		{
                        if(that.matchFieldBlocked === false)
			{
					that.matchCellColorSelect(this.unitType, this.posColumnI, this.posRowJ);
					if(that.matchSelectUnit1 === null) 
					{
							that.matchSelectUnit1 = this;
					}else{
							if(that.matchSelectUnit2 === null) 
							{
									that.matchSelectUnit2 = this;
									that.matchExchangeUnits(); // меняем юниты местами
							}
					}
			}
		},
                
                /* Событие: свайп кристалов */
                onMatchUnitEndClick: function()
                {
                    if(that.matchFieldBlocked === false)
                    {
                                    that.matchCellColorSelect(this.unitType, this.posColumnI, this.posRowJ);
                                    if(that.matchSelectUnit1 === null) 
                                    {
                                                    that.matchSelectUnit1 = this;
                                    }else{
                                                    if(that.matchSelectUnit2 === null) 
                                                    {
                                                                    that.matchSelectUnit2 = this;
                                                                    that.matchExchangeUnits(); // меняем юниты местами
                                                    }
                                    }
                    }
                },
                
		/* Определение цвета ячеек Cell игрового поля ================================================= */
		matchCellColorSelect: function(unitType, colI, rowJ)
		{
			that.matchMatrixCell["i"+colI+":j"+rowJ].clear();
			if(parent.config.side === that.SIDE_JEDI) that.matchMatrixCell["i"+colI+":j"+rowJ].lineStyle(1, 0x0080FF, 0.25);
			if(parent.config.side === that.SIDE_SITH) that.matchMatrixCell["i"+colI+":j"+rowJ].lineStyle(1, 0x880000, 0.25);
			if(unitType === that.MATCH_HIT_1) that.matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0xFFFF80, 0.50);
			if(unitType === that.MATCH_HIT_2) that.matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0xFF0000, 0.50);
			if(unitType === that.MATCH_HIT_3) that.matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0xFF00FF, 0.50);
			if(unitType === that.MATCH_HIT_4) that.matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0x0080FF, 0.50);
			if(unitType === that.MATCH_HIT_5) that.matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0x00FF80, 0.50);
			that.matchMatrixCell["i"+colI+":j"+rowJ].drawRoundedRect(0, 0, that.MATCH_CELL_WIDTH, that.MATCH_CELL_HEIGHT, 15);
			that.matchMatrixCell["i"+colI+":j"+rowJ].endFill();
		},	
		
		matchCellColorBack: function()
		{
			if(that.matchSelectUnit1 !== null)
			{
					that.matchMatrixCell["i"+that.matchSelectUnit1.posColumnI+":j"+that.matchSelectUnit1.posRowJ].clear();
					if(parent.config.side === that.SIDE_JEDI)
					{
						that.matchMatrixCell["i"+that.matchSelectUnit1.posColumnI+":j"+that.matchSelectUnit1.posRowJ].lineStyle(1, 0x0080FF, 0.25);
						that.matchMatrixCell["i"+that.matchSelectUnit1.posColumnI+":j"+that.matchSelectUnit1.posRowJ].beginFill(0x0080FF, 0.25);
					}
					if(parent.config.side === that.SIDE_SITH)
					{
						that.matchMatrixCell["i"+that.matchSelectUnit1.posColumnI+":j"+that.matchSelectUnit1.posRowJ].lineStyle(1, 0x880000, 0.25);
						that.matchMatrixCell["i"+that.matchSelectUnit1.posColumnI+":j"+that.matchSelectUnit1.posRowJ].beginFill(0x880000, 0.25);
					}
					that.matchMatrixCell["i"+that.matchSelectUnit1.posColumnI+":j"+that.matchSelectUnit1.posRowJ].drawRoundedRect(0, 0, that.MATCH_CELL_WIDTH, that.MATCH_CELL_HEIGHT, 15);
					that.matchMatrixCell["i"+that.matchSelectUnit1.posColumnI+":j"+that.matchSelectUnit1.posRowJ].endFill();
			}
			if(that.matchSelectUnit2 !== null)
			{
					that.matchMatrixCell["i"+that.matchSelectUnit2.posColumnI+":j"+that.matchSelectUnit2.posRowJ].clear();
					if(parent.config.side === that.SIDE_JEDI)
					{
						that.matchMatrixCell["i"+that.matchSelectUnit2.posColumnI+":j"+that.matchSelectUnit2.posRowJ].lineStyle(1, 0x0080FF, 0.25);
						that.matchMatrixCell["i"+that.matchSelectUnit2.posColumnI+":j"+that.matchSelectUnit2.posRowJ].beginFill(0x0080FF, 0.25);
					}
					if(parent.config.side === that.SIDE_SITH)
					{
						that.matchMatrixCell["i"+that.matchSelectUnit2.posColumnI+":j"+that.matchSelectUnit2.posRowJ].lineStyle(1, 0x880000, 0.25);
						that.matchMatrixCell["i"+that.matchSelectUnit2.posColumnI+":j"+that.matchSelectUnit2.posRowJ].beginFill(0x880000, 0.25);
					}
					that.matchMatrixCell["i"+that.matchSelectUnit2.posColumnI+":j"+that.matchSelectUnit2.posRowJ].drawRoundedRect(0, 0, that.MATCH_CELL_WIDTH, that.MATCH_CELL_HEIGHT, 15);
					that.matchMatrixCell["i"+that.matchSelectUnit2.posColumnI+":j"+that.matchSelectUnit2.posRowJ].endFill();
			}
		},
		
		/* Обмен местами в массиве выбранных пользователем  объектов =================================== */
		matchExchangeUnits: function()
		{
			that.matchFieldBlocked = true; // поле заблокированно

			var iUnit1 = that.matchSelectUnit1.posColumnI;
			var jUnit1 = that.matchSelectUnit1.posRowJ;
			var iUnit2 = that.matchSelectUnit2.posColumnI;
			var jUnit2 = that.matchSelectUnit2.posRowJ;

			if(iUnit2 > (iUnit1 - 2) && iUnit2 < (iUnit1 + 2) && jUnit2 > (jUnit1 - 2) && jUnit2 < (jUnit1 + 2) && ((iUnit2 === iUnit1 && jUnit2 !== jUnit1) || (jUnit2 === jUnit1 && iUnit2 !== iUnit1)))
			{
					that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1] = that.matchSelectUnit2;
					that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1].posColumnI = iUnit1;
					that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1].posRowJ = jUnit1;
					that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1].name = "i"+iUnit1+":j"+jUnit1;

					that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2] = that.matchSelectUnit1;
					that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2].posColumnI = iUnit2;
					that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2].posRowJ = jUnit2;
					that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2].name = "i"+iUnit2+":j"+jUnit2;

					createjs.Tween.get(that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1], {loop: false})
							.to({x: that.matchMatrixFrontPosition["i"+iUnit1+":j"+jUnit1][0], y: that.matchMatrixFrontPosition["i"+iUnit1+":j"+jUnit1][1]}, 500, createjs.Ease.getPowInOut(4));
					createjs.Tween.get(that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2], {loop: false})
							.to({x: that.matchMatrixFrontPosition["i"+iUnit2+":j"+jUnit2][0], y: that.matchMatrixFrontPosition["i"+iUnit2+":j"+jUnit2][1]}, 500, createjs.Ease.getPowInOut(4))
							.call(that.onCompleteMatchExchangeUnits); // событие выполнено
					createjs.Ticker.setFPS(60);	

			}else{
					that.matchCellColorBack();
					that.matchSelectUnitsClear();
			}
		},
		
		onCompleteMatchExchangeUnits: function()
		{
			that.matchCellColorBack();
			that.matchCheckField(false);
		},
		
		matchBackExchangeUnits: function()
		{
			var iUnit1 = that.matchSelectUnit1.posColumnI;
			var jUnit1 = that.matchSelectUnit1.posRowJ;
			var iUnit2 = that.matchSelectUnit2.posColumnI;
			var jUnit2 = that.matchSelectUnit2.posRowJ;

			that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1] = that.matchSelectUnit2;
			that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1].posColumnI = iUnit1;
			that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1].posRowJ = jUnit1;
			that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1].name = "i"+iUnit1+":j"+jUnit1;

			that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2] = that.matchSelectUnit1;
			that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2].posColumnI = iUnit2;
			that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2].posRowJ = jUnit2;
			that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2].name = "i"+iUnit2+":j"+jUnit2;

			createjs.Tween.get(that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1], {loop: false})
					.to({x: that.matchMatrixFrontPosition["i"+iUnit1+":j"+jUnit1][0], y: that.matchMatrixFrontPosition["i"+iUnit1+":j"+jUnit1][1]}, 500, createjs.Ease.getPowInOut(4));
			createjs.Tween.get(that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2], {loop: false})
					.to({x: that.matchMatrixFrontPosition["i"+iUnit2+":j"+jUnit2][0], y: that.matchMatrixFrontPosition["i"+iUnit2+":j"+jUnit2][1]}, 500, createjs.Ease.getPowInOut(4))
					.call(that.matchSelectUnitsClear); // очистка и разблокиров поля
			createjs.Ticker.setFPS(60);	
		},
		
		matchSelectUnitsClear: function()
		{
			that.matchSelectUnit1 = null;
			that.matchSelectUnit2 = null;
			that.matchFieldBlocked = false; // поле разблокированно
		},
		
		/* Поиск групп ============================================================================== */
		matchCheckField: function(afterDown)
		{
                    if(parent.level !== null)
                    {
			that.matchMoveDownProcesses = new Object();
			if(that.matchCheckFieldFull()) // группы были найдены
			{
                                parent.timer.timerStop();			// останавливаем таймер
                                that.matchMoveDownUnits();	// спускаем юниты
			}else{ // группы не найдены
                                if(afterDown === false) // первый спуск юнитов
                                {
                                    that.matchBackExchangeUnits(); 	// возвращаем выбранные юниты на места
                                }else{ 
                                    that.matchSelectUnitsClear();	// очистка и разблокиров поля
                                    if(parent.level.levelStatus === parent.level.LEVEL_STATUS_BATTLE) parent.timer.timerStart();				// запускаем таймер
                                }
			}
                    }else{
                        parent.matchClose(); // УДАЛЯЕТСЯ ТРИ В РЯД ЕСЛИ НЕТ УРОВНЯ
                    }
		},
		
		/* Общая проверка колонок и строк (3-и и более в ряд) */
		matchCheckFieldFull: function()
		{
			var resultCheck = false;
			/* i - столбец; j - строка */
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
					if(that.matchCheckColumn(i) === true) resultCheck = true;
			}
			for(var j = 0; j < that.MATCH_ROWS; j++)
			{
					if(that.matchCheckRow(j) === true) resultCheck = true;	
			}
			return resultCheck;
		},
		
		/* Проверка колонки (3-и и более в ряд) */
		matchCheckColumn: function(column)
		{
			var resultCheckColumn = false;
			/* просматриваем  в столбце (по строкам) */
			for(var j = 0; j < that.MATCH_ROWS; j++)
			{
				if(j < that.MATCH_ROWS - 2)
				{
					if(that.matchMatrixUnit["i"+column+":j"+j].unitType !== that.MATCH_HIT_0)
					{
						/* Группа из 3-х объектов */
						if(that.matchMatrixUnit["i"+column+":j"+j].unitType === that.matchMatrixUnit["i"+column+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+column+":j"+j].unitType === that.matchMatrixUnit["i"+column+":j"+(j+2)].unitType)
						{
							resultCheckColumn = true;

							/* Группа из 4-х кристалов */
							if(j < that.MATCH_ROWS - 3)
							{
								if(that.matchMatrixUnit["i"+column+":j"+j].unitType === that.matchMatrixUnit["i"+column+":j"+(j+3)].unitType)
								{
									/* Группа из 5-ти кристалов */
									if(j < that.MATCH_ROWS - 4)
									{
										if(that.matchMatrixUnit["i"+column+":j"+j].unitType === that.matchMatrixUnit["i"+column+":j"+(j+4)].unitType)
										{
											/* Удаляем группу из 5 юнитов */
											that.matchRemoveUnit(column, j, "col", that.matchMatrixUnit["i"+column+":j"+j].unitType, 5);
                                                                                        j += 2;
										}else{
											/* Удаляем группу из 4 юнитов */
											that.matchRemoveUnit(column, j, "col", that.matchMatrixUnit["i"+column+":j"+j].unitType, 4);
                                                                                        j += 1;
										}
									}else{
										/* Удаляем группу из 4 юнитов */
										that.matchRemoveUnit(column, j, "col", that.matchMatrixUnit["i"+column+":j"+j].unitType, 4);
                                                                                j += 1;
									}
								}else{
									/* Удаляем группу из 3 юнитов */
									that.matchRemoveUnit(column, j, "col", that.matchMatrixUnit["i"+column+":j"+j].unitType, 3);
								}
							}else{
								/* Удаляем группу из 3 юнитов */
								that.matchRemoveUnit(column, j, "col", that.matchMatrixUnit["i"+column+":j"+j].unitType, 3);
							}
						}
					}
				}else{
					break;
				}
			}
			return resultCheckColumn;
		},
		
		/* Проверка строки (3-и и более в ряд) */
		matchCheckRow: function(row)
		{
			var resultCheckRow = false;
			/* просматриваем в строке (по столбцам) */
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
				if(i < that.MATCH_COLUMNS - 2)
				{
					if(that.matchMatrixUnit["i"+i+":j"+row].unitType !== that.MATCH_HIT_0)
					{
						/* Группа из 3-х объектов */
						if(that.matchMatrixUnit["i"+i+":j"+row].unitType === that.matchMatrixUnit["i"+(i+1)+":j"+row].unitType && that.matchMatrixUnit["i"+i+":j"+row].unitType === that.matchMatrixUnit["i"+(i+2)+":j"+row].unitType)
						{
							resultCheckRow = true;

							/* Группа из 4-х кристалов */
							if(i < that.MATCH_COLUMNS - 3)
							{
								if(that.matchMatrixUnit["i"+i+":j"+row].unitType === that.matchMatrixUnit["i"+(i+3)+":j"+row].unitType)
								{
									/* Группа из 5-ти кристалов */
									if(i < that.MATCH_COLUMNS - 4)
									{
										if(that.matchMatrixUnit["i"+i+":j"+row].unitType === that.matchMatrixUnit["i"+(i+4)+":j"+row].unitType)
										{
											/* Удаляем группу из 5 юнитов */
											that.matchRemoveUnit(i, row, "row", that.matchMatrixUnit["i"+i+":j"+row].unitType, 5);
                                                                                        i += 2;
										}else{
											/* Удаляем группу из 4 юнитов */
											that.matchRemoveUnit(i, row, "row", that.matchMatrixUnit["i"+i+":j"+row].unitType, 4);
                                                                                        i += 1;
										}
									}else{
										/* Удаляем группу из 4 юнитов */
										that.matchRemoveUnit(i, row, "row", that.matchMatrixUnit["i"+i+":j"+row].unitType, 4);
                                                                                i += 1;
									}
								}else{
									/* Удаляем группу из 3 юнитов */
									that.matchRemoveUnit(i, row, "row", that.matchMatrixUnit["i"+i+":j"+row].unitType, 3);
								}
							}else{
								/* Удаляем группу из 3 юнитов */
								that.matchRemoveUnit(i, row, "row", that.matchMatrixUnit["i"+i+":j"+row].unitType, 3);
							}
						}
					}
				}else{
					break;
				}
			}
			return resultCheckRow;
		},
		
		/* Удаление юнитов */
		matchRemoveUnit: function(col, row, check, hitType, hitCount)
		{
                    /*
                        if(parent.level === null)
                        {
                            console.log("!!!!!!!!!");
                            //parent.timer.timerStop();
                            parent.timerClose();
                            parent.matchClose();
                            return;
                        }
                    */    
			if(parent.level.levelStatus === parent.level.LEVEL_STATUS_BATTLE)
			{
				/* ПРОГРЕСС: Обрабтка LifeBar */
                                //console.log("Количество: " + hitCount + "(Тип удара: " + hitType + ")");
				parent.level.levelReduceLifeBar(hitType, hitCount, that.modeAI);
                                /* АНИМАЦИЯ: Анимация бойцов */
				//levelUpdateAnimation(that.modeAI, hitType); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			}
			
			/*Отмечаем юниты для удаления */
			if(check === "row")
			{
				if(hitCount === 3)
				{
					that.matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+row].position.x, that.matchMatrixUnit["i"+col+":j"+row].position.y); // анимация вспышка.
					that.matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+row].position.x = that.matchMatrixBackPosition["i"+col+":j"+row][0];
					that.matchMatrixUnit["i"+col+":j"+row].position.y = that.matchMatrixBackPosition["i"+col+":j"+row][1];
					that.matchMoveDownProcesses["i"+col+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+1)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+1)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+1)+":j"+row].position.y); // анимация вспышка.
					that.matchMatrixUnit["i"+(col+1)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+1)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+1)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+1)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+1)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+1)+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+2)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+2)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+2)+":j"+row].position.y); // анимация вспышка.
					that.matchMatrixUnit["i"+(col+2)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+2)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+2)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+2)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+2)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+2)+":j"+row] = true;
					
				}
				if(hitCount === 4)
				{
					that.matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+row].position.x, that.matchMatrixUnit["i"+col+":j"+row].position.y);
					that.matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+row].position.x = that.matchMatrixBackPosition["i"+col+":j"+row][0];
					that.matchMatrixUnit["i"+col+":j"+row].position.y = that.matchMatrixBackPosition["i"+col+":j"+row][1];
					that.matchMoveDownProcesses["i"+col+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+1)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+1)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+1)+":j"+row].position.y);
					that.matchMatrixUnit["i"+(col+1)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+1)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+1)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+1)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+1)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+1)+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+2)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+2)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+2)+":j"+row].position.y);
					that.matchMatrixUnit["i"+(col+2)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+2)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+2)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+2)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+2)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+2)+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+3)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+3)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+3)+":j"+row].position.y);
					that.matchMatrixUnit["i"+(col+3)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+3)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+3)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+3)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+3)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+3)+":j"+row] = true;
				}
				if(hitCount === 5)
				{
					that.matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+row].position.x, that.matchMatrixUnit["i"+col+":j"+row].position.y);
					that.matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+row].position.x = that.matchMatrixBackPosition["i"+col+":j"+row][0];
					that.matchMatrixUnit["i"+col+":j"+row].position.y = that.matchMatrixBackPosition["i"+col+":j"+row][1];
					that.matchMoveDownProcesses["i"+col+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+1)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+1)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+1)+":j"+row].position.y);
					that.matchMatrixUnit["i"+(col+1)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+1)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+1)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+1)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+1)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+1)+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+2)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+2)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+2)+":j"+row].position.y);
					that.matchMatrixUnit["i"+(col+2)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+2)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+2)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+2)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+2)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+2)+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+3)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+3)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+3)+":j"+row].position.y);
					that.matchMatrixUnit["i"+(col+3)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+3)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+3)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+3)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+3)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+3)+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+4)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+4)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+4)+":j"+row].position.y);
					that.matchMatrixUnit["i"+(col+4)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+4)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+4)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+4)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+4)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+4)+":j"+row] = true;
				}
			}
			if(check === "col")
			{
				if(hitCount === 3)
				{
					
					that.matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+row].position.x, that.matchMatrixUnit["i"+col+":j"+row].position.y);
					that.matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+row].position.x = that.matchMatrixBackPosition["i"+col+":j"+row][0];
					that.matchMatrixUnit["i"+col+":j"+row].position.y = that.matchMatrixBackPosition["i"+col+":j"+row][1];
					that.matchMoveDownProcesses["i"+col+":j"+row] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+1)].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+1)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+1)].position.y);
					that.matchMatrixUnit["i"+col+":j"+(row+1)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+1)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+1)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+1)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+1)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+1)] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+2)].alpha = 0.0;	
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+2)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+2)].position.y);
					that.matchMatrixUnit["i"+col+":j"+(row+2)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+2)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+2)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+2)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+2)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+2)] = true;
				}
				if(hitCount === 4)
				{
					that.matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+row].position.x, that.matchMatrixUnit["i"+col+":j"+row].position.y);
					that.matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+row].position.x = that.matchMatrixBackPosition["i"+col+":j"+row][0];
					that.matchMatrixUnit["i"+col+":j"+row].position.y = that.matchMatrixBackPosition["i"+col+":j"+row][1];
					that.matchMoveDownProcesses["i"+col+":j"+row] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+1)].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+1)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+1)].position.y);
					that.matchMatrixUnit["i"+col+":j"+(row+1)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+1)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+1)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+1)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+1)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+1)] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+2)].alpha = 0.0;	
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+2)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+2)].position.y);
					that.matchMatrixUnit["i"+col+":j"+(row+2)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+2)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+2)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+2)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+2)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+2)] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+3)].alpha = 0.0;	
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+3)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+3)].position.y);			
					that.matchMatrixUnit["i"+col+":j"+(row+3)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+3)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+3)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+3)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+3)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+3)] = true;
				}
				if(hitCount === 5)
				{
					that.matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+row].position.x, that.matchMatrixUnit["i"+col+":j"+row].position.y);
					that.matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+row].position.x = that.matchMatrixBackPosition["i"+col+":j"+row][0];
					that.matchMatrixUnit["i"+col+":j"+row].position.y = that.matchMatrixBackPosition["i"+col+":j"+row][1];
					that.matchMoveDownProcesses["i"+col+":j"+row] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+1)].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+1)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+1)].position.y);
					that.matchMatrixUnit["i"+col+":j"+(row+1)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+1)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+1)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+1)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+1)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+1)] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+2)].alpha = 0.0;	
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+2)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+2)].position.y);
					that.matchMatrixUnit["i"+col+":j"+(row+2)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+2)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+2)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+2)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+2)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+2)] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+3)].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+3)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+3)].position.y);			
					that.matchMatrixUnit["i"+col+":j"+(row+3)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+3)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+3)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+3)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+3)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+3)] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+4)].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+4)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+4)].position.y);
					that.matchMatrixUnit["i"+col+":j"+(row+4)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+4)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+4)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+4)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+4)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+4)] = true;
				}
			}
		},
		
		/* Спуск юнитов вниз на свободные позиции */
		matchMoveDownUnits: function()
		{
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
				for(var j = that.MATCH_ROWS-1; j >= 0; j--)
				{
					if(that.matchMatrixUnit["i"+i+":j"+j].flagRemove === true && that.matchMatrixUnit["i"+i+":j"+j].unitType !== that.MATCH_HIT_0)
					{
						/* Спускаем вниз оставщиеся юниты */
						for(var k = j; k >= 0; k--)
						{
							if(that.matchMatrixUnit["i"+i+":j"+k].flagRemove === false && that.matchMatrixUnit["i"+i+":j"+k].unitType !== that.MATCH_HIT_0)
							{
								var removeUnit = that.matchMatrixUnit["i"+i+":j"+j]; // удалённый юнит

								that.matchMatrixUnit["i"+i+":j"+j] = that.matchMatrixUnit["i"+i+":j"+k]; // перемещаем не удалённый юнит
								that.matchMatrixUnit["i"+i+":j"+j].name = "i"+i+":j"+j;
								that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
								that.matchMatrixUnit["i"+i+":j"+j].posColumnI = i;
								that.matchMatrixUnit["i"+i+":j"+j].posRowJ = j;
								that.matchMoveDownProcesses["i"+i+":j"+j] = true;

								that.matchMatrixUnit["i"+i+":j"+k] = removeUnit;	// удалённый юнит ставим на место перемещённой
								that.matchMatrixUnit["i"+i+":j"+k].name = "i"+i+":j"+k;
								that.matchMatrixUnit["i"+i+":j"+k].flagRemove = true;
								that.matchMatrixUnit["i"+i+":j"+k].posColumnI = i;
								that.matchMatrixUnit["i"+i+":j"+k].posRowJ = k;
								that.matchMoveDownProcesses["i"+i+":j"+k] = true;
								
								break;
							}
						}
					}
				}
			}
			that.matchMoveDownNewUnits();
		},
		
		onCompleteMatchMoveDownUnits: function()
		{
			that.matchMoveDownNewUnits();
		},
		
		matchMoveDownNewUnits: function()
		{
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
					for(var j = that.MATCH_ROWS-1; j >= 0; j--)
					{
							if(that.matchMoveDownProcesses["i"+i+":j"+j] === true && that.matchMatrixUnit["i"+i+":j"+j].flagRemove === false && that.matchMatrixUnit["i"+i+":j"+j].unitType !== that.MATCH_HIT_0)
							{
									that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
									/* Спускаем удалённые юниты */
									createjs.Tween.get(that.matchMatrixUnit["i"+i+":j"+j], {loop: false})
											.to({alpha: 1.0}, 500)
											.to({x: that.matchMatrixFrontPosition["i"+i+":j"+j][0], y: that.matchMatrixFrontPosition["i"+i+":j"+j][1]}, 500, createjs.Ease.getPowInOut(4))
											.to({x: that.matchMatrixFrontPosition["i"+i+":j"+j][0], y: that.matchMatrixFrontPosition["i"+i+":j"+j][1] - 5}, 100, createjs.Ease.getPowInOut(4))
											.to({x: that.matchMatrixFrontPosition["i"+i+":j"+j][0], y: that.matchMatrixFrontPosition["i"+i+":j"+j][1]}, 50, createjs.Ease.getPowInOut(4))
											.call(that.onCompleteMatchMoveDownNewUnits, this); // событие выполнено
									createjs.Ticker.setFPS(60);	
							}else{
									if(that.matchMoveDownProcesses["i"+i+":j"+j] === true && that.matchMatrixUnit["i"+i+":j"+j].flagRemove === true && that.matchMatrixUnit["i"+i+":j"+j].unitType !== that.MATCH_HIT_0)
									{
											var indexRandom = Math.random() / 0.1;
											var index = Math.round(indexRandom);
											if (index >= 0 && index <= 2) 
											{
													that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit1Texture");
													that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_1;
													that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
											}
											if (index > 2 && index <= 4)
											{
													that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit2Texture");
													that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_2;
													that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
											}
											if (index > 4 && index <= 6)
											{
													that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit3Texture");
													that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_3;
													that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
											}
											if (index > 6 && index <= 8)
											{
													that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit4Texture");
													that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_4;
													that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
											}
											if (index > 8 && index <= 10)
											{
													that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit5Texture");
													that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_5;
													that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
											}

											/* Спускаем удалённые юниты */
											createjs.Tween.get(that.matchMatrixUnit["i"+i+":j"+j], {loop: false})
													.to({alpha: 1.0}, 500)
													.to({x: that.matchMatrixFrontPosition["i"+i+":j"+j][0], y: that.matchMatrixFrontPosition["i"+i+":j"+j][1]}, 500, createjs.Ease.getPowInOut(4))
													.to({x: that.matchMatrixFrontPosition["i"+i+":j"+j][0], y: that.matchMatrixFrontPosition["i"+i+":j"+j][1] - 5}, 100, createjs.Ease.getPowInOut(4))
													.to({x: that.matchMatrixFrontPosition["i"+i+":j"+j][0], y: that.matchMatrixFrontPosition["i"+i+":j"+j][1]}, 50, createjs.Ease.getPowInOut(4))
													.call(that.onCompleteMatchMoveDownNewUnits, this); // событие выполнено
											createjs.Ticker.setFPS(60);
									}
							}
					}
			}
		},
		
		onCompleteMatchMoveDownNewUnits: function()
		{
			var result = false;
			that.matchMoveDownProcesses[this.name] = false;
			for(var key in that.matchMoveDownProcesses)
			{
					if(that.matchMoveDownProcesses[key] === true){
							result = true;
							break;	
					} 
			}
			if(result == false) // анимация завершена
			{
					if(that.matchCheckCombinations() === true) // Возможные ходы определены
					{
							that.matchCheckField(true);	// проверка групп 3-и в ряд
					}else{	// нет возможности ходов
							that.matchUpdateField(); // обновление игрового поля
					}
			}
		},
		
		/* Определение возможности хода и перестановка в случае отсутствия такой возможности ========== */
		matchCheckCombinations: function()
		{
			/*	   0  1  2  3  4  5
			* 	0:[0][0][0][0][1][0]
				1:[0][0][1][1][0][1]
				2:[0][0][0][0][1][0]
				3:[0][0][0][0][0][0]
				4:[0][0][0][0][0][0]
				5:[0][0][0][0][0][0]
			 * */
			// Проверка строк и колонок
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
				for(var j = 0; j < that.MATCH_ROWS; j++)
				{
					if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0)
					{
						// ПРОВЕРКА СТРОКИ
						if(j == 0)
						{
							//[1][1][X][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) { return true; }
								}
							}
							//[1][X][1][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) { return true; }
								}
							}
							//[0][1][X][1]
							//[0][0][1][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
								}
							}
							//[0][1][1][X]
							//[0][0][0][1]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) { return true; }
								}
							}
							//[0][X][1][1]
							//[0][1][0][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
								}
							}
						}else{
							//[1][1][X][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) { return true; }
								}
							}
							//[1][X][1][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) { return true; }
								}
							}
							//[0][1][1][X]
							//[0][0][0][1]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) { return true; }
								}
							}
							//[0][0][0][1]
							//[0][1][1][X]
							if((i + 2) < that.MATCH_COLUMNS && (j - 1) >=0){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+(j-1)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j-1)].unitType) { return true; }
								}
							}
							//[0][X][1][1]
							//[0][1][0][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
								}
							}
							//[0][1][0][0]
							//[0][X][1][1]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) { return true; }
								}
							}
							//[0][0][1][0]
							//[0][1][X][1]
							if((i + 2) < that.MATCH_COLUMNS && (j - 1) >= 0){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j-1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j-1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
								}
							}
							//[0][1][X][1]
							//[0][0][1][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
								}
							}
						}

						// ПРОВЕРКА КОЛОНКИ
						if(i == 0)
						{
							//[1]
							//[1]
							//[X]
							//[1]
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) { return true; }
								}
							}
							//[1]
							//[X]
							//[1]
							//[1]
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) { return true; }
								}
							}
							//[1][0]
							//[X][1]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
								}
							}
							//[1][0]
							//[1][0]
							//[X][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType) { return true; }
								}
							}
							//[X][1]
							//[1][0]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
								}
							}
						}else{
							//[1]
							//[1]
							//[X]
							//[1]
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) { return true; }
								}
							}
							//[1]
							//[X]
							//[1]
							//[1]
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) { return true; }
								}
							}
							//[1][0]
							//[X][1]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
								}
							}
							//[0][1]
							//[1][X]
							//[0][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i - 1) >= 0){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i-1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i-1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
								}
							}
							//[1][0]
							//[1][0]
							//[X][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType) { return true; }
								}
							}
							//[X][1]
							//[1][0]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
								}
							}
							//[0][1]
							//[0][1]
							//[1][X]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i - 1) >= 0){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i-1)+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i-1)+":j"+(j+2)].unitType) { return true; }
								}
							}
							//[1][X]
							//[0][1]
							//[0][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i - 1) >= 0){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i-1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+(i-1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+(i-1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
								}
							}
						}
					}
				}
			}
			return false;
		},
		
		/* Обновление игрового поля если нет комбинаций ===================================================== */
		matchUpdateField: function()
		{
			that.matchMoveDownProcesses = new Object();
				
			var indexRandom = Math.random() / 0.1;
			var indexLevel = Math.round(indexRandom);
			
            var index = 0;
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
				for(var j = 0; j < that.MATCH_ROWS; j++)
				{
					if(that.matchLevelJSON.data.Level.cell[index].cellObject !== that.MATCH_HIT_0)
					{
						//that.matchMatrixUnit["i"+i+":j"+j].alpha = 0.0;
						that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
						that.matchMatrixUnit["i"+i+":j"+j].position.x = that.matchMatrixBackPosition["i"+i+":j"+j][0];
						that.matchMatrixUnit["i"+i+":j"+j].position.y = that.matchMatrixBackPosition["i"+i+":j"+j][1];
						that.matchMoveDownProcesses["i"+i+":j"+j] = true;
						
						if(parent.assets.getAsset("fieldLevelsJson")["level_0_" + indexLevel].data.Level.cell[index].cellObject === that.MATCH_HIT_1)
						{
							that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit1Texture");
							that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_1;
						}
						if(parent.assets.getAsset("fieldLevelsJson")["level_0_" + indexLevel].data.Level.cell[index].cellObject === that.MATCH_HIT_2)
						{
							that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit2Texture");
							that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_2;
						}
						if(parent.assets.getAsset("fieldLevelsJson")["level_0_" + indexLevel].data.Level.cell[index].cellObject === that.MATCH_HIT_3)
						{
							that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit3Texture");
							that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_3;
						}
						if(parent.assets.getAsset("fieldLevelsJson")["level_0_" + indexLevel].data.Level.cell[index].cellObject === that.MATCH_HIT_4)
						{
							that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit4Texture");
							that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_4;
						}
						if(parent.assets.getAsset("fieldLevelsJson")["level_0_" + indexLevel].data.Level.cell[index].cellObject === that.MATCH_HIT_5)
						{
							that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit5Texture");
							that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_5;
						}
						
						/* Спускаем удалённые юниты */
						createjs.Tween.get(that.matchMatrixUnit["i"+i+":j"+j], {loop: false})
							.to({alpha: 1.0}, 500)
							.to({x: that.matchMatrixFrontPosition["i"+i+":j"+j][0], y: that.matchMatrixFrontPosition["i"+i+":j"+j][1]}, 500, createjs.Ease.getPowInOut(4))
							.call(that.onCompleteMatchMoveDownNewUnits, that.matchMatrixUnit["i"+i+":j"+j]); // событие выполнено
						createjs.Ticker.setFPS(60);
                                                
                                                /* Возвращаем цвет ячейки по умолчанию */
                                                that.matchMatrixCell["i"+i+":j"+j].lineStyle(1, 0x0080FF, 0.25);
                                                that.matchMatrixCell["i"+i+":j"+j].beginFill(0x0080FF, 0.25);
					}
                                        index++;
				}
			}
		},
		
		/* Ход искусственного интеллекта ============================================================== */
		matchGetPriorityUnit: function(unitType)
		{
			if(unitType === that.MATCH_HIT_1) {return 1;}
			if(unitType === that.MATCH_HIT_2) {return 2;}
			if(unitType === that.MATCH_HIT_3)
			{
				var typeRandom = Math.random() / 0.1;
				var uType = Math.round(typeRandom);
				return uType;
			}
			if(unitType === that.MATCH_HIT_4) {return 4;}
			if(unitType === that.MATCH_HIT_5) {return 5;}
			return 0;
		},
		
		matchActionAI: function()
		{
			/*	   0  1  2  3  4  5
			* 	0:[0][0][0][0][1][0]
				1:[0][0][1][1][0][1]
				2:[0][0][0][0][1][0]
				3:[0][0][0][0][0][0]
				4:[0][0][0][0][0][0]
				5:[0][0][0][0][0][0]
			 * */
			 var priorityUnit = 0;
			 var lastpriorityUnit = 0;

			// Проверка строк и колонок
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
				for(var j = 0; j < that.MATCH_ROWS; j++)
				{
					if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0)
					{
						// ПРОВЕРКА СТРОКИ
						if(j == 0)
						{
							//[1][1][X][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+2)+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+3)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1][X][1][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) 
									{ 
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][1][X][1]
							//[0][0][1][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+1)+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][1][1][X]
							//[0][0][0][1]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+2)+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][X][1][1]
							//[0][1][0][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
						}else{
							//[1][1][X][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+2)+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+3)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1][X][1][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][1][1][X]
							//[0][0][0][1]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+2)+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][0][0][1]
							//[0][1][1][X]
							if((i + 2) < that.MATCH_COLUMNS && (j - 1) >=0){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+(j-1)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j-1)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+2)+":j"+(j-1)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+2)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][X][1][1]
							//[0][1][0][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][1][0][0]
							//[0][X][1][1]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][0][1][0]
							//[0][1][X][1]
							if((i + 2) < that.MATCH_COLUMNS && (j - 1) >= 0){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j-1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j-1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+1)+":j"+(j-1)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][1][X][1]
							//[0][0][1][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+1)+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
						}

						// ПРОВЕРКА КОЛОНКИ
						if(i == 0)
						{
							//[1]
							//[1]
							//[X]
							//[1]
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+(j+2)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+3)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1]
							//[X]
							//[1]
							//[1]
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1][0]
							//[X][1]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1][0]
							//[1][0]
							//[X][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+(j+2)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[X][1]
							//[1][0]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
						}else{
							//[1]
							//[1]
							//[X]
							//[1]
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+(j+2)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+3)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1]
							//[X]
							//[1]
							//[1]
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1][0]
							//[X][1]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][1]
							//[1][X]
							//[0][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i - 1) >= 0){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i-1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i-1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i-1)+":j"+(j+1)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1][0]
							//[1][0]
							//[X][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+(j+2)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[X][1]
							//[1][0]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][1]
							//[0][1]
							//[1][X]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i - 1) >= 0){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i-1)+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i-1)+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i-1)+":j"+(j+2)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+2)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1][X]
							//[0][1]
							//[0][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i - 1) >= 0){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i-1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+(i-1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+(i-1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+(i-1)+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i-1)+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
						}
					}
				}
			}

			if(that.matchSelectUnit1 !== null && that.matchSelectUnit2 !== null)
			{
				that.matchExchangeUnits(); // меняем юниты местами
			}else{
				that.matchActionAI();
			}
		},
		
		/* Анимация удаление юнитов */
		matchAnimationRemoveUnit: function(posX, posY)
		{
			var anim = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexFlash"));
			anim.position.x = posX - 55;
			anim.position.y = posY - 55;
			anim.loop = false;
			anim.animationSpeed = 0.2;
			anim.onComplete = that.onMatchAnimationRemoveUnitComplete;
			anim.play();
			that.matchStage.addChild(anim);
		},
		
		onMatchAnimationRemoveUnitComplete: function()
		{
			that.matchStage.removeChild(this);
		},

		/* Наложение маски на игровое поле */
		matchMask: function()
		{
			var posX = (parent.config.MAIN_WIDTH / 2) - (500 / 2);
			var posY = (parent.config.MAIN_HEIGH / 2) - (500 / 2);
			var thing = new PIXI.Graphics();
			thing.position.x = 0;
			thing.position.y = 0;
			thing.lineStyle(0);
			thing.clear();
				thing.beginFill(0x8bc5ff, 0.4);
				thing.moveTo(posX, posY);
				thing.lineTo(posX, posY);
				thing.lineTo(posX + 500, posY);
				thing.lineTo(posX + 500, posY + 500);
				thing.lineTo(posX, posY + 500);
				that.matchStage.mask = thing;
		},
		
		/* Завершение работы с классом ======================================== */
		show: function()
		{
			return that.matchStage;
		},
		
		close: function()
		{
			for(var child in that.matchStage.children) that.matchStage.removeChild(that.matchStage.children[child]);
			return that.matchStage;
		},
		
		getWindowStage: function()
		{
			return that.matchStage;
		},
		
		destroy: function()
		{
			for(var child in that.matchStage.children) that.matchStage.removeChild(that.matchStage.children[child]);
			that.matchStage.destroy();
			delete that.matchStage.children;
			
			for(var property in that) that[property] = null;
		}
	};
	return that;
};

/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var Menu = function(parent)
{
	var that = {
		windowStage: null,
		starsSprite: null,
		deathStarSprite: null,
		ship1Sprite: null, 
		ship2Sprite: null,
		ship3Sprite: null,
		lineMessageGraphics: null,
		styleDroidText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 },
		styleButtonText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 },
		
		create: function()
		{
			that.windowStage = new PIXI.Container();
			that.starsCreate();
			that.deathStarCreate();
			that.shipsCreate();
			that.panetBattonsCreate();
			that.borderCreate();
			that.logoCreate();
			that.droidCreate();
		},
		
		starsCreate: function()
		{
			that.starsSprite = new PIXI.Sprite(parent.assets.getAsset("stars1Texture")); 
			that.starsSprite.position.x = 0; 
			that.starsSprite.position.y = 0; 
			that.starsSprite.scale.set(1.0); 
			that.windowStage.addChild(that.starsSprite);
		},
		
		deathStarCreate: function()
		{
			that.deathStarSprite = new PIXI.Sprite(parent.assets.getAsset("deathstarTexture")); 
			that.deathStarSprite.position.x = 300; 
			that.deathStarSprite.position.y = 100; 
			that.windowStage.addChild(that.deathStarSprite);
		},
		
		shipsCreate: function()
		{
			that.ship2Sprite = new PIXI.Sprite(parent.assets.getAsset("ship2Texture")); 
			that.ship2Sprite.position.x = 900; 
			that.ship2Sprite.position.y = 150; 
			that.windowStage.addChild(that.ship2Sprite);
			
			that.ship3Sprite = new PIXI.Sprite(parent.assets.getAsset("ship3Texture")); 
			that.ship3Sprite.position.x = 50; 
			that.ship3Sprite.position.y = 150; 
			that.windowStage.addChild(that.ship3Sprite);
			
			that.ship1Sprite = new PIXI.Sprite(parent.assets.getAsset("ship1Texture")); 
			that.ship1Sprite.position.x = -375; 
			that.ship1Sprite.position.y = 250; 
			that.windowStage.addChild(that.ship1Sprite);
		},
		
		panetBattonsCreate: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0000FF, 0);
			graphics.beginFill(0x0000FF, 0.4);
			graphics.drawRect(23, 20, 347, 700);
			that.windowStage.addChild(graphics);
			
			var textArr = ["НАЧАТЬ ИГРУ", "НАСТРОЙКИ", "ПРИГЛАСИТЬ"];
			
			for(var i = 0; i < textArr.length; i++)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = "button_" + i;
				button.position.x = 85; 
				button.position.y = 350 + (75 * i); 
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
			
			
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);

				var text = new PIXI.Text(textArr[i], that.styleButtonText); 
				text.x = button.width / 3.8;
				text.y = button.height / 3;

				button.addChild(text); 
				that.windowStage.addChild(button);
			}
		},
		
		onButtonOver: function(e)
		{
			this.isOver = true;
			this.gotoAndPlay(1);
		},
		
		onButtonOut: function(e)
		{
			this.isOver = false;
			this.gotoAndStop(0);
		},
		
		onButtonUpdate: function(e)
		{
			if(this.isOver)
			{
				this.gotoAndPlay(1);
			}else{
				this.gotoAndStop(0);
			}
		},
		
		onButtonClick: function(e)
		{
                        parent.sound.soundPlayStarWarsButtonClick();
			switch (this.name)
			{
				case "button_0":        // Начать игру
					parent.menuStartGame();
					break;
				case "button_1":        // Настройки игры
					parent.settingsShow("menu_map");
					break;
				case "button_2":        // Позвать друзей ВК
					parent.vkInvite();
                                        break;
				default:
					break;
			}
		},
		
		borderCreate: function()
		{
			var graphics = new PIXI.Graphics(); 

			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(5, 600,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(5,600);
			graphics.lineTo(5, 725);
			graphics.moveTo(5,725);
			graphics.lineTo(650, 725);
			graphics.moveTo(650,725);
			graphics.lineTo(670, 710);
			graphics.moveTo(670,710);
			graphics.lineTo(840, 710);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(840, 710,4);
			graphics.endFill();

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(20, 20,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(20,20);
			graphics.lineTo(370, 20);
			graphics.moveTo(370,20);
			graphics.lineTo(390, 5);
			graphics.moveTo(390,5);
			graphics.lineTo(855, 5);
			graphics.moveTo(855,5);
			graphics.lineTo(855, 150);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(855, 150,4);
			graphics.endFill();

			that.windowStage.addChild(graphics);
		},
		
		logoCreate: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("starwarsTexture")); 
			textureSprite.position.x = 25; 
			textureSprite.position.y = 15; 
			that.windowStage.addChild(textureSprite);
		},
		
		droidCreate: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidBlueRightTexture")); 
			textureSprite.position.x = 700; 
			textureSprite.position.y = 550; 
			textureSprite.scale.set(0.4);
			that.windowStage.addChild(textureSprite);

			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0080C0, 1);
			graphics.beginFill(0x0080C0, 0.2);
			graphics.moveTo(735,575);
			graphics.lineTo(550, 575);
			graphics.lineTo(550, 300);
			graphics.lineTo(735, 300);
			graphics.endFill;
			for(var i = 0; i < 92; i++)
			{
				graphics.lineStyle(1, 0x0090F0, 0.5);
				graphics.moveTo(735,300+(3*i));
				graphics.lineTo(550, 300+(3*i));
			}
			that.windowStage.addChild(graphics);

			that.droidMessage();

			that.lineMessageGraphics = new PIXI.Graphics(); 
			that.lineMessageGraphics.lineStyle(10, 0x0090F0, 0.3);
			that.lineMessageGraphics.moveTo(735,305);
			that.lineMessageGraphics.lineTo(550, 305);
			that.windowStage.addChild(that.lineMessageGraphics);
		},
		
		droidMessage: function()
		{
			var text = new PIXI.Text("\nДобро пожаловать на путь силы. \nВаши способности превышают способности обычных людей. \nВы тут потому что вы были избраны. \n\nНажмите кнопку \n''Начать игру'' \n\nИ да пребудет с Вами Сила!", that.styleDroidText); 
			text.x = 555; 
			text.y = 300; 
			that.windowStage.addChild(text);
		},
		
		tweenStart: function()
		{
			createjs.Tween.get(that.lineMessageGraphics , {loop: true}) 
				.to({x: 0, y: 265}, 2500, createjs.Ease.getPowInOut(3));
				
			createjs.Tween.get(that.starsSprite, {loop: true}) 
				.to({x: -50, y: 0}, 25000, createjs.Ease.getPowInOut(3))
				.to({x: -50, y: -50}, 25000, createjs.Ease.getPowInOut(3))
				.to({x: 0, y: -50}, 25000, createjs.Ease.getPowInOut(3))
				.to({x: 0, y: 0}, 25000, createjs.Ease.getPowInOut(3));

			createjs.Tween.get(that.deathStarSprite, {loop: true}) 
					.to({x: 200, y: 100}, 25000, createjs.Ease.getPowInOut(3))
					.to({x: 200, y: 0}, 25000, createjs.Ease.getPowInOut(3))
					.to({x: 300, y: 0}, 25000, createjs.Ease.getPowInOut(3))
					.to({x: 300, y: 100}, 25000, createjs.Ease.getPowInOut(3));

			createjs.Tween.get(that.ship3Sprite, {loop: true}) 
					.to({x: -150, y: 150}, 25000, createjs.Ease.getPowInOut(3))
					.to({x: -150, y: 0}, 25000, createjs.Ease.getPowInOut(3))
					.to({x: 50, y: 0}, 25000, createjs.Ease.getPowInOut(3))
					.to({x: 50, y: 150}, 25000, createjs.Ease.getPowInOut(3));

			createjs.Tween.get(that.ship1Sprite, {loop: true}) 
					.to({x: 1000, y: 1000}, 5000, createjs.Ease.getPowInOut(3));

			createjs.Tween.get(that.ship2Sprite, {loop: true}) 
					.to({x: -250, y: 350}, 5000, createjs.Ease.getPowInOut(3));

			createjs.Ticker.setFPS(60); 
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.lineMessageGraphics);
			createjs.Tween.removeTweens(that.starsSprite);
			createjs.Tween.removeTweens(that.deathStarSprite);
			createjs.Tween.removeTweens(that.ship3Sprite);
			createjs.Tween.removeTweens(that.ship1Sprite);
			createjs.Tween.removeTweens(that.ship2Sprite);
		},
		
		show: function()
		{
			that.tweenStart();
			return that.windowStage;
		},
		
		close: function()
		{
			that.tweenStop();
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			return that.windowStage;
		},
		
		getWindowStage: function()
		{
			return that.windowStage;
		},
		
		destroy: function()
		{
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			that.windowStage.destroy();
			delete that.windowStage.children;
			
			for(var property in that) that[property] = null;
		}
	};
	return that;
};

/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var Message = function(parent)
{
	var that = {
		windowStage: null,
		lineAnimationGraphics: null,
		styleBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 },
		styleRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }, 
		styleBlueTitle: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200, align: "left"},
		styleRedTitle: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200, align: "left" },

		titleText: null,
		messageText: null,
		
		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		create: function(titleText, messageText)
		{
			that.titleText = titleText;
			that.messageText = messageText;
			that.windowStage = new PIXI.Container();
			that.backgroundCreate();
			that.windowCreate();
			that.titleCreate();
			that.textCreate();
			that.buttonCloseCreate();
		},
		
		backgroundCreate: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.hitArea = new PIXI.Rectangle(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
			graphics.interactive = true;
			graphics.lineStyle(1, 0x000000, 0.05);
			graphics.beginFill(0x000000, 0.5);
			graphics.drawRect(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
			graphics.endFill();
			that.windowStage.addChild(graphics);
		},
		
		windowCreate: function()
		{
			if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI)
			{
				var graphics = new PIXI.Graphics(); 
				graphics.lineStyle(2, 0x0080C0, 1);
				graphics.beginFill(0x0080C0, 0.2);
				graphics.moveTo(250,250);
				graphics.lineTo(600, 250);
				graphics.lineTo(600, 500);
				graphics.lineTo(250, 500);
				graphics.endFill();
				for(var i = 0; i < 55; i++)
				{
					graphics.lineStyle(1, 0x0090F0, 0.5);
					graphics.moveTo(250,280+(3*i));
					graphics.lineTo(600, 280+(3*i));

				}
				that.windowStage.addChild(graphics);
				
				that.lineAnimationGraphics = new PIXI.Graphics(); 
				that.lineAnimationGraphics.lineStyle(10, 0x0090F0, 0.3);
				that.lineAnimationGraphics.moveTo(250,255);
				that.lineAnimationGraphics.lineTo(600, 255);
				that.windowStage.addChild(that.lineAnimationGraphics);
				
				graphics = new PIXI.Graphics(); 
				graphics.lineStyle(1, 0x0080C0, 1);
				graphics.beginFill(0x0080C0, 1);
				graphics.moveTo(400,250);
				graphics.lineTo(425, 275);
				graphics.lineTo(600, 275);
				graphics.lineTo(600, 250);
				graphics.endFill();
				that.windowStage.addChild(graphics);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				var graphics = new PIXI.Graphics(); 
				graphics.lineStyle(2, 0xA63A24, 1);
				graphics.beginFill(0xA63A24, 0.2);
				graphics.moveTo(250,250);
				graphics.lineTo(600, 250);
				graphics.lineTo(600, 500);
				graphics.lineTo(250, 500);
				graphics.endFill();
				for(var i = 0; i < 55; i++)
				{
					graphics.lineStyle(1, 0xA63A24, 0.5);
					graphics.moveTo(250,280+(3*i));
					graphics.lineTo(600, 280+(3*i));
				}
				that.windowStage.addChild(graphics);
				
				that.lineAnimationGraphics = new PIXI.Graphics(); 
				that.lineAnimationGraphics.lineStyle(10, 0xA63A24, 0.3);
				that.lineAnimationGraphics.moveTo(250,255);
				that.lineAnimationGraphics.lineTo(600, 255);
				that.windowStage.addChild(that.lineAnimationGraphics);
				
				graphics = new PIXI.Graphics(); 
				graphics.lineStyle(1, 0xA63A24, 1);
				graphics.beginFill(0xA63A24, 1);
				graphics.moveTo(400,250);
				graphics.lineTo(425, 275);
				graphics.lineTo(600, 275);
				graphics.lineTo(600, 250);
				graphics.endFill();
				that.windowStage.addChild(graphics);
			}
		},
		
		titleCreate: function()
		{
			var text;
    		if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI) text = new PIXI.Text(that.titleText, that.styleBlueTitle); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text(that.titleText, that.styleRedTitle); 
			text.x = 450;
			text.y = 255;
			that.windowStage.addChild(text);
		},
		
		textCreate: function()
		{
			var text;
			if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI) text = new PIXI.Text(that.messageText, that.styleBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text(that.messageText, that.styleRedText); 
			text.x = 255;
			text.y = 285;
			that.windowStage.addChild(text);
		},
		
		buttonCloseCreate: function()
		{
			if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = "button_close";
				button.position.x = 320; 
				button.position.y = 450; 
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonCloseUpdate;
				button.tap = that.onButtonCloseClick; 
				button.click = that.onButtonCloseClick; 
				button.on('mouseover', that.onButtonCloseOver);
				button.on('mouseout', that.onButtonCloseOut);
				var text = new PIXI.Text("Закрыть", that.styleBlueText); 
				text.x = button.width / 3;
				text.y = button.height / 3;
				button.addChild(text); 
				that.windowStage.addChild(button);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
				button.name = "button_close";
				button.position.x = 320; 
				button.position.y = 450; 
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonCloseUpdate;
				button.tap = that.onButtonCloseClick; 
				button.click = that.onButtonCloseClick; 
				button.on('mouseover', that.onButtonCloseOver);
				button.on('mouseout', that.onButtonCloseOut);
				var text = new PIXI.Text("Закрыть", that.styleRedText); 
				text.x = button.width / 3;
				text.y = button.height / 3;
				button.addChild(text); 
				that.windowStage.addChild(button);
			}
		},
		
		onButtonCloseOver: function(event)
		{
			this.isOver = true;
			this.gotoAndPlay(1);
		},
		
		onButtonCloseOut: function(event)
		{
			this.isOver = false;
			this.gotoAndStop(0);
		},
		
		onButtonCloseUpdate: function(event)
		{
			if(this.isOver)
			{
				this.gotoAndPlay(1);
			}else{
				this.gotoAndStop(0);
			}
		},
		
		onButtonCloseClick: function(event)
		{
                        parent.sound.soundPlayStarWarsButtonClick();
			parent.messageClose();
		},
		
		tweenStart: function()
		{
			createjs.Tween.get(that.lineAnimationGraphics, {loop: true}) 
				.to({x: 0, y: 240}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Ticker.setFPS(60);
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.lineAnimationGraphics);
		},
		
		show: function()
		{
			that.tweenStart();
			return that.windowStage;
		},
		
		close: function()
		{
			that.tweenStop();
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			return that.windowStage;
		},
		
		getWindowStage: function()
		{
			return that.windowStage;
		},
		
		destroy: function()
		{
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			that.windowStage.destroy();
			delete that.windowStage.children;
			
			for(var property in that) that[property] = null;
		}
	};
	return that;
};

/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var Preloader = function(parent)
{
	var that = {
		
		windowStage: new PIXI.Container(),
		styleText: { font : 'bold 48px Arial', fill : '#FFFF80', stroke : '#FF8000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 600 },
		progressText: null,
		percentSounds: 0,
		percentTextures: 0,
		complete: 0,
		assets:  new Object(),
		
		load: function() 
		{
			var loader = new PIXI.loaders.Loader();
			loader.add('preloaderTexture',"./assets/image/textures/preloader.jpg");
			loader.once('complete', that.onLoaderComplete);
			loader.load();
			loader = null;
		},
		
		onLoaderComplete: function(loader, res)
		{
			var sprite = new PIXI.Sprite(res.preloaderTexture.texture);
			sprite.position.x = 0; 
			sprite.position.y = 0; 
			that.windowStage.addChild(sprite);
			sprite = null;
			
			that.progressText = new PIXI.Text("Загрузка", that.styleText); 
			that.progressText.x = 280;
			that.progressText.y = 550;
			that.windowStage.addChild(that.progressText);
			
			that.loadSounds();
			that.loadAssets();
		},
		
		loadAssets: function()
		{
			var loader = new PIXI.loaders.Loader();
    
			loader.add('starwarsTexture','./assets/image/textures/starwars.png');
			loader.add('stars1Texture','./assets/image/textures/stars1.jpg');
			loader.add('ship1Texture','./assets/image/textures/ship1.png');
			loader.add('ship2Texture','./assets/image/textures/ship2.png');
			loader.add('ship3Texture','./assets/image/textures/ship3.png');

			loader.add('r2d2DroidBlueRightTexture','./assets/image/textures/r2d2_droid_blue_right.png');
			loader.add('r2d2DroidRedRightTexture','./assets/image/textures/r2d2_droid_red_right.png');
			loader.add('r2d2DroidBlueLeftTexture','./assets/image/textures/r2d2_droid_blue_left.png');
			loader.add('r2d2DroidRedLeftTexture','./assets/image/textures/r2d2_droid_red_left.png');

			loader.add('sideBackgroundTexture','./assets/image/textures/side_background.png');
			loader.add('personageDeadTexture','./assets/image/textures/personage_dead.png');

			loader.add('mapSpaceBlueTexture','./assets/image/textures/space_blue.jpg');
			loader.add('mapSpaceRedTexture','./assets/image/textures/space_red.jpg');

			loader.add('flashAtlas','./assets/image/atlas/flash.json');
			loader.add('crystalsAtlas','./assets/image/atlas/crystals.json');
                        loader.add('boomAtlas','./assets/image/atlas/boom.json');

			loader.add('buttonBlueAtlas','./assets/image/atlas/button_blue.json');
			loader.add('buttonRedAtlas','./assets/image/atlas/button_red.json');
			loader.add('buttonsSettings','./assets/image/atlas/settings_buttons.json');
			
			loader.add('sideDarthVaderAtlas','./assets/image/atlas/side_darth_vader.json');
                        loader.add('sideLukeSkywalkerAtlas','./assets/image/atlas/side_luke_skywalker.json');

			loader.add('planet_light','./assets/image/textures/planets/planet_light.png');
			loader.add('deathstarTexture','./assets/image/textures/planets/deathstar.png');
                        loader.add('deathstarDestroyTexture','./assets/image/textures/planets/deathstar_destroy.png');
			loader.add('deathstar_landscape','./assets/image/textures/planets/deathstar_landscape.jpg');
			loader.add('coruscant_planet','./assets/image/textures/planets/coruscant.png');
			loader.add('coruscant_landscape','./assets/image/textures/planets/coruscant_landscape.jpg');
			loader.add('tatooine_planet','./assets/image/textures/planets/tatooine.png');
			loader.add('tatooine_landscape','./assets/image/textures/planets/tatooine_landscape.jpg');
			loader.add('naboo_planet','./assets/image/textures/planets/naboo.png');
			loader.add('naboo_landscape','./assets/image/textures/planets/naboo_landscape.jpg');
			loader.add('endor_planet','./assets/image/textures/planets/endor.png');
			loader.add('endor_landscape','./assets/image/textures/planets/endor_landscape.jpg');
			loader.add('hoth_planet','./assets/image/textures/planets/hoth.png');
			loader.add('hoth_landscape','./assets/image/textures/planets/hoth_landscape.jpg');
			loader.add('mustafar_planet','./assets/image/textures/planets/mustafar.png');
			loader.add('mustafar_landscape','./assets/image/textures/planets/mustafar_landscape.jpg');
			loader.add('dagobah_planet','./assets/image/textures/planets/dagobah.png');
			loader.add('dagobah_landscape','./assets/image/textures/planets/dagobah_landscape.jpg');
			loader.add('bespin_planet','./assets/image/textures/planets/bespin.png');
			loader.add('bespin_landscape','./assets/image/textures/planets/bespin_landscape.jpg');
			loader.add('geonosis_planet','./assets/image/textures/planets/geonosis.png');
			loader.add('geonosis_landscape','./assets/image/textures/planets/geonosis_landscape.jpg');
			loader.add('alderaan_planet','./assets/image/textures/planets/alderaan.png');
			loader.add('alderaan_landscape','./assets/image/textures/planets/alderaan_landscape.jpg');
			loader.add('kamino_planet','./assets/image/textures/planets/kamino.png');
			loader.add('kamino_landscape','./assets/image/textures/planets/kamino_landscape.jpg');
			loader.add('utapau_planet','./assets/image/textures/planets/utapau.png');
			loader.add('utapau_landscape','./assets/image/textures/planets/utapau_landscape.jpg');
			loader.add('saleucami_planet','./assets/image/textures/planets/saleucami.png');
			loader.add('saleucami_landscape','./assets/image/textures/planets/saleucami_landscape.jpg');
			loader.add('jakku_planet','./assets/image/textures/planets/jakku.png');
			loader.add('jakku_landscape','./assets/image/textures/planets/jakku_landscape.jpg');

			loader.add('aayla_secura_lr','./assets/image/textures/personages/aayla_secura_lr.png');
			loader.add('aayla_secura_rl','./assets/image/textures/personages/aayla_secura_rl.png');
			loader.add('adigallia','./assets/image/textures/personages/adigallia.png');
			loader.add('admiral_ozzel','./assets/image/textures/personages/admiral_ozzel.png');
			loader.add('alliance_to_restore_the_republic','./assets/image/textures/personages/alliance_to_restore_the_republic.png');
			loader.add('anakin_skywalker','./assets/image/textures/personages/anakin_skywalker.png');
			loader.add('aurra_sing_lr','./assets/image/textures/personages/aurra_sing_lr.png');
			loader.add('aurra_sing_rl','./assets/image/textures/personages/aurra_sing_rl.png');
			loader.add('b1_battle_droid_lr','./assets/image/textures/personages/b1_battle_droid_lr.png');
			loader.add('b1_battle_droid_rl','./assets/image/textures/personages/b1_battle_droid_rl.png');
			loader.add('bail_organa','./assets/image/textures/personages/bail_organa.png');
			loader.add('barriss_offee','./assets/image/textures/personages/barriss_offee.png');
			loader.add('beru_lars','./assets/image/textures/personages/beru_lars.png');
			loader.add('bib_fortuna','./assets/image/textures/personages/bib_fortuna.png');
			loader.add('boba_fett','./assets/image/textures/personages/boba_fett.png');
			loader.add('boss_nass_lr','./assets/image/textures/personages/boss_nass_lr.png');
			loader.add('boss_nass_rl','./assets/image/textures/personages/boss_nass_rl.png');
			loader.add('c_3po_lr','./assets/image/textures/personages/c_3po_lr.png');
			loader.add('c_3po_rl','./assets/image/textures/personages/c_3po_rl.png');
			loader.add('capitan_panaka','./assets/image/textures/personages/capitan_panaka.png');
			loader.add('chewbacca_lr','./assets/image/textures/personages/chewbacca_lr.png');
			loader.add('chewbacca_rl','./assets/image/textures/personages/chewbacca_rl.png');
			loader.add('clone_commander_bakara','./assets/image/textures/personages/clone_commander_bakara.png');
			loader.add('clone_commander_cody_lr','./assets/image/textures/personages/clone_commander_cody_lr.png');
			loader.add('clone_commander_cody_rl','./assets/image/textures/personages/clone_commander_cody_rl.png');
			loader.add('clone_commander_neyo','./assets/image/textures/personages/clone_commander_neyo.png');
			loader.add('clone_commander_rex','./assets/image/textures/personages/clone_commander_rex.png');
			loader.add('commander_jerjerrod_lr','./assets/image/textures/personages/commander_jerjerrod_lr.png');
			loader.add('commander_jerjerrod_rl','./assets/image/textures/personages/commander_jerjerrod_rl.png');
			loader.add('darth_maul','./assets/image/textures/personages/darth_maul.png');
			loader.add('darth_sidious_lr','./assets/image/textures/personages/darth_sidious_lr.png');
			loader.add('darth_sidious_rl','./assets/image/textures/personages/darth_sidious_rl.png');
			loader.add('darth_vader','./assets/image/textures/personages/darth_vader.png');
			loader.add('dooku_lr','./assets/image/textures/personages/dooku_lr.png');
			loader.add('dooku_rl','./assets/image/textures/personages/dooku_rl.png');
			loader.add('eeth_koth','./assets/image/textures/personages/eeth_koth.png');
			loader.add('finn_lr','./assets/image/textures/personages/finn_lr.png');
			loader.add('finn_rl','./assets/image/textures/personages/finn_rl.png');
			loader.add('general_grievous','./assets/image/textures/personages/general_grievous.png');
			loader.add('general_madine_lr','./assets/image/textures/personages/general_madine_lr.png');
			loader.add('general_madine_rl','./assets/image/textures/personages/general_madine_rl.png');
			loader.add('han_solo_lr','./assets/image/textures/personages/han_solo_lr.png');
			loader.add('han_solo_rl','./assets/image/textures/personages/han_solo_rl.png');
			loader.add('jango_fett_lr','./assets/image/textures/personages/jango_fett_lr.png');
			loader.add('jango_fett_rl','./assets/image/textures/personages/jango_fett_rl.png');
			loader.add('jar_jar_binks','./assets/image/textures/personages/jar_jar_binks.png');
			loader.add('jawas','./assets/image/textures/personages/jawas.png');
			loader.add('kapitan_antilles','./assets/image/textures/personages/kapitan_antilles.png');
			loader.add('ki_adi_mundi','./assets/image/textures/personages/ki_adi_mundi.png');
			loader.add('kit_fisto','./assets/image/textures/personages/kit_fisto.png');
			loader.add('kylo_ren','./assets/image/textures/personages/kylo_ren.png');
			loader.add('lando_calrissian_lr','./assets/image/textures/personages/lando_calrissian_lr.png');
			loader.add('lando_calrissian_rl','./assets/image/textures/personages/lando_calrissian_rl.png');
			loader.add('leia_organa_lr','./assets/image/textures/personages/leia_organa_lr.png');
			loader.add('leia_organa_rl','./assets/image/textures/personages/leia_organa_rl.png');
			loader.add('luke_skywalker','./assets/image/textures/personages/luke_skywalker.png');
			loader.add('mace_windu_lr','./assets/image/textures/personages/mace_windu_lr.png');
			loader.add('mace_windu_rl','./assets/image/textures/personages/mace_windu_rl.png');
			loader.add('mas_amedda','./assets/image/textures/personages/mas_amedda.png');
			loader.add('maximilian_veers','./assets/image/textures/personages/maximilian_veers.png');
			loader.add('mon_motma_lr','./assets/image/textures/personages/mon_motma_lr.png');
			loader.add('mon_motma_rl','./assets/image/textures/personages/mon_motma_rl.png');
			loader.add('nute_gunray','./assets/image/textures/personages/nute_gunray.png');
			loader.add('obi_wan_kenobi','./assets/image/textures/personages/obi_wan_kenobi.png');
			loader.add('owen_lars','./assets/image/textures/personages/owen_lars.png');
			loader.add('padme_amidala','./assets/image/textures/personages/padme_amidala.png');
			loader.add('palpatine','./assets/image/textures/personages/palpatine.png');
			loader.add('phasma','./assets/image/textures/personages/phasma.png');
			loader.add('plo_koon','./assets/image/textures/personages/plo_koon.png');
			loader.add('poe_dameron','./assets/image/textures/personages/poe_dameron.png');
			loader.add('poggle_the_lesser','./assets/image/textures/personages/poggle_the_lesser.png');
			loader.add('qui_gon_jinn_lr','./assets/image/textures/personages/qui_gon_jinn_lr.png');
			loader.add('qui_gon_jinn_rl','./assets/image/textures/personages/qui_gon_jinn_rl.png');
			loader.add('red_battle_droid_lr','./assets/image/textures/personages/red_battle_droid_lr.png');
			loader.add('red_battle_droid_rl','./assets/image/textures/personages/red_battle_droid_rl.png');
			loader.add('republic_clone_army','./assets/image/textures/personages/republic_clone_army.png');
			loader.add('rey','./assets/image/textures/personages/rey.png');
			loader.add('royal_guards','./assets/image/textures/personages/royal_guards.png');
			loader.add('rune_haako_lr','./assets/image/textures/personages/rune_haako_lr.png');
			loader.add('rune_haako_rl','./assets/image/textures/personages/rune_haako_rl.png');
			loader.add('saesee_tiin_lr','./assets/image/textures/personages/saesee_tiin_lr.png');
			loader.add('saesee_tiin_rl','./assets/image/textures/personages/saesee_tiin_rl.png');
			loader.add('separatists','./assets/image/textures/personages/separatists.png');
			loader.add('shaak_ti','./assets/image/textures/personages/shaak_ti.png');
			loader.add('shmi_skywalker','./assets/image/textures/personages/shmi_skywalker.png');
			loader.add('sio_bibble','./assets/image/textures/personages/sio_bibble.png');
			loader.add('stormtrooper','./assets/image/textures/personages/stormtrooper.png');
			loader.add('stormtrooper_lr','./assets/image/textures/personages/stormtrooper_lr.png');
			loader.add('stormtrooper_rl','./assets/image/textures/personages/stormtrooper_rl.png');
			loader.add('stormtroopers','./assets/image/textures/personages/stormtroopers.png');
			loader.add('tion_medon','./assets/image/textures/personages/tion_medon.png');
			loader.add('trade_federation','./assets/image/textures/personages/trade_federation.png');
			loader.add('tusken','./assets/image/textures/personages/tusken.png');
			loader.add('wat_tambor_lr','./assets/image/textures/personages/wat_tambor_lr.png');
			loader.add('wat_tambor_rl','./assets/image/textures/personages/wat_tambor_rl.png');
			loader.add('watto','./assets/image/textures/personages/watto.png');
			loader.add('wicket_wysri_warrick','./assets/image/textures/personages/wicket_wysri_warrick.png');
			loader.add('yoda','./assets/image/textures/personages/yoda.png');
			
			loader.add('iconsAtlas','./assets/image/atlas/icons.json');
			
			loader.add('personages','./assets/data/personages.json');
			loader.add('planets','./assets/data/planets.json');
			
			loader.add('level_0_0','./assets/data/levels/level_0_0.json');
			loader.add('level_0_1','./assets/data/levels/level_0_1.json');
			loader.add('level_0_2','./assets/data/levels/level_0_2.json');
			loader.add('level_0_3','./assets/data/levels/level_0_3.json');
			loader.add('level_0_4','./assets/data/levels/level_0_4.json');
			loader.add('level_0_5','./assets/data/levels/level_0_5.json');
			loader.add('level_0_6','./assets/data/levels/level_0_6.json');
			loader.add('level_0_7','./assets/data/levels/level_0_7.json');
			loader.add('level_0_8','./assets/data/levels/level_0_8.json');
			loader.add('level_0_9','./assets/data/levels/level_0_9.json');
                        loader.add('level_0_10','./assets/data/levels/level_0_10.json');
			
			loader.add('level_1_0','./assets/data/levels/level_1_0.json');
			loader.add('level_1_1','./assets/data/levels/level_1_1.json');
			loader.add('level_1_2','./assets/data/levels/level_1_2.json');
			loader.add('level_1_3','./assets/data/levels/level_1_3.json');
			loader.add('level_1_4','./assets/data/levels/level_1_4.json');
			loader.add('level_1_5','./assets/data/levels/level_1_5.json');
			loader.add('level_1_6','./assets/data/levels/level_1_6.json');
			loader.add('level_1_7','./assets/data/levels/level_1_7.json');
			loader.add('level_1_8','./assets/data/levels/level_1_8.json');
			loader.add('level_1_9','./assets/data/levels/level_1_9.json');
			
			loader.add('level_2_0','./assets/data/levels/level_2_0.json');
			loader.add('level_2_1','./assets/data/levels/level_2_1.json');
			loader.add('level_2_2','./assets/data/levels/level_2_2.json');
			loader.add('level_2_3','./assets/data/levels/level_2_3.json');
			loader.add('level_2_4','./assets/data/levels/level_2_4.json');
			loader.add('level_2_5','./assets/data/levels/level_2_5.json');
			loader.add('level_2_6','./assets/data/levels/level_2_6.json');
			loader.add('level_2_7','./assets/data/levels/level_2_7.json');
			loader.add('level_2_8','./assets/data/levels/level_2_8.json');
			loader.add('level_2_9','./assets/data/levels/level_2_9.json');
			
			loader.on('progress', that.onAssetsLoaderProcess);
			loader.on('complete', that.onAssetsLoaderComplete);
			loader.load();
			loader = null;
		},
		
		onAssetsLoaderProcess: function()
		{
			that.percentTextures = (Math.round(this.progress) / 2);
			that.progressText.text = "Загрузка " + (that.percentTextures + that.percentSounds) + "%";
		},
		
		onAssetsLoaderComplete: function(loader, res)
		{
			that.percentTextures = 50;
			that.progressText.text = "Загрузка " + (that.percentTextures + that.percentSounds) + "%";
			
			that.assets["deathstarTexture"] = res.deathstarTexture.texture;			// deathstar.png
			that.assets["deathstarDestroyTexture"] = res.deathstarDestroyTexture.texture;          // deathstar_destroy.png
                        that.assets["starwarsTexture"] = res.starwarsTexture.texture;			// starwars.png
			that.assets["stars1Texture"] = res.stars1Texture.texture;				// stars1.jpg
			that.assets["ship1Texture"] = res.ship1Texture.texture;				// ship1.png
			that.assets["ship2Texture"] = res.ship2Texture.texture;				// ship2.png
			that.assets["ship3Texture"] = res.ship3Texture.texture;				// ship3.png
			that.assets["r2d2DroidBlueRightTexture"]  = res.r2d2DroidBlueRightTexture.texture;	// r2d2_droid_blue_right.png
			that.assets["r2d2DroidRedRightTexture"] = res.r2d2DroidRedRightTexture.texture;	// r2d2_droid_red_right.png
			that.assets["r2d2DroidBlueLeftTexture"]  = res.r2d2DroidBlueLeftTexture.texture;	// r2d2_droid_blue_left.png
			that.assets["r2d2DroidRedLeftTexture"] = res.r2d2DroidRedLeftTexture.texture;	// r2d2_droid_red_left.png
			that.assets["sideBackgroundTexture"] = res.sideBackgroundTexture.texture;          // side_background.png
			that.assets["personageDeadTexture"] = res.personageDeadTexture.texture;            // personage_dead.png

			that.assets["mapSpaceBlueTexture"] = res.mapSpaceBlueTexture.texture;              // space_blue.jpg
			that.assets["mapSpaceRedTexture"]= res.mapSpaceRedTexture.texture;                // space_red.jpg

			that.assets["hit1Texture"] = PIXI.Texture.fromFrame('hit_1.png');
			that.assets["hit2Texture"] = PIXI.Texture.fromFrame('hit_2.png');
			that.assets["hit3Texture"] = PIXI.Texture.fromFrame('hit_3.png');
			that.assets["hit4Texture"] = PIXI.Texture.fromFrame('hit_4.png');
			that.assets["hit5Texture"] = PIXI.Texture.fromFrame('hit_5.png');
			
			that.assets["animTexFlash"] = that.loadAnimationTextures(13, 'flash_');
                        that.assets["animTexBoom"] = that.loadAnimationTextures(27, 'boom_');

			that.assets["animTexButtonBlue"] = that.loadAnimationTextures(11, 'button_blue_');
			that.assets["animTexButtonRed"] = that.loadAnimationTextures(11, 'button_red_');
			
			that.assets["engButtonTexture"] = PIXI.Texture.fromFrame('eng.png');
			that.assets["infoButtonTexture"] = PIXI.Texture.fromFrame('information.png');
			that.assets["musicOnButtonTexture"] = PIXI.Texture.fromFrame('music.png');
			that.assets["musicOffButtonTexture"] = PIXI.Texture.fromFrame('music_off.png');
			that.assets["rusButtonTexture"] = PIXI.Texture.fromFrame('rus.png');
			that.assets["soundOnButtonTexture"] = PIXI.Texture.fromFrame('sound.png');
			that.assets["soundOffButtonTexture"] = PIXI.Texture.fromFrame('sound_off.png');
			
			that.assets["animTexSideDarthVader"] = that.loadAnimationTextures(16, 'side_darth_vader_');
                        that.assets["animTexSideLukeSkywalker"] = that.loadAnimationTextures(21, 'side_luke_skywalker_');
                        
			that.assets["planetTextures"] = new Object();
			that.assets["planetTextures"]["Coruscant"] = ["Корусант", res.coruscant_planet.texture, res.coruscant_landscape.texture, res.planet_light.texture];
			that.assets["planetTextures"]["Totooine"] = ["Татуин", res.tatooine_planet.texture, res.tatooine_landscape.texture, res.planet_light.texture];
			that.assets["planetTextures"]["Naboo"] = ["Набу", res.naboo_planet.texture, res.naboo_landscape.texture, res.planet_light.texture];
			that.assets["planetTextures"]["Endor"] = ["Эндор", res.endor_planet.texture, res.endor_landscape.texture, res.planet_light.texture];
			that.assets["planetTextures"]["Hoth"] = ["Хот", res.hoth_planet.texture, res.hoth_landscape.texture, res.planet_light.texture];
			that.assets["planetTextures"]["Mustafar"] = ["Мустафар", res.mustafar_planet.texture, res.mustafar_landscape.texture, res.planet_light.texture];
			that.assets["planetTextures"]["Dagobah"] = ["Дагоба", res.dagobah_planet.texture, res.dagobah_landscape.texture, res.planet_light.texture];
			that.assets["planetTextures"]["Bespin"] = ["Беспин", res.bespin_planet.texture, res.bespin_landscape.texture, res.planet_light.texture];
			that.assets["planetTextures"]["Geonosis"] = ["Джеонозис", res.geonosis_planet.texture, res.geonosis_landscape.texture, res.planet_light.texture];
			that.assets["planetTextures"]["Alderaan"] = ["Альдераан", res.alderaan_planet.texture, res.alderaan_landscape.texture, res.planet_light.texture];
			that.assets["planetTextures"]["Kamino"] = ["Камино", res.kamino_planet.texture, res.kamino_landscape.texture, res.planet_light.texture];
			that.assets["planetTextures"]["DeathStar"] = ["Звезда смерти", res.deathstarTexture.texture, res.deathstar_landscape.texture, res.planet_light.texture];
			that.assets["planetTextures"]["Utapau"] = ["Утапау", res.utapau_planet.texture, res.utapau_landscape.texture, res.planet_light.texture];
			that.assets["planetTextures"]["Saleucami"] = ["Салукемай", res.saleucami_planet.texture, res.saleucami_landscape.texture, res.planet_light.texture];
			that.assets["planetTextures"]["Jakku"] = ["Джакку", res.jakku_planet.texture, res.jakku_landscape.texture, res.planet_light.texture];
			
			that.assets["heroesTextures"] = new Object();
			that.assets["heroesTextures"]["aayla_secura"] = ["Эйла Секура", res.aayla_secura_lr.texture, res.aayla_secura_rl.texture, PIXI.Texture.fromFrame("aayla_secura_icon.png")];
			that.assets["heroesTextures"]["adigallia"] = ["Ади Галлия", res.adigallia.texture, res.adigallia.texture, PIXI.Texture.fromFrame("adigallia_icon.png")];
			that.assets["heroesTextures"]["admiral_ozzel"] = ["Кендал Оззель", res.admiral_ozzel.texture, res.admiral_ozzel.texture, PIXI.Texture.fromFrame("admiral_ozzel_icon.png")];
			that.assets["heroesTextures"]["alliance_to_restore_the_republic"] = ["Альянс повстанцев", res.alliance_to_restore_the_republic.texture, res.alliance_to_restore_the_republic.texture, PIXI.Texture.fromFrame("alliance_to_restore_the_republic_icon.png")];
			that.assets["heroesTextures"]["anakin_skywalker"] = ["Энакин Скайуокер", res.anakin_skywalker.texture, res.anakin_skywalker.texture, PIXI.Texture.fromFrame("anakin_skywalker_icon.png")];
			that.assets["heroesTextures"]["aurra_sing"] = ["Орра Синг", res.aurra_sing_lr.texture, res.aurra_sing_rl.texture, PIXI.Texture.fromFrame("aurra_sing_icon.png")];
			that.assets["heroesTextures"]["b1_battle_droid"] = ["Боевой дроид B1", res.b1_battle_droid_lr.texture, res.b1_battle_droid_rl.texture, PIXI.Texture.fromFrame("b1_battle_droid_icon.png")];
			that.assets["heroesTextures"]["b1_battle_droid_2"] = ["Боевой дроид B1", res.b1_battle_droid_lr.texture, res.b1_battle_droid_rl.texture, PIXI.Texture.fromFrame("b1_battle_droid_icon.png")];
			that.assets["heroesTextures"]["b1_battle_droid_3"] = ["Боевой дроид B1", res.b1_battle_droid_lr.texture, res.b1_battle_droid_rl.texture, PIXI.Texture.fromFrame("b1_battle_droid_icon.png")];
			that.assets["heroesTextures"]["bail_organa"] = ["Бэйл Органа", res.bail_organa.texture, res.bail_organa.texture, PIXI.Texture.fromFrame("bail_organa_icon.png")];
			that.assets["heroesTextures"]["barriss_offee"] = ["Бэррисс Оффи", res.barriss_offee.texture, res.barriss_offee.texture, PIXI.Texture.fromFrame("barriss_offee_icon.png")];
			that.assets["heroesTextures"]["beru_lars"] = ["Беру Ларс", res.beru_lars.texture, res.beru_lars.texture, PIXI.Texture.fromFrame("beru_lars_icon.png")];
			that.assets["heroesTextures"]["bib_fortuna"] = ["Биб Фортуна", res.bib_fortuna.texture, res.bib_fortuna.texture, PIXI.Texture.fromFrame("bib_fortuna_icon.png")];
			that.assets["heroesTextures"]["boba_fett"] = ["Боба Фетт", res.boba_fett.texture, res.boba_fett.texture, PIXI.Texture.fromFrame("boba_fett_icon.png")];
			that.assets["heroesTextures"]["boss_nass"] = ["Босс Насс", res.boss_nass_lr.texture, res.boss_nass_rl.texture, PIXI.Texture.fromFrame("boss_nass_icon.png")];
			that.assets["heroesTextures"]["c_3po"] = ["С-3РО", res.c_3po_lr.texture, res.c_3po_rl.texture, PIXI.Texture.fromFrame("c_3po_icon.png")];
			that.assets["heroesTextures"]["capitan_panaka"] = ["Капитан Панака", res.capitan_panaka.texture, res.capitan_panaka.texture, PIXI.Texture.fromFrame("capitan_panaka_icon.png")];
			that.assets["heroesTextures"]["chewbacca"] = ["Чубака", res.chewbacca_lr.texture, res.chewbacca_rl.texture, PIXI.Texture.fromFrame("chewbacca_icon.png")];
			that.assets["heroesTextures"]["clone_commander_bakara"] = ["Бакара", res.clone_commander_bakara.texture, res.clone_commander_bakara.texture, PIXI.Texture.fromFrame("clone_commander_bakara_icon.png")];
			that.assets["heroesTextures"]["clone_commander_bakara_2"] = ["Бакара", res.clone_commander_bakara.texture, res.clone_commander_bakara.texture, PIXI.Texture.fromFrame("clone_commander_bakara_icon.png")];
			that.assets["heroesTextures"]["clone_commander_cody"] = ["Коди", res.clone_commander_cody_lr.texture, res.clone_commander_cody_rl.texture, PIXI.Texture.fromFrame("clone_commander_cody_icon.png")];
			that.assets["heroesTextures"]["clone_commander_cody_2"] = ["Коди", res.clone_commander_cody_lr.texture, res.clone_commander_cody_rl.texture, PIXI.Texture.fromFrame("clone_commander_cody_icon.png")];
			that.assets["heroesTextures"]["clone_commander_neyo"] = ["Нейо", res.clone_commander_neyo.texture, res.clone_commander_neyo.texture, PIXI.Texture.fromFrame("clone_commander_neyo_icon.png")];
			that.assets["heroesTextures"]["clone_commander_neyo_2"] = ["Нейо", res.clone_commander_neyo.texture, res.clone_commander_neyo.texture, PIXI.Texture.fromFrame("clone_commander_neyo_icon.png")];
			that.assets["heroesTextures"]["clone_commander_rex"] = ["Рекс", res.clone_commander_rex.texture, res.clone_commander_rex.texture, PIXI.Texture.fromFrame("clone_commander_rex_icon.png")];
			that.assets["heroesTextures"]["clone_commander_rex_2"] = ["Рекс", res.clone_commander_rex.texture, res.clone_commander_rex.texture, PIXI.Texture.fromFrame("clone_commander_rex_icon.png")];
			that.assets["heroesTextures"]["commander_jerjerrod"] = ["Тиаан Джерджеррод", res.commander_jerjerrod_lr.texture, res.commander_jerjerrod_rl.texture, PIXI.Texture.fromFrame("commander_jerjerrod_icon.png")];
			that.assets["heroesTextures"]["darth_maul"] = ["Дарт Мол", res.darth_maul.texture, res.darth_maul.texture, PIXI.Texture.fromFrame("darth_maul_icon.png")];
			that.assets["heroesTextures"]["darth_sidious"] = ["Дарт Сидиус", res.darth_sidious_lr.texture, res.darth_sidious_rl.texture, PIXI.Texture.fromFrame("darth_sidious_icon.png")];
			that.assets["heroesTextures"]["darth_vader"] = ["Дарт Вейдер", res.darth_vader.texture, res.darth_vader.texture, PIXI.Texture.fromFrame("darth_vader_icon.png")];
			that.assets["heroesTextures"]["dooku"] = ["Граф Дуку", res.dooku_lr.texture, res.dooku_rl.texture, PIXI.Texture.fromFrame("dooku_icon.png")];
			that.assets["heroesTextures"]["eeth_koth"] = ["Иит Кот", res.eeth_koth.texture, res.eeth_koth.texture, PIXI.Texture.fromFrame("eeth_koth_icon.png")];
			that.assets["heroesTextures"]["finn"] = ["Финн", res.finn_lr.texture, res.finn_rl.texture, PIXI.Texture.fromFrame("finn_icon.png")];
			that.assets["heroesTextures"]["general_grievous"] = ["Генерал Гривус", res.general_grievous.texture, res.general_grievous.texture, PIXI.Texture.fromFrame("general_grievous_icon.png")];
			that.assets["heroesTextures"]["general_grievous_2"] = ["Генерал Гривус", res.general_grievous.texture, res.general_grievous.texture, PIXI.Texture.fromFrame("general_grievous_icon.png")];
			that.assets["heroesTextures"]["general_madine"] = ["Генерал Мадин", res.general_madine_lr.texture, res.general_madine_rl.texture, PIXI.Texture.fromFrame("general_madine_icon.png")];
			that.assets["heroesTextures"]["han_solo"] = ["Хан Соло", res.han_solo_lr.texture, res.han_solo_rl.texture, PIXI.Texture.fromFrame("han_solo_icon.png")];
			that.assets["heroesTextures"]["jango_fett"] = ["Джанго Фетт", res.jango_fett_lr.texture, res.jango_fett_rl.texture, PIXI.Texture.fromFrame("jango_fett_icon.png")];
			that.assets["heroesTextures"]["jar_jar_binks"] = ["Джа-Джа Бинкс", res.jar_jar_binks.texture, res.jar_jar_binks.texture, PIXI.Texture.fromFrame("jar_jar_binks_icon.png")];
			that.assets["heroesTextures"]["jawas"] = ["Джавы", res.jawas.texture, res.jawas.texture, PIXI.Texture.fromFrame("jawas_icon.png")];
			that.assets["heroesTextures"]["kapitan_antilles"] = ["Капитан Антиллес", res.kapitan_antilles.texture, res.kapitan_antilles.texture, PIXI.Texture.fromFrame("kapitan_antilles_icon.png")];
			that.assets["heroesTextures"]["ki_adi_mundi"] = ["Ки-Ади-Мунди", res.ki_adi_mundi.texture, res.ki_adi_mundi.texture, PIXI.Texture.fromFrame("ki_adi_mundi_icon.png")];
			that.assets["heroesTextures"]["kit_fisto"] = ["Кит Фисто", res.kit_fisto.texture, res.kit_fisto.texture, PIXI.Texture.fromFrame("kit_fisto_icon.png")];
			that.assets["heroesTextures"]["kylo_ren"] = ["Кайло Рен", res.kylo_ren.texture, res.kylo_ren.texture, PIXI.Texture.fromFrame("kylo_ren_icon.png")];
			that.assets["heroesTextures"]["lando_calrissian"] = ["Лэндо Калриссиан", res.lando_calrissian_lr.texture, res.lando_calrissian_rl.texture, PIXI.Texture.fromFrame("lando_calrissian_icon.png")];
			that.assets["heroesTextures"]["leia_organa"] = ["Принцесса Лея Органа", res.leia_organa_lr.texture, res.leia_organa_rl.texture, PIXI.Texture.fromFrame("leia_organa_icon.png")];
			that.assets["heroesTextures"]["luke_skywalker"] = ["Люк Скайуокер", res.luke_skywalker.texture, res.luke_skywalker.texture, PIXI.Texture.fromFrame("luke_skywalker_icon.png")];
			that.assets["heroesTextures"]["mace_windu"] = ["Мейс Винду", res.mace_windu_lr.texture, res.mace_windu_rl.texture, PIXI.Texture.fromFrame("mace_windu_icon.png")];
			that.assets["heroesTextures"]["mas_amedda"] = ["Мас Амедда", res.mas_amedda.texture, res.mas_amedda.texture, PIXI.Texture.fromFrame("mas_amedda_icon.png")];
			that.assets["heroesTextures"]["maximilian_veers"] = ["Максимилиан Вирс", res.maximilian_veers.texture, res.maximilian_veers.texture, PIXI.Texture.fromFrame("maximilian_veers_icon.png")];
			that.assets["heroesTextures"]["mon_motma"] = ["Мон Мотма", res.mon_motma_lr.texture, res.mon_motma_rl.texture, PIXI.Texture.fromFrame("mon_motma_icon.png")];
			that.assets["heroesTextures"]["nute_gunray"] = ["Нут Ганрей", res.nute_gunray.texture, res.nute_gunray.texture, PIXI.Texture.fromFrame("nute_gunray_icon.png")];
			that.assets["heroesTextures"]["obi_wan_kenobi"] = ["Оби-Ван Кеноби", res.obi_wan_kenobi.texture, res.obi_wan_kenobi.texture, PIXI.Texture.fromFrame("obi_wan_kenobi_icon.png")];
			that.assets["heroesTextures"]["owen_lars"] = ["Оуэн Ларс", res.owen_lars.texture, res.owen_lars.texture, PIXI.Texture.fromFrame("owen_lars_icon.png")];
			that.assets["heroesTextures"]["padme_amidala"] = ["Падме Амидала", res.padme_amidala.texture, res.padme_amidala.texture, PIXI.Texture.fromFrame("padme_amidala_icon.png")];
			that.assets["heroesTextures"]["palpatine"] = ["Палпатин", res.palpatine.texture, res.palpatine.texture, PIXI.Texture.fromFrame("palpatine_icon.png")];
			that.assets["heroesTextures"]["phasma"] = ["Фазма", res.phasma.texture, res.phasma.texture, PIXI.Texture.fromFrame("phasma_icon.png")];   
			that.assets["heroesTextures"]["plo_koon"] = ["Пло Кун", res.plo_koon.texture, res.plo_koon.texture, PIXI.Texture.fromFrame("plo_koon_icon.png")];
			that.assets["heroesTextures"]["poe_dameron"] = ["По Дамерон", res.poe_dameron.texture, res.poe_dameron.texture, PIXI.Texture.fromFrame("poe_dameron_icon.png")];
			that.assets["heroesTextures"]["poggle_the_lesser"] = ["Поггль Меньший", res.poggle_the_lesser.texture, res.poggle_the_lesser.texture, PIXI.Texture.fromFrame("poggle_the_lesser_icon.png")];
			that.assets["heroesTextures"]["qui_gon_jinn"] = ["Квай-Гон Джинн", res.qui_gon_jinn_lr.texture, res.qui_gon_jinn_rl.texture, PIXI.Texture.fromFrame("qui_gon_jinn_icon.png")];
			that.assets["heroesTextures"]["red_battle_droid"] = ["Боевой дроид", res.red_battle_droid_lr.texture, res.red_battle_droid_rl.texture, PIXI.Texture.fromFrame("red_battle_droid_icon.png")];
			that.assets["heroesTextures"]["republic_clone_army"] = ["Республиканская армия клонов", res.republic_clone_army.texture, res.republic_clone_army.texture, PIXI.Texture.fromFrame("republic_clone_army_icon.png")];
			that.assets["heroesTextures"]["republic_clone_army_2"] = ["Республиканская армия клонов", res.republic_clone_army.texture, res.republic_clone_army.texture, PIXI.Texture.fromFrame("republic_clone_army_icon.png")];
			that.assets["heroesTextures"]["rey"] = ["Рей", res.rey.texture, res.rey.texture, PIXI.Texture.fromFrame("rey_icon.png")];
			that.assets["heroesTextures"]["royal_guards"] = ["Королевский страж", res.royal_guards.texture, res.royal_guards.texture, PIXI.Texture.fromFrame("royal_guards_icon.png")];
			that.assets["heroesTextures"]["rune_haako"] = ["Рун Хаако", res.rune_haako_lr.texture, res.rune_haako_rl.texture, PIXI.Texture.fromFrame("rune_haako_icon.png")];
			that.assets["heroesTextures"]["saesee_tiin"] = ["Сэси Тийн", res.saesee_tiin_lr.texture, res.saesee_tiin_rl.texture, PIXI.Texture.fromFrame("saesee_tiin_icon.png")];
			that.assets["heroesTextures"]["separatists"] = ["Сепаратисты", res.separatists.texture, res.separatists.texture, PIXI.Texture.fromFrame("separatists_icon.png")];
			that.assets["heroesTextures"]["separatists_2"] = ["Сепаратисты", res.separatists.texture, res.separatists.texture, PIXI.Texture.fromFrame("separatists_icon.png")];
			that.assets["heroesTextures"]["shaak_ti"] = ["Шаак Ти", res.shaak_ti.texture, res.shaak_ti.texture, PIXI.Texture.fromFrame("shaak_ti_icon.png")];
			that.assets["heroesTextures"]["shmi_skywalker"] = ["Шми Скайуокер", res.shmi_skywalker.texture, res.shmi_skywalker.texture, PIXI.Texture.fromFrame("shmi_skywalker_icon.png")];
			that.assets["heroesTextures"]["sio_bibble"] = ["Сио Биббл", res.sio_bibble.texture, res.sio_bibble.texture, PIXI.Texture.fromFrame("sio_bibble_icon.png")];
			that.assets["heroesTextures"]["stormtrooper_1"] = ["Штурмовик", res.stormtrooper.texture, res.stormtrooper.texture, PIXI.Texture.fromFrame("stormtrooper_icon.png")];
			that.assets["heroesTextures"]["stormtrooper_1_2"] = ["Штурмовик", res.stormtrooper.texture, res.stormtrooper.texture, PIXI.Texture.fromFrame("stormtrooper_icon.png")];
			that.assets["heroesTextures"]["stormtrooper_1_3"] = ["Штурмовик", res.stormtrooper.texture, res.stormtrooper.texture, PIXI.Texture.fromFrame("stormtrooper_icon.png")];
			that.assets["heroesTextures"]["stormtrooper_2"] = ["Штурмовик", res.stormtrooper_lr.texture, res.stormtrooper_rl.texture, PIXI.Texture.fromFrame("stormtrooper_icon.png")];
			that.assets["heroesTextures"]["stormtroopers"] = ["Имперские штурмовики", res.stormtroopers.texture, res.stormtroopers.texture, PIXI.Texture.fromFrame("stormtroopers_icon.png")];
			that.assets["heroesTextures"]["stormtroopers_2"] = ["Имперские штурмовики", res.stormtroopers.texture, res.stormtroopers.texture, PIXI.Texture.fromFrame("stormtroopers_icon.png")];
			that.assets["heroesTextures"]["stormtroopers_3"] = ["Имперские штурмовики", res.stormtroopers.texture, res.stormtroopers.texture, PIXI.Texture.fromFrame("stormtroopers_icon.png")];
			that.assets["heroesTextures"]["tion_medon"] = ["Тион Медон", res.tion_medon.texture, res.tion_medon.texture, PIXI.Texture.fromFrame("tion_medon_icon.png")];
			that.assets["heroesTextures"]["trade_federation"] = ["Торговая Федерация", res.trade_federation.texture, res.trade_federation.texture, PIXI.Texture.fromFrame("trade_federation_icon.png")];
			that.assets["heroesTextures"]["tusken"] = ["Таскенские рейдеры", res.tusken.texture, res.tusken.texture, PIXI.Texture.fromFrame("tusken_icon.png")];
			that.assets["heroesTextures"]["tusken_2"] = ["Таскенские рейдеры", res.tusken.texture, res.tusken.texture, PIXI.Texture.fromFrame("tusken_icon.png")];
			that.assets["heroesTextures"]["wat_tambor"] = ["Уот Тамбор", res.wat_tambor_lr.texture, res.wat_tambor_rl.texture, PIXI.Texture.fromFrame("wat_tambor_icon.png")];
			that.assets["heroesTextures"]["watto"] = ["Уотто", res.watto.texture, res.watto.texture, PIXI.Texture.fromFrame("watto_icon.png")];
			that.assets["heroesTextures"]["wicket_wysri_warrick"] = ["Уикет У.Уоррик", res.wicket_wysri_warrick.texture, res.wicket_wysri_warrick.texture, PIXI.Texture.fromFrame("wicket_wysri_warrick_icon.png")];
			that.assets["heroesTextures"]["yoda"] = ["Йода", res.yoda.texture, res.yoda.texture, PIXI.Texture.fromFrame("yoda_icon.png")];
			
			that.assets["personagesJson"] = res.personages;
			that.assets["planetsJson"] = res.planets;

			that.assets["fieldLevelsJson"] = new Object();
			that.assets["fieldLevelsJson"]["level_0_0"] = res.level_0_0;
			that.assets["fieldLevelsJson"]["level_0_1"] = res.level_0_1;
			that.assets["fieldLevelsJson"]["level_0_2"] = res.level_0_2;
			that.assets["fieldLevelsJson"]["level_0_3"] = res.level_0_3;
			that.assets["fieldLevelsJson"]["level_0_4"] = res.level_0_4;
			that.assets["fieldLevelsJson"]["level_0_5"] = res.level_0_5;
			that.assets["fieldLevelsJson"]["level_0_6"] = res.level_0_6;
			that.assets["fieldLevelsJson"]["level_0_7"] = res.level_0_7;
			that.assets["fieldLevelsJson"]["level_0_8"] = res.level_0_8;
			that.assets["fieldLevelsJson"]["level_0_9"] = res.level_0_9;
                        that.assets["fieldLevelsJson"]["level_0_10"] = res.level_0_10;
			that.assets["fieldLevelsJson"]["level_1_0"] = res.level_1_0;
			that.assets["fieldLevelsJson"]["level_1_1"] = res.level_1_1;
			that.assets["fieldLevelsJson"]["level_1_2"] = res.level_1_2;
			that.assets["fieldLevelsJson"]["level_1_3"] = res.level_1_3;
			that.assets["fieldLevelsJson"]["level_1_4"] = res.level_1_4;
			that.assets["fieldLevelsJson"]["level_1_5"] = res.level_1_5;
			that.assets["fieldLevelsJson"]["level_1_6"] = res.level_1_6;
			that.assets["fieldLevelsJson"]["level_1_7"] = res.level_1_7;
			that.assets["fieldLevelsJson"]["level_1_8"] = res.level_1_8;
			that.assets["fieldLevelsJson"]["level_1_9"] = res.level_1_9;
			that.assets["fieldLevelsJson"]["level_2_0"] = res.level_2_0;
			that.assets["fieldLevelsJson"]["level_2_1"] = res.level_2_1;
			that.assets["fieldLevelsJson"]["level_2_2"] = res.level_2_2;
			that.assets["fieldLevelsJson"]["level_2_3"] = res.level_2_3;
			that.assets["fieldLevelsJson"]["level_2_4"] = res.level_2_4;
			that.assets["fieldLevelsJson"]["level_2_5"] = res.level_2_5;
			that.assets["fieldLevelsJson"]["level_2_6"] = res.level_2_6;
			that.assets["fieldLevelsJson"]["level_2_7"] = res.level_2_7;
			that.assets["fieldLevelsJson"]["level_2_8"] = res.level_2_8;
			that.assets["fieldLevelsJson"]["level_2_9"] = res.level_2_9;
			
			that.complete++;
			that.onComplete();
		},
		
		
		loadSounds: function()
		{
			var queue = new createjs.LoadQueue();
			createjs.Sound.alternateExtensions = ["mp3"];
			queue.installPlugin(createjs.Sound);
			queue.on("progress", that.onSoundLoaderProcess);
			queue.on("complete", that.onSoundLoaderComplete);
			queue.loadFile({"id":"StarWarsThemeSong", "src":"assets/music/begin_menu_end.mp3"});
                        queue.loadFile({"id":"StarWarsBattle1", "src":"assets/music/battle_1.mp3"});
                        queue.loadFile({"id":"StarWarsBattle2", "src":"assets/music/battle_2.mp3"});
                        queue.loadFile({"id":"StarWarsEnd", "src":"assets/music/end.mp3"});
                        queue.loadFile({"id":"StarWarsButtonClick", "src":"assets/sound/click.mp3"});
                        queue.loadFile({"id":"StarWarsWindowOpen", "src":"assets/sound/open.mp3"});
                        queue.loadFile({"id":"StarWarsWindowClose", "src":"assets/sound/close.mp3"});
                        queue.loadFile({"id":"StarWarsHit1", "src":"assets/sound/hit1.mp3"});
                        queue.loadFile({"id":"StarWarsHit2", "src":"assets/sound/hit2.mp3"});
                        queue.loadFile({"id":"StarWarsHit3", "src":"assets/sound/hit3.mp3"});
                        queue.loadFile({"id":"StarWarsHit4", "src":"assets/sound/hit4.mp3"});
                        queue.loadFile({"id":"StarWarsHit5", "src":"assets/sound/hit5.mp3"});
			queue = null;
		},
		
		onSoundLoaderProcess: function(event)
		{
			that.percentSounds = Math.round((event.loaded) * (50 / event.total));
			that.progressText.text = "Загрузка " + (that.percentTextures + that.percentSounds) + "%";
		},
		
		onSoundLoaderComplete: function(event)
		{
			that.complete++;
			that.onComplete();
		},
		
		loadAnimationTextures: function(countFrame, nameFrame)
		{
			var nameTexture;
			var animTextures = [];
			for(var i = 1; i <= countFrame; i++)
			{
				if(i < 10)
				{
					nameTexture = nameFrame + '0' + i + '.png';
				}else{
					nameTexture = nameFrame + i + '.png';
				}
				var texture = PIXI.Texture.fromFrame(nameTexture);
				animTextures.push(texture);
			}
			return animTextures;
		},
		
		show: function()
		{
			return that.windowStage;
		},
		
		close: function()
		{
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			return that.windowStage;
		},
		
		getWindowStage: function()
		{
			return that.windowStage;
		},
		
		getAsset: function(nameAsset)
		{
			return that.assets[nameAsset];
		},
		
		onComplete: function()
		{
			if(that.complete === 2)
			{
				parent.loadAssetsComplete();
			}
		}
	};
	return that;
};

/* == END FILE ========================================================== */

/* == START FILE ========================================================= */


var Settings = function(parent, location)
{
	var that = {
		windowStage: null,
		lineAnimationGraphics: null,
		styleBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 },
		styleRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 },
		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		create: function()
		{
			that.windowStage = new PIXI.Container();
			that.backgroundCreate();
			that.windowCreate();
			that.titleCreate();
			that.textCreate();
			that.buttonsCreate();
			that.buttonCloseCreate();
		},
		
		backgroundCreate: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.hitArea = new PIXI.Rectangle(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
			graphics.interactive = true;
			graphics.lineStyle(1, 0x000000, 0.05);
			graphics.beginFill(0x000000, 0.5);
			graphics.drawRect(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
			graphics.endFill();
			that.windowStage.addChild(graphics);
		},
		
		windowCreate: function()
		{
			if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI)
			{
				var graphics = new PIXI.Graphics(); 
				graphics.lineStyle(2, 0x0080C0, 1);
				graphics.beginFill(0x0080C0, 0.2);
				graphics.moveTo(250,250);
				graphics.lineTo(600, 250);
				graphics.lineTo(600, 500);
				graphics.lineTo(250, 500);
				graphics.endFill();
				for(var i = 0; i < 55; i++)
				{
					if(i > 15 && i < 35)
					{
						
					}else{
						graphics.lineStyle(1, 0x0090F0, 0.5);
						graphics.moveTo(250,280+(3*i));
						graphics.lineTo(600, 280+(3*i));
					}
				}
				that.windowStage.addChild(graphics);
				
				that.lineAnimationGraphics = new PIXI.Graphics(); 
				that.lineAnimationGraphics.lineStyle(10, 0x0090F0, 0.3);
				that.lineAnimationGraphics.moveTo(250,255);
				that.lineAnimationGraphics.lineTo(600, 255);
				that.windowStage.addChild(that.lineAnimationGraphics);
								
				graphics = new PIXI.Graphics(); 
				graphics.lineStyle(1, 0x0080C0, 1);
				graphics.beginFill(0x0080C0, 1);
				graphics.moveTo(400,250);
				graphics.lineTo(425, 275);
				graphics.lineTo(600, 275);
				graphics.lineTo(600, 250);
				graphics.endFill();
				that.windowStage.addChild(graphics);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				var graphics = new PIXI.Graphics(); 
				graphics.lineStyle(2, 0xA63A24, 1);
				graphics.beginFill(0xA63A24, 0.2);
				graphics.moveTo(250,250);
				graphics.lineTo(600, 250);
				graphics.lineTo(600, 500);
				graphics.lineTo(250, 500);
				graphics.endFill();
				for(var i = 0; i < 55; i++)
				{
					if(i > 15 && i < 35)
					{
						
					}else{
						graphics.lineStyle(1, 0xA63A24, 0.5);
						graphics.moveTo(250,280+(3*i));
						graphics.lineTo(600, 280+(3*i));
					}
				}
				that.windowStage.addChild(graphics);
				
				that.lineAnimationGraphics = new PIXI.Graphics(); 
				that.lineAnimationGraphics.lineStyle(10, 0xA63A24, 0.3);
				that.lineAnimationGraphics.moveTo(250,255);
				that.lineAnimationGraphics.lineTo(600, 255);
				that.windowStage.addChild(that.lineAnimationGraphics);
				
				graphics = new PIXI.Graphics(); 
				graphics.lineStyle(1, 0xA63A24, 1);
				graphics.beginFill(0xA63A24, 1);
				graphics.moveTo(400,250);
				graphics.lineTo(425, 275);
				graphics.lineTo(600, 275);
				graphics.lineTo(600, 250);
				graphics.endFill();
				that.windowStage.addChild(graphics);
			}
		},
		
		titleCreate: function()
		{
			var text;
			if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI) text = new PIXI.Text("НАСТРОЙКИ", that.styleBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text("НАСТРОЙКИ", that.styleRedText); 
			text.x = 500;
			text.y = 255;
			that.windowStage.addChild(text);
		},
		
		textCreate: function()
		{
			 var text;
			if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI) text = new PIXI.Text("Окно настроек позволяет включить или отключить в игре звуки и музыку.\n\n\n\n\nТакже вы можете посетить группу разработчика ВКонтакте, нажав на кнопку 'информация'.", that.styleBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text("Окно настроек позволяет включить или отключить в игре звуки и музыку.\n\n\n\n\nТакже вы можете посетить группу разработчика ВКонтакте, нажав на кнопку 'информация'.", that.styleRedText); 
			text.x = 255;
			text.y = 285;
			that.windowStage.addChild(text);
		},
		
		buttonsCreate: function()
		{
			var soundButton;
			if(parent.config.sound === true) soundButton = new PIXI.Sprite(parent.assets.getAsset("soundOnButtonTexture"));
			else soundButton = new PIXI.Sprite(parent.assets.getAsset("soundOffButtonTexture"));
			soundButton.name = "sound";
			soundButton.position.x = 300;
			soundButton.position.y = 345;
			soundButton.interactive = true;
			soundButton.buttonMode = true;
			soundButton.tap = that.onButtonsClick;
			soundButton.click = that.onButtonsClick;
			soundButton.on('mousedown', that.onButtonsDown);
			soundButton.on('touchstart', that.onButtonsDown);
			soundButton.on('mouseup', that.onButtonsUp);
			soundButton.on('touchend', that.onButtonsUp);
			soundButton.on('mouseupoutside', that.onButtonsUp);
			soundButton.on('touchendoutside', that.onButtonsUp);
			that.windowStage.addChild(soundButton);
			
			var musicButton;
			if(parent.config.music === true) musicButton = new PIXI.Sprite(parent.assets.getAsset("musicOnButtonTexture"));
			else musicButton = new PIXI.Sprite(parent.assets.getAsset("musicOffButtonTexture"));
			musicButton.name = "music";
			musicButton.position.x = 405;
			musicButton.position.y = 345;
			musicButton.interactive = true;
			musicButton.buttonMode = true;
			musicButton.tap = that.onButtonsClick;
			musicButton.click = that.onButtonsClick;
			musicButton.on('mousedown', that.onButtonsDown);
			musicButton.on('touchstart', that.onButtonsDown);
			musicButton.on('mouseup', that.onButtonsUp);
			musicButton.on('touchend', that.onButtonsUp);
			musicButton.on('mouseupoutside', that.onButtonsUp);
			musicButton.on('touchendoutside', that.onButtonsUp);
			that.windowStage.addChild(musicButton);
			
			var infoButton = new PIXI.Sprite(parent.assets.getAsset("infoButtonTexture"));
			infoButton.name = "info";
			infoButton.position.x = 510;
			infoButton.position.y = 345;
			infoButton.interactive = true;
			infoButton.buttonMode = true;
			infoButton.tap = that.onButtonsClick;
			infoButton.click = that.onButtonsClick;
			infoButton.on('mousedown', that.onButtonsDown);
			infoButton.on('touchstart', that.onButtonsDown);
			infoButton.on('mouseup', that.onButtonsUp);
			infoButton.on('touchend', that.onButtonsUp);
			infoButton.on('mouseupoutside', that.onButtonsUp);
			infoButton.on('touchendoutside', that.onButtonsUp);
			that.windowStage.addChild(infoButton);
		},
		
		onButtonsDown: function(event)
		{
			this.isdown = true;
			this.scale.set(0.95);
			this.position.x += 5; 
		},
		
		onButtonsUp: function(event)
		{
			if(this.isdown)
			{
				this.isdown = false;
				this.scale.set(1.0);
				this.position.x -= 5;
			}
		},
		
		onButtonsClick: function(event)
		{
                        parent.sound.soundPlayStarWarsButtonClick();
			 if(this.name === "sound")
			{
				if(parent.config.sound === true)
				{
					parent.config.sound = false;
					this.texture = parent.assets.getAsset("soundOffButtonTexture");
					// !!!
				}else{
					parent.config.sound = true;
					this.texture = parent.assets.getAsset("soundOnButtonTexture");
					// !!!
				}
			}
			if(this.name === "music")
			{
				if(parent.config.music === true)
				{
					parent.config.music = false;
					this.texture = parent.assets.getAsset("musicOffButtonTexture");
					
                                        if(location === "menu_map") parent.sound.soundStopStarWarsThemeSong();
                                        if(location === "level") parent.sound.soundStopStarWarsBattle();
				}else{
					parent.config.music = true;
					this.texture = parent.assets.getAsset("musicOnButtonTexture");
                                        
					if(location === "menu_map") parent.sound.soundPlayStarWarsThemeSong();
                                        if(location === "level") parent.sound.soundPlayStarWarsBattle();
				}
			}
			if(this.name === "info")
			{
				window.open("https://vk.com/club62618339","_target");
			}
		},
		
		buttonCloseCreate: function()
		{
			if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = "button_close";
				button.position.x = 320; 
				button.position.y = 450; 
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonCloseUpdate;
				button.tap = that.onButtonCloseClick; 
				button.click = that.onButtonCloseClick; 
				button.on('mouseover', that.onButtonCloseOver);
				button.on('mouseout', that.onButtonCloseOut);
				var text = new PIXI.Text("Закрыть", that.styleBlueText); 
				text.x = button.width / 3;
				text.y = button.height / 3;
				button.addChild(text); 
				that.windowStage.addChild(button);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
				button.name = "button_close";
				button.position.x = 320; 
				button.position.y = 450; 
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonCloseUpdate;
				button.tap = that.onButtonCloseClick; 
				button.click = that.onButtonCloseClick; 
				button.on('mouseover', that.onButtonCloseOver);
				button.on('mouseout', that.onButtonCloseOut);
				var text = new PIXI.Text("Закрыть", that.styleRedText); 
				text.x = button.width / 3;
				text.y = button.height / 3;
				button.addChild(text); 
				that.windowStage.addChild(button);
			}
		},
		
		onButtonCloseOver: function(event)
		{
			this.isOver = true;
			this.gotoAndPlay(1);
		},
		
		onButtonCloseOut: function(event)
		{
			this.isOver = false;
			this.gotoAndStop(0);
		},
		
		onButtonCloseUpdate: function(event)
		{
			if(this.isOver)
			{
				this.gotoAndPlay(1);
			}else{
				this.gotoAndStop(0);
			}
		},
		
		onButtonCloseClick: function(event)
		{
                        parent.sound.soundPlayStarWarsButtonClick();
			parent.settingsClose();
		},
		
		tweenStart: function()
		{
			createjs.Tween.get(that.lineAnimationGraphics, {loop: true}) 
				.to({x: 0, y: 240}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Ticker.setFPS(60);
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.lineAnimationGraphics);
		},
		
		show: function()
		{
                        if(parent.level !== null) parent.timer.timerPauseBegin();
                        that.tweenStart();
			return that.windowStage;
		},
		
		close: function()
		{
                        if(parent.level !== null)parent.timer.timerPauseEnd();
			that.tweenStop();
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			return that.windowStage;
		},
		
		getWindowStage: function()
		{
			return that.windowStage;
		},
		
		destroy: function()
		{
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			that.windowStage.destroy();
			delete that.windowStage.children;
			
			for(var property in that) that[property] = null;
		}
	};
	return that;
};

/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var Side = function(parent)
{
	var that = {
		windowStage: null,
		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		side: null,
		
		selectGraphics: null,
		droidBlueStage: null,
		styleDroidBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 275 },
		blueLineAnimationGraphics: null,
		
		droidRedStage: null,
		styleDroidRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 275 },
		redLineAnimationGraphics: null,
		
		create: function()
		{
			that.windowStage = new PIXI.Container();
			that.backgroundCreate();
			that.borderCreate();
			that.heroesCreate();
			that.droidCreate();
		},
		
		backgroundCreate: function()
		{
			var sprite = new PIXI.Sprite(parent.assets.getAsset("sideBackgroundTexture"));
			sprite.position.x = 0; 
			sprite.position.y = 0; 
			that.windowStage.addChild(sprite);
		},

		borderCreate: function()
		{
			var graphics = new PIXI.Graphics(); 

			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);
			
			graphics.lineStyle(2, 0xFF0000, 1);
			graphics.moveTo(430,720);
			graphics.lineTo(10, 720);
			graphics.moveTo(10,720);
			graphics.lineTo(10, 10);
			graphics.moveTo(10,10);
			graphics.lineTo(430, 10);
			
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(5, 600,4);
			graphics.endFill();
			
			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(5,600);
			graphics.lineTo(5, 725);
			
			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(5,725);
			graphics.lineTo(25, 725);
			graphics.moveTo(25,725);
			graphics.lineTo(430, 725);
			
			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(430,725);
			graphics.lineTo(855, 725);
			
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(855, 725,4);
			graphics.endFill();
			
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(855, 150,4);
			graphics.endFill();
			
			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(855,150);
			graphics.lineTo(855, 5);
			graphics.moveTo(855,5);
			graphics.lineTo(430, 5);
			
			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(430,5);
			graphics.lineTo(5, 5);
			
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(5,5,4);
			graphics.endFill();
			
			that.windowStage.addChild(graphics);
		},
		
		heroesCreate: function()
		{
			var button1 = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexSideDarthVader"));
			button1.name = "DarthVader";
			button1.position.x = 25;
			button1.position.y = 75;
			button1.interactive = true;
			button1.buttonMode = true;
			button1.tap = that.onButtonClick; 
			button1.click = that.onButtonClick; 
			button1.on('mouseover', that.onButtonOver);
			button1.on('mouseout', that.onButtonOut);
			button1.loop = true;
			button1.animationSpeed = 0.2;
			button1.play();
			that.windowStage.addChild(button1);
			
			var button2 = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexSideLukeSkywalker"));
			button2.name = "LukeSkywalker";
			button2.position.x = 475;
			button2.position.y = 80;
			button2.interactive = true;
			button2.buttonMode = true;
			button2.tap = that.onButtonClick; 
			button2.click = that.onButtonClick; 
			button2.on('mouseover', that.onButtonOver);
			button2.on('mouseout', that.onButtonOut);
                        button2.loop = true;
			button2.animationSpeed = 0.2;
			button2.play();
			that.windowStage.addChild(button2);
		},
		
		onButtonOver: function()
		{
			if(this.name === "DarthVader")
			{
				that.droidBlueStage.visible = false;
				that.droidRedStage.visible = true;
			}
			if(this.name === "LukeSkywalker")
			{
				that.droidBlueStage.visible = true;
				that.droidRedStage.visible = false;
			}
		},
		
		onButtonOut: function()
		{
			
		},
		
		onButtonClick: function()
		{
                        parent.sound.soundPlayStarWarsButtonClick();
                        
			if(this.name === "DarthVader") that.side = that.SIDE_SITH;
			if(this.name === "LukeSkywalker") that.side = that.SIDE_JEDI;
			
			parent.config.side = that.side;
			parent.sideClose();
		},
		
		droidCreate: function()
		{
                    that.droidBlueStage = new PIXI.Container();
                    var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidBlueRightTexture")); 
                    textureSprite.position.x = 700; 
                    textureSprite.position.y = 550; 
                    textureSprite.scale.set(0.4);
                    that.droidBlueStage.addChild(textureSprite);
                    var graphics = new PIXI.Graphics(); 
                    graphics.lineStyle(2, 0x0080C0, 1);
                    graphics.beginFill(0x0080C0, 0.2);
                    graphics.moveTo(450,450);
                    graphics.lineTo(735, 450);
                    graphics.lineTo(735, 575);
                    graphics.lineTo(450, 575);
                    graphics.endFill();
                    for(var i = 0; i < 42; i++)
                    {
                            graphics.lineStyle(1, 0x0090F0, 0.5);
                            graphics.moveTo(450, 450+(3*i));
                            graphics.lineTo(735, 450+(3*i));
                    }
                    that.droidBlueStage.addChild(graphics);
                    var textMessage = new PIXI.Text("\nВыберите светлую сторону силы.\n\"Только покой ощутив, возмёшь контроль над желаниями своими\". \n\nПройдите путь Люка Скайуокера!", that.styleDroidBlueText); 
                    textMessage.x = 455; 
                    textMessage.y = 455; 
                    that.droidBlueStage.addChild(textMessage);
                    that.blueLineAnimationGraphics = new PIXI.Graphics(); 
                    that.blueLineAnimationGraphics.lineStyle(10, 0x0090F0, 0.3);
                    that.blueLineAnimationGraphics.moveTo(450,455);
                    that.blueLineAnimationGraphics.lineTo(735, 455);
                    that.droidBlueStage.addChild(that.blueLineAnimationGraphics);
                    that.windowStage.addChild(that.droidBlueStage);


                    that.droidRedStage = new PIXI.Container();
                    var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidRedLeftTexture")); 
                    textureSprite.position.x = 40; 
                    textureSprite.position.y = 550; 
                    textureSprite.scale.set(0.4);
                    that.droidRedStage.addChild(textureSprite);
                    var graphics = new PIXI.Graphics(); 
                    graphics.lineStyle(2, 0x800000, 1);
                    graphics.beginFill(0x800000, 0.2);
                    graphics.moveTo(125,450);
                    graphics.lineTo(410, 450);
                    graphics.lineTo(410, 575);
                    graphics.lineTo(125, 575);
                    graphics.endFill();
                    for(var i = 0; i < 42; i++)
                    {
                            graphics.lineStyle(1, 0x800000, 0.5);
                            graphics.moveTo(125, 450+(3*i));
                            graphics.lineTo(410, 450+(3*i));
                    }
                    that.droidRedStage.addChild(graphics);
                    var textMessage = new PIXI.Text("\nВыберите тёмную сторону силы.\n\"Поддайся амбициям, почувствуй власть в своих руках.\" \n\nПройдите путь Дарт Вейдера!", that.styleDroidRedText); 
                    textMessage.x = 130; 
                    textMessage.y = 455; 
                    that.droidRedStage.addChild(textMessage);
                    that.redLineAnimationGraphics = new PIXI.Graphics(); 
                    that.redLineAnimationGraphics.lineStyle(10, 0x800000, 0.3);
                    that.redLineAnimationGraphics.moveTo(125,455);
                    that.redLineAnimationGraphics.lineTo(410, 455);
                    that.droidRedStage.addChild(that.redLineAnimationGraphics);
                    that.windowStage.addChild(that.droidRedStage);

                    that.droidBlueStage.visible = false;
                    that.droidRedStage.visible = false;
		},
		
		tweenStart: function()
		{
			createjs.Tween.get(that.blueLineAnimationGraphics, {loop: true}) 
				.to({x: 0, y: 115}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Tween.get(that.redLineAnimationGraphics, {loop: true}) 
				.to({x: 0, y: 115}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Ticker.setFPS(60); 
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.blueLineAnimationGraphics);
			createjs.Tween.removeTweens(that.redLineAnimationGraphics);
		},
		
		show: function()
		{
			that.tweenStart();
			return that.windowStage;
		},
		
		close: function()
		{
			that.tweenStop();
			
			for(var child in that.droidBlueStage.children) that.droidBlueStage.removeChild(that.droidBlueStage.children[child]);
			that.droidBlueStage.destroy();
			delete that.droidBlueStage.children;
			
			for(var child in that.droidRedStage.children) that.droidRedStage.removeChild(that.droidRedStage.children[child]);
			that.droidRedStage.destroy();
			delete that.droidRedStage.children;
			
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			
			return that.windowStage;
		},
		
		getWindowStage: function()
		{
			return that.windowStage;
		},
		
		destroy: function()
		{
			for(var child in that.windowStage.children)that.windowStage.removeChild(that.windowStage.children[child]);
			that.windowStage.destroy();
			delete that.windowStage.children;
			
			for(var property in that) that[property] = null;
		}
	};
	return that;
};

/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var Sound = function(parent)
{
	var that = {
                indexBattleMusic: 1,
                themeSongPlay: false,
                themeBattlePlay: false,
                
		soundPlayStarWarsThemeSong: function()
		{
                        if(that.themeBattlePlay === true) that.soundStopStarWarsBattle();
                        
                        if(parent.config.music === true && that.themeSongPlay === false)
                        {
                            createjs.Sound.play("StarWarsThemeSong", {loop:-1});
                            that.themeSongPlay = true;
                        }
		},
		
		soundStopStarWarsThemeSong: function()
		{
			createjs.Sound.stop("StarWarsThemeSong");
                        that.themeSongPlay = false;
		},
                
                soundPlayStarWarsBattle: function()
		{
                        if(that.themeSongPlay === true) that.soundStopStarWarsThemeSong();
                        
			if(parent.config.music === true && that.themeBattlePlay === false)
                        {
                            if(that.indexBattleMusic === 1)
                            {
                                createjs.Sound.play("StarWarsBattle2", {loop:-1});
                                that.indexBattleMusic = 2;
                                that.themeBattlePlay = true;
                            }else{
                                createjs.Sound.play("StarWarsBattle1", {loop:-1});
                                that.indexBattleMusic = 1;
                                that.themeBattlePlay = true;
                            }
                        }
		},
		
		soundStopStarWarsBattle: function()
		{
                        if(that.indexBattleMusic === 1)
                        {
                            createjs.Sound.stop("StarWarsBattle1");
                            that.themeBattlePlay = false;
                        }else{
                            createjs.Sound.stop("StarWarsBattle2");
                            that.themeBattlePlay = false;
                        }
			
		},
                
                soundPlayStarWarsThemeEnd: function()
		{
                        if(parent.config.music === true)
                        {
                            createjs.Sound.play("StarWarsEnd", {loop:-1});
                        }
		},
                
                soundStopStarWarsThemeEnd: function()
		{
			createjs.Sound.stop("StarWarsEnd");
                },
                
                
                soundPlayStarWarsButtonClick: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsButtonClick");
                },
                
                soundPlayStarWarsWindowOpen: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsWindowOpen");
                },
                
                soundPlayStarWarsWindowClose: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsWindowClose");
                },
                
                soundPlayStarWarsHit1: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsHit1");
                },
                
                 soundPlayStarWarsHit2: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsHit2");
                },
                
                 soundPlayStarWarsHit3: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsHit3");
                },
                
                 soundPlayStarWarsHit4: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsHit4");
                },
                
                 soundPlayStarWarsHit5: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsHit5");
                }
                
		
	};
	return that;
};


/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var StartBattle = function(parent)
{
	var that = {
		windowStage: null,
		lineAnimationGraphics: null,
		styleBlueText: { font : 'bold 18px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340, align: "center"},
		styleRedText: { font : 'bold 18px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340, align: "center"}, 
		buttonStyleBlueText: { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 },
		buttonStyleRedText: { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }, 
		userPlanetID: null,
		aiPlanetID: null,

		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		create: function(planetUserTargetID, planetAITargetID)
		{
			that.userPlanetID = planetUserTargetID;
			that.aiPlanetID = planetAITargetID
			that.windowStage = new PIXI.Container();
			that.backgroundCreate();
			that.windowCreate();
			that.titleCreate();
			that.textCreate();
			that.buttonsCreate();
		},
		
		backgroundCreate: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.hitArea = new PIXI.Rectangle(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
			graphics.interactive = true;
			graphics.lineStyle(1, 0x000000, 0.05);
			graphics.beginFill(0x000000, 0.05);
			graphics.drawRect(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
			graphics.endFill();
			that.windowStage.addChild(graphics);
		},
		
		windowCreate: function()
		{
			if(parent.config.side === that.SIDE_JEDI)
			{
				var graphics = new PIXI.Graphics(); 
				graphics.lineStyle(2, 0xFFFFFF, 1);
				graphics.drawRoundedRect(200, 150, 460, 260, 15);
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x00000F, 0.5);
				graphics.drawRoundedRect(210, 160, 440, 240, 5);
				graphics.endFill();
				that.windowStage.addChild(graphics);
				
				var textureSprite; 
				if(parent.initialization.commandUser["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][1]);
				else{
					if(parent.initialization.commandUser["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][1]);
					else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][1]);
				}
				textureSprite.position.x = 220; 
				textureSprite.position.y = 165; 
				textureSprite.scale.set(0.5);
				that.windowStage.addChild(textureSprite);
				
				if(that.userPlanetID !== that.aiPlanetID || parent.config.stopAI === true)
				{
					textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].redPersonage1][2]);
				} else {
					if(parent.initialization.commandAI["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][2]);
					else{
						if(parent.initialization.commandAI["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage2"]][2]);
						else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage3"]][2]);
					}
				} 
				textureSprite.position.x = 510; 
				textureSprite.position.y = 165; 
				textureSprite.scale.set(0.5);
				that.windowStage.addChild(textureSprite);
				
				graphics = new PIXI.Graphics();
				for(var i = 0; i < 80; i++)
				{
					graphics.lineStyle(1, 0x0000FF, 0.5);
					graphics.moveTo(210, 160+(3*i));
					graphics.lineTo(650, 160+(3*i));
				}
				that.windowStage.addChild(graphics);
				
				that.lineAnimationGraphics = new PIXI.Graphics(); 
				that.lineAnimationGraphics.lineStyle(10, 0x0000FF, 0.3);
				that.lineAnimationGraphics.moveTo(210, 165);
				that.lineAnimationGraphics.lineTo(650, 165);
				that.windowStage.addChild(that.lineAnimationGraphics);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				var graphics = new PIXI.Graphics(); 
				graphics.lineStyle(2, 0xFFFF80, 1);
				graphics.drawRoundedRect(200, 150, 460, 260, 15);
				graphics.lineStyle(2, 0xFF0000, 1);
				graphics.beginFill(0x800000, 0.5);
				graphics.drawRoundedRect(210, 160, 440, 240, 5);
				graphics.endFill();
				that.windowStage.addChild(graphics);
				
				var textureSprite; 
				if(parent.initialization.commandUser["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][1]);
				else{
					if(parent.initialization.commandUser["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][1]);
					else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][1]);
				}
				textureSprite.position.x = 220; 
				textureSprite.position.y = 165; 
				textureSprite.scale.set(0.5);
				that.windowStage.addChild(textureSprite);
				
				if(that.userPlanetID !== that.aiPlanetID || parent.config.stopAI === true)
				{
					textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].bluePersonage1][2]);
				} else {
					if(parent.initialization.commandAI["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][2]);
					else{
						if(parent.initialization.commandAI["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage2"]][2]);
						else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage3"]][2]);
					}
				} 
				textureSprite.position.x = 510; 
				textureSprite.position.y = 165; 
				textureSprite.scale.set(0.5);
				that.windowStage.addChild(textureSprite);
				
				graphics = new PIXI.Graphics();
				for(var i = 0; i < 80; i++)
				{
					graphics.lineStyle(1, 0xA63A24, 0.5);
					graphics.moveTo(210, 160+(3*i));
					graphics.lineTo(650, 160+(3*i));
				}
				that.windowStage.addChild(graphics);
			   
				that.lineAnimationGraphics = new PIXI.Graphics(); 
				that.lineAnimationGraphics.lineStyle(10, 0xA63A24, 0.3);
				that.lineAnimationGraphics.moveTo(210, 165);
				that.lineAnimationGraphics.lineTo(650, 165);
				that.windowStage.addChild(that.lineAnimationGraphics);
			}
		},
		
		titleCreate: function()
		{
			var text;
			if(parent.config.side === that.SIDE_JEDI) text = new PIXI.Text("БИТВА", that.buttonStyleBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text("БИТВА", that.buttonStyleRedText); 
			text.x = 390;
			text.y = 180;
			that.windowStage.addChild(text);
		},
		
		textCreate: function()
		{
			var hitCountUser = 0;
			if(parent.initialization.personages[parent.initialization.commandUser["personage1"]] != undefined)
			{
				hitCountUser += parent.initialization.personages[parent.initialization.commandUser["personage1"]].hitDefense1 
					+ parent.initialization.personages[parent.initialization.commandUser["personage1"]].hitDefense2 
					+ parent.initialization.personages[parent.initialization.commandUser["personage1"]].hitDefense3 
					+ parent.initialization.personages[parent.initialization.commandUser["personage1"]].hitDefense4
					+ parent.initialization.personages[parent.initialization.commandUser["personage1"]].hitDefense5;
			}
			if(parent.initialization.personages[parent.initialization.commandUser["personage2"]] != undefined)
			{
				hitCountUser += parent.initialization.personages[parent.initialization.commandUser["personage2"]].hitDefense1 
					+ parent.initialization.personages[parent.initialization.commandUser["personage2"]].hitDefense2 
					+ parent.initialization.personages[parent.initialization.commandUser["personage2"]].hitDefense3 
					+ parent.initialization.personages[parent.initialization.commandUser["personage2"]].hitDefense4
					+ parent.initialization.personages[parent.initialization.commandUser["personage2"]].hitDefense5;
			}
			if(parent.initialization.personages[parent.initialization.commandUser["personage3"]] != undefined)
			{
				hitCountUser += parent.initialization.personages[parent.initialization.commandUser["personage3"]].hitDefense1 
					+ parent.initialization.personages[parent.initialization.commandUser["personage3"]].hitDefense2 
					+ parent.initialization.personages[parent.initialization.commandUser["personage3"]].hitDefense3 
					+ parent.initialization.personages[parent.initialization.commandUser["personage3"]].hitDefense4
					+ parent.initialization.personages[parent.initialization.commandUser["personage3"]].hitDefense5;
			}
			hitCountUser /= 10;
			
			var hitCountAI = 0;
			if(parent.config.side === that.SIDE_JEDI)
			{
				if(that.userPlanetID !== that.aiPlanetID || parent.config.stopAI === true)
				{
					if(parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage1] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage1].hitAttack1 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage1].hitAttack2 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage1].hitAttack3 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage1].hitAttack4
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage1].hitAttack5;
					}
					if(parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage2] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage2].hitAttack1 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage2].hitAttack2 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage2].hitAttack3 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage2].hitAttack4
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage2].hitAttack5;
					}
					if(parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage3] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage3].hitAttack1 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage3].hitAttack2 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage3].hitAttack3 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage3].hitAttack4
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage3].hitAttack5;
					}
				}else{
					if(parent.initialization.personages[parent.initialization.commandAI["personage1"]] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense1 
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense2 
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense3 
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense3
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense4;
					}
					if(parent.initialization.personages[parent.initialization.commandAI["personage2"]] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense1 
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense2 
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense3 
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense4
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense5;
					}
					if(parent.initialization.personages[parent.initialization.commandAI["personage3"]] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense1 
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense2 
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense3 
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense4
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense5;
					}
				}
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				if(that.userPlanetID !== that.aiPlanetID || parent.config.stopAI === true)
				{
					if(parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage1] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage1].hitAttack1 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage1].hitAttack2 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage1].hitAttack3 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage1].hitAttack4
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage1].hitAttack5;
					}
					if(parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage2] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage2].hitAttack1 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage2].hitAttack2 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage2].hitAttack3 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage2].hitAttack4
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage2].hitAttack5;
					}
					if(parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage3] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage3].hitAttack1 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage3].hitAttack2 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage3].hitAttack3 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage3].hitAttack4
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage3].hitAttack5;
					}
				}else{
					if(parent.initialization.personages[parent.initialization.commandAI["personage1"]] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense1 
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense2 
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense3 
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense3
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense4;
					}
					if(parent.initialization.personages[parent.initialization.commandAI["personage2"]] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense1 
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense2 
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense3 
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense4
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense5;
					}
					if(parent.initialization.personages[parent.initialization.commandAI["personage3"]] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense1 
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense2 
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense3 
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense4
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense5;
					}
				}
			}
			hitCountAI /= 10;
			
			var text;
			if(parent.config.side === that.SIDE_JEDI)
			{
				text = new PIXI.Text("Сила: " + hitCountUser, that.styleBlueText); 
				text.x = (parent.config.MAIN_WIDTH / 2) - (text.width / 2) - 150;
				text.y = 350;
				that.windowStage.addChild(text);
				text = new PIXI.Text("Сила: " + hitCountAI, that.styleBlueText); 
				text.x = (parent.config.MAIN_WIDTH / 2) - (text.width / 2) + 150;
				text.y = 350;
				that.windowStage.addChild(text);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				text = new PIXI.Text("Сила: " + hitCountUser, that.styleRedText); 
				text.x = (parent.config.MAIN_WIDTH / 2) - (text.width / 2) - 150;
				text.y = 350;
				that.windowStage.addChild(text);
				text = new PIXI.Text("Сила: " + hitCountAI, that.styleRedText); 
				text.x = (parent.config.MAIN_WIDTH / 2) - (text.width / 2) + 150;
				text.y = 350;
				that.windowStage.addChild(text);
			}
			
			if(parent.config.side === that.SIDE_JEDI)
			{
				if(that.userPlanetID !== that.aiPlanetID || parent.config.stopAI === true)
				{
					if(parent.initialization.commandUser["personage1"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].redPersonage1][0], that.styleBlueText); 
					else{
						if(parent.initialization.commandUser["personage2"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].redPersonage1][0], that.styleBlueText); 
						else  text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].redPersonage1][0], that.styleBlueText); 
					}    
				}else{
					if(parent.initialization.commandUser["personage1"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][0], that.styleBlueText);
					else{
						if(parent.initialization.commandUser["personage2"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][0], that.styleBlueText);
						else text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][0], that.styleBlueText);
					}
				}
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				if(that.userPlanetID !== that.aiPlanetID || parent.config.stopAI === true)
				{
					if(parent.initialization.commandUser["personage1"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].bluePersonage1][0], that.styleRedText); 
					else{
						if(parent.initialization.commandUser["personage2"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].bluePersonage1][0], that.styleRedText); 
						else text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].bluePersonage1][0], that.styleRedText); 
					}
				}else{
					if(parent.initialization.commandUser["personage1"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][0], that.styleRedText); 
					else{
						if(parent.initialization.commandUser["personage2"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][0], that.styleRedText); 
						else text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][0], that.styleRedText); 
					}
				}
			}
			text.x = (parent.config.MAIN_WIDTH / 2) - (text.width / 2);
			text.y = 225;
			that.windowStage.addChild(text);
		},
		
		buttonsCreate: function()
		{
			if(parent.config.side === that.SIDE_JEDI)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = "yes";
				button.position.x = (parent.config.MAIN_WIDTH / 2) -  (button.width / 2.5); 
				button.position.y = 300; 
				button.scale.set(0.8);
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);
				var text = new PIXI.Text("Начать", that.buttonStyleBlueText); 
				text.x = (button.width / 2) - (text.width / 3.0);
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
				
				button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = "no";
				button.position.x = (parent.config.MAIN_WIDTH / 2) -  (button.width / 2.5);
				button.position.y = 350; 
				button.scale.set(0.8);
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);
				var text = new PIXI.Text("Отмена", that.buttonStyleBlueText); 
				text.x = (button.width / 2) - (text.width / 3.0);
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
				button.name = "yes";
				button.position.x = (parent.config.MAIN_WIDTH / 2) -  (button.width / 2.5); 
				button.position.y = 300; 
				button.scale.set(0.8);
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);
				var text = new PIXI.Text("Начать", that.buttonStyleRedText); 
				text.x = (button.width / 2) - (text.width / 3.0);
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
				
				button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
				button.name = "no";
				button.position.x = (parent.config.MAIN_WIDTH / 2) -  (button.width / 2.5); 
				button.position.y = 350; 
				button.scale.set(0.8);
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);
				var text = new PIXI.Text("Отмена", that.buttonStyleRedText); 
				text.x = (button.width / 2) - (text.width / 3.0);
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
			}
		},
		
		onButtonOver: function(event)
		{
			this.isOver = true;
			this.gotoAndPlay(1);
		},
		
		onButtonOut: function(event)
		{
			this.isOver = false;
			this.gotoAndStop(0);
		},
		
		onButtonUpdate: function(event)
		{
			if(this.isOver)
			{
				this.gotoAndPlay(1);
			}else{
				this.gotoAndStop(0);
			}
		},
		
		onButtonClick: function(event)
		{
                        parent.sound.soundPlayStarWarsButtonClick();
			switch (this.name)
			{
				case "yes":
					if(that.userPlanetID !== that.aiPlanetID || parent.config.stopAI === true) parent.levelShow(that.userPlanetID, false, that.aiPlanetID);
					else parent.levelShow(that.userPlanetID, true, that.aiPlanetID);
                                        parent.startbattleClose();
                                        parent.mapClose();
					break;
				case "no":
					parent.startbattleClose();
					break;
				default:
					break;
			}
		},
		
		tweenStart: function()
		{
			createjs.Tween.get(that.lineAnimationGraphics, {loop: true}) 
				.to({x: 0, y: 230}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Ticker.setFPS(60);
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.lineAnimationGraphics);
		},
		
		show: function()
		{
			that.tweenStart();
			return that.windowStage;
		},
		
		close: function()
		{
			that.tweenStop();
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			return that.windowStage;
		},
		
		getWindowStage: function()
		{
			return that.windowStage;
		},
		
		destroy: function()
		{
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			that.windowStage.destroy();
			delete that.windowStage.children;
			
			for(var property in that) that[property] = null;
		}
	};
	return that;
};


/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var Timer = function(parent)
{
	var that = {
		windowStage: null,
		
		timerText: null,
		timerCount: null,
		timerPause: null,
		timer: null,
		timerStyleBlueText: {font : 'bold 36px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 3, wordWrap : true, wordWrapWidth : 440},
		timerStyleRedText: {font : 'bold 36px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 3, wordWrap : true, wordWrapWidth : 440},
		
		TIMER_MAX_VALUE: 10,
		TIMER_MIN_VALUE: 0,
		
		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		create: function()
		{
			that.timerPause = false;
			that.timerCount = that.TIMER_MAX_VALUE;
			
			that.windowStage = new PIXI.Container();
			that.windowStage.position.x = (parent.config.MAIN_WIDTH / 2 - 25);
			that.windowStage.position.y = 35;
			
			var graphics = new PIXI.Graphics();
			if(parent.config.side === that.SIDE_JEDI)
			{
				graphics.lineStyle(2, 0xFFFFFF, 1);
				graphics.beginFill(0x0000FF, 0.75);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				graphics.lineStyle(2, 0xFFFF80, 1);
				graphics.beginFill(0x800000, 0.75);
			}
			graphics.drawRoundedRect(0, 0, 50, 50, 15);
			graphics.endFill();
			that.windowStage.addChild(graphics);
			
			if(parent.config.side === that.SIDE_JEDI) that.timerText = new PIXI.Text(that.timerCount, that.timerStyleBlueText);
			if(parent.config.side === that.SIDE_SITH) that.timerText = new PIXI.Text(that.timerCount, that.timerStyleRedText);
			that.timerText.x = 2.5;
			that.timerText.y = 2.5;
			that.windowStage.addChild(that.timerText);

			if(that.timerPause === false) that.timer = setInterval(that.onTimerComplete, 1000);
		},
		
		onTimerComplete: function()
		{
                    if(parent.level !== null)
                    {
                	if(that.timerCount === that.TIMER_MIN_VALUE){	// таймер = минимум
        
				if(parent.match.modeAI === true)
				{
						parent.match.matchFieldBlocked = false; 	// поле разблокированно
						parent.match.modeAI = false;				// ИИ отключен
						// console.log("[HIT]: USER наносит удар!");
				}else{
						parent.match.matchFieldBlocked = true;	// поле заблокированно
						parent.match.modeAI = true;				// ИИ включен
						parent.match.matchCellColorBack();
						parent.match.matchSelectUnit1 = null;
						parent.match.matchSelectUnit2 = null;
						// console.log("[HIT]: AI наносит удар!");
				}
                                parent.level.onCompleteTextLeftShow();
                                parent.level.onCompleteTextRightShow();
				
				that.timerCount = that.TIMER_MAX_VALUE;	// устанавливаем максимальное значение таймера
				that.timerText.text = that.timerCount;	// показываем секунды
			}else{
				that.timerCount--;						// уменьшение таймера
				that.timerText.text = " " + that.timerCount;	// показываем секунды
				if(parent.match.modeAI === true && that.timerCount === 8) { parent.match.matchActionAI();}
			}
                    }else{
                        that.timerStop();
                        parent.timerClose(); // УДАЛЯЕТСЯ ТАЙМЕР ЕСЛИ НЕТ УРОВНЯ
                    }
		},
		
		timerStart: function()
		{
                    if(parent.level !== null)
                    {
                    	if(parent.match.modeAI === true)
			{
                            	parent.match.matchFieldBlocked = false; 	// поле разблокированно
				parent.match.modeAI = false;					// ИИ отключен
				parent.level.levelExchangePersonage("AI");
				// console.log("[HIT START]: USER наносит удар!");
			}else{
                            	parent.match.matchFieldBlocked = true;		// поле заблокированно
				parent.match.modeAI = true;					// ИИ включен
				parent.level.levelExchangePersonage("USER");
				parent.match.matchCellColorBack();
				parent.match.matchSelectUnit1 = null;
				parent.match.matchSelectUnit2 = null;
				// console.log("[HIT START]: AI наносит удар!");
			}
                        parent.level.onCompleteTextLeftShow();
                        parent.level.onCompleteTextRightShow();
			
			that.timerCount = that.TIMER_MAX_VALUE;	// устанавливаем максимальное значение таймера
			that.timerText.text = that.timerCount;	// показываем секунды
			if(that.timerPause === false)
                        {
                            that.timer = setInterval(that.onTimerComplete, 1000);	// запуск таймера
                        }
                    }
		},
		
		timerStop: function()
		{
			clearInterval(that.timer);
		},
		
		timerPauseBegin: function()
		{
			that.timerPause = true;
                        if(parent.level.getWindowStage() !== null) clearInterval(that.timer);
		},
		
		timerPauseEnd: function()
		{
			that.timerPause = false;
			if(parent.level.getWindowStage() !== null) that.timer = setInterval(that.onTimerComplete, 1000);
		},
				
		show: function()
		{
			return that.windowStage;
		},
		
		close: function()
		{
			that.timerStop();
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			return that.windowStage;
		},
		
		getWindowStage: function()
		{
			return that.windowStage;
		},
		
		destroy: function()
		{
                        that.timerStop();
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			that.windowStage.destroy();
			delete that.windowStage.children;
			
			for(var property in that) that[property] = null;
		}
	};
	return that;
};

/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var Victory = function(parent)
{
    var that = {
        windowStage: null,
        lineAnimationGraphics: null,
        styleBlueText: { font : 'bold 18px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 300, align: "center"},
        styleRedText: { font : 'bold 18px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 300, align: "center"}, 
        styleBlueText2: { font : 'bold 12px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200, align: "center"},
        styleRedText2: { font : 'bold 12px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200, align: "center"}, 
        buttonStyleBlueText: { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 },
        buttonStyleRedText: { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }, 

        SIDE_NONE: "side_none",
	SIDE_JEDI: "side_jedi",
	SIDE_SITH: "side_sith",
        
        intercept: null,
        planetID: null,
        aiPlanetID: null,
        
        create: function(planetID, intercept, aiPlanetID)
        {
            that.intercept = intercept;
            that.planetID = planetID;
            that.aiPlanetID = aiPlanetID;
            
            that.windowStage = new PIXI.Container();
            that.backgroundCreate();
            that.windowCreate();
            that.titleCreate();
            that.textCreate();
            if(that.intercept === true) that.buttonCloseCreate();
        },
        
        backgroundCreate: function()
        {
            var graphics = new PIXI.Graphics(); 
            graphics.hitArea = new PIXI.Rectangle(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
            graphics.interactive = true;
            graphics.lineStyle(1, 0x000000, 0.05);
            graphics.beginFill(0x000000, 0.5);
            graphics.drawRect(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
            graphics.endFill();
            that.windowStage.addChild(graphics); 
        },
        
        windowCreate: function()
        {
            if(parent.config.side === that.SIDE_JEDI)
            {
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(2, 0xFFFFFF, 1);
                graphics.drawRoundedRect(200, 150, 460, 420, 15);
                graphics.lineStyle(2, 0x0000FF, 1);
                graphics.beginFill(0x00000F, 0.5);
                graphics.drawRoundedRect(210, 160, 440, 400, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);

                var textureSprite; 
                if(parent.initialization.commandUser["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][1]);
                else{
                        if(parent.initialization.commandUser["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][1]);
                        else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][1]);
                }
                textureSprite.position.x = 220; 
                textureSprite.position.y = 265; 
                textureSprite.scale.set(0.5);
                that.windowStage.addChild(textureSprite);

                graphics = new PIXI.Graphics();
                for(var i = 0; i < 133; i++)
                {
                        graphics.lineStyle(1, 0x0000FF, 0.5);
                        graphics.moveTo(210, 160+(3*i));
                        graphics.lineTo(650, 160+(3*i));
                }
                that.windowStage.addChild(graphics);

                that.lineAnimationGraphics = new PIXI.Graphics(); 
                that.lineAnimationGraphics.lineStyle(10, 0x0000FF, 0.3);
                that.lineAnimationGraphics.moveTo(210, 165);
                that.lineAnimationGraphics.lineTo(650, 165);
                that.windowStage.addChild(that.lineAnimationGraphics);
            }
            if(parent.config.side === that.SIDE_SITH)
            {
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(2, 0xFFFF80, 1);
                graphics.drawRoundedRect(200, 150, 460, 420, 15);
                graphics.lineStyle(2, 0xFF0000, 1);
                graphics.beginFill(0x800000, 0.5);
                graphics.drawRoundedRect(210, 160, 440, 400, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);

                var textureSprite; 
                if(parent.initialization.commandUser["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][1]);
                else{
                        if(parent.initialization.commandUser["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][1]);
                        else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][1]);
                }
                textureSprite.position.x = 220; 
                textureSprite.position.y = 265; 
                textureSprite.scale.set(0.5);
                that.windowStage.addChild(textureSprite);

                graphics = new PIXI.Graphics();
                for(var i = 0; i < 133; i++)
                {
                        graphics.lineStyle(1, 0xA63A24, 0.5);
                        graphics.moveTo(210, 160+(3*i));
                        graphics.lineTo(650, 160+(3*i));
                }
                that.windowStage.addChild(graphics);

                that.lineAnimationGraphics = new PIXI.Graphics(); 
                that.lineAnimationGraphics.lineStyle(10, 0xA63A24, 0.3);
                that.lineAnimationGraphics.moveTo(210, 165);
                that.lineAnimationGraphics.lineTo(650, 165);
                that.windowStage.addChild(that.lineAnimationGraphics);
            }
        },
        
        titleCreate: function()
        {
            var text;
            if(parent.config.side === that.SIDE_JEDI) text = new PIXI.Text("ВЫ ПОБЕДИЛИ!", that.buttonStyleBlueText); 
            if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text("ВЫ ПОБЕДИЛИ!", that.buttonStyleRedText); 
            text.x = 335;
            text.y = 180;
            that.windowStage.addChild(text);
        },
        
        textCreate: function()
        {
            var text;
            if(parent.config.side === that.SIDE_JEDI)
            {
                text = new PIXI.Text("Очки за уровень: " + parent.initialization.userlTotalPointsPlayerLevel, that.styleBlueText); 
                text.x = 355;
                text.y = 225;
                that.windowStage.addChild(text);
                
                text = new PIXI.Text("Получено очков опыта: +3", that.styleBlueText); 
                text.x = 355;
                text.y = 250;
                that.windowStage.addChild(text);
                
                if(that.intercept === false)
                {
                    text = new PIXI.Text("Доступны новые союзники:", that.styleBlueText); 
                    text.x = 355;
                    text.y = 275;
                    that.windowStage.addChild(text);
                    that.contentCreate();
                }else{
                    
                    if(parent.config.side === that.SIDE_SITH && parent.initialization.planets[that.planetID].id === "Coruscant")
                    {
                        text = new PIXI.Text("Вы одержали победу на планете " + parent.initialization.planets[that.planetID].name, that.styleBlueText); 
                    }else{
                        if(parent.config.side === that.SIDE_JEDI && parent.initialization.planets[that.planetID].id === "DeathStar")
                        {
                            text = new PIXI.Text("Вы одержали победу на планете " + parent.initialization.planets[that.planetID].name, that.styleBlueText); 
                        }else{
                            text = new PIXI.Text("Вы успешно отразили нападение Дарт Вейдера на планету " + parent.initialization.planets[that.planetID].name, that.styleBlueText); 
                        }
                    }
                    
                    text.x = 325;
                    text.y = 350;
                    that.windowStage.addChild(text);
                }
            }
            if(parent.config.side === that.SIDE_SITH)
            {
                text = new PIXI.Text("Очки за уровень: " + parent.initialization.userlTotalPointsPlayerLevel, that.styleRedText); 
                text.x = 355;
                text.y = 225;
                that.windowStage.addChild(text);
                
                text = new PIXI.Text("Получено очков опыта: +3", that.styleRedText); 
                text.x = 355;
                text.y = 250;
                that.windowStage.addChild(text);
                
                if(that.intercept === false)
                {
                    text = new PIXI.Text("Доступны новые союзники:", that.styleRedText); 
                    text.x = 355;
                    text.y = 275;
                    that.windowStage.addChild(text);
                    that.contentCreate();
                }else{
                    
                    if(parent.config.side === that.SIDE_SITH && parent.initialization.planets[that.planetID].id === "Coruscant")
                    {
                        text = new PIXI.Text("Вы одержали победу на планете " + parent.initialization.planets[that.planetID].name, that.styleRedText); 
                    }else{
                        if(parent.config.side === that.SIDE_JEDI && parent.initialization.planets[that.planetID].id === "DeathStar")
                        {
                            text = new PIXI.Text("Вы одержали победу на планете " + parent.initialization.planets[that.planetID].name, that.styleRedText); 
                        }else{
                            text = new PIXI.Text("Вы успешно помешали Люку Скайуокеру на планету " + parent.initialization.planets[that.planetID].name, that.styleRedText); 
                        }
                    }
                    
                    text.x = 325;
                    text.y = 350;
                    that.windowStage.addChild(text);
                }
            }
        },
        
        powerPersonage: function(personageID)
        {
            var hitCount = 0;
            hitCount += parent.initialization.personages[personageID].hitDefense1 
                + parent.initialization.personages[personageID].hitDefense2 
                + parent.initialization.personages[personageID].hitDefense3 
                + parent.initialization.personages[personageID].hitDefense4
                + parent.initialization.personages[personageID].hitDefense5;
            hitCount /= 10;
            return hitCount;
        },
        
        contentCreate: function()
        {
            if(parent.config.side === that.SIDE_JEDI)
            {
                var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].blueRewardPersonage1][3]);
                textureSprite.position.x = 357;
                textureSprite.position.y = 300;
                that.windowStage.addChild(textureSprite);
                
                var graphics = new PIXI.Graphics();
                graphics.lineStyle(1, 0x0000FF, 1);
                graphics.beginFill(0x00000F, 0.15);
                graphics.drawRoundedRect(355, 300, 280, 75, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].blueRewardPersonage1][0] + "  [Сила: " + that.powerPersonage(parent.initialization.planets[that.planetID].blueRewardPersonage1) + "]", that.styleBlueText2); 
                text.x = 440;
                text.y = 300;
                that.windowStage.addChild(text);

                if(parent.initialization.personages[parent.initialization.planets[that.planetID].blueRewardPersonage1].status !== parent.initialization.USER_PERSONAGE_AVAILABLE)
                {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
                    button.name = parent.initialization.planets[that.planetID].blueRewardPersonage1;
                    button.position.x = 435; 
                    button.position.y = 325; 
                    button.interactive = true; 
                    button.buttonMode = true; 
                    button.loop = false; 
                    button.animationSpeed = 0.2;
                    button.onComplete = that.onButtonUpdate;
                    button.tap = that.onButtonClick; 
                    button.click = that.onButtonClick; 
                    button.on('mouseover', that.onButtonOver);
                    button.on('mouseout', that.onButtonOut);
                    var text = new PIXI.Text("Выбрать", that.styleBlueText); 
                    text.x = (button.width / 2) - (text.width / 2);
                    text.y = button.height / 3.2;
                    button.addChild(text); 
                    that.windowStage.addChild(button);
                }
                
                var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].blueRewardPersonage2][3]);
                textureSprite.position.x = 357;
                textureSprite.position.y = 385;
                that.windowStage.addChild(textureSprite);
                
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(1, 0x0000FF, 1);
                graphics.beginFill(0x00000F, 0.15);
                graphics.drawRoundedRect(355, 385, 280, 75, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].blueRewardPersonage2][0] + "  [Сила: " + that.powerPersonage(parent.initialization.planets[that.planetID].blueRewardPersonage2) + "]", that.styleBlueText2); 
                text.x = 440;
                text.y = 385;
                that.windowStage.addChild(text);
                
                if(parent.initialization.personages[parent.initialization.planets[that.planetID].blueRewardPersonage2].status !== parent.initialization.USER_PERSONAGE_AVAILABLE)
                {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
                    button.name = parent.initialization.planets[that.planetID].blueRewardPersonage2;
                    button.position.x = 435; 
                    button.position.y = 410; 
                    button.interactive = true; 
                    button.buttonMode = true; 
                    button.loop = false; 
                    button.animationSpeed = 0.2;
                    button.onComplete = that.onButtonUpdate;
                    button.tap = that.onButtonClick; 
                    button.click = that.onButtonClick; 
                    button.on('mouseover', that.onButtonOver);
                    button.on('mouseout', that.onButtonOut);
                    var text = new PIXI.Text("Выбрать", that.styleBlueText); 
                    text.x = (button.width / 2) - (text.width / 2);
                    text.y = button.height / 3.2;
                    button.addChild(text); 
                    that.windowStage.addChild(button);
                }
                
                var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].blueRewardPersonage3][3]);
                textureSprite.position.x = 357;
                textureSprite.position.y = 470;
                that.windowStage.addChild(textureSprite);
                
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(1, 0x0000FF, 1);
                graphics.beginFill(0x00000F, 0.15);
                graphics.drawRoundedRect(355, 470, 280, 75, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].blueRewardPersonage3][0] + "  [Сила: " + that.powerPersonage(parent.initialization.planets[that.planetID].blueRewardPersonage3) + "]", that.styleBlueText2); 
                text.x = 440;
                text.y = 470;
                that.windowStage.addChild(text);
                
                if(parent.initialization.personages[parent.initialization.planets[that.planetID].blueRewardPersonage3].status !== parent.initialization.USER_PERSONAGE_AVAILABLE)
                {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
                    button.name = parent.initialization.planets[that.planetID].blueRewardPersonage3;
                    button.position.x = 435; 
                    button.position.y = 495; 
                    button.interactive = true; 
                    button.buttonMode = true; 
                    button.loop = false; 
                    button.animationSpeed = 0.2;
                    button.onComplete = that.onButtonUpdate;
                    button.tap = that.onButtonClick; 
                    button.click = that.onButtonClick; 
                    button.on('mouseover', that.onButtonOver);
                    button.on('mouseout', that.onButtonOut);
                    var text = new PIXI.Text("Выбрать", that.styleBlueText); 
                    text.x = (button.width / 2) - (text.width / 2);
                    text.y = button.height / 3.2;
                    button.addChild(text); 
                    that.windowStage.addChild(button);
                }
            }
            if(parent.config.side === that.SIDE_SITH)
            {
                var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].redRewardPersonage1][3]);
                textureSprite.position.x = 357;
                textureSprite.position.y = 300;
                that.windowStage.addChild(textureSprite);
                
                var graphics = new PIXI.Graphics();
                graphics.lineStyle(1, 0xFFFF80, 1);
                graphics.beginFill(0xFF0000, 0.15);
                graphics.drawRoundedRect(355, 300, 280, 75, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].redRewardPersonage1][0] + "  [Сила: " + that.powerPersonage(parent.initialization.planets[that.planetID].redRewardPersonage1) + "]", that.styleRedText2); 
                text.x = 440;
                text.y = 300;
                that.windowStage.addChild(text);
                
                if(parent.initialization.personages[parent.initialization.planets[that.planetID].redRewardPersonage1].status !== parent.initialization.USER_PERSONAGE_AVAILABLE)
                {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
                    button.name = parent.initialization.planets[that.planetID].redRewardPersonage1;
                    button.position.x = 435; 
                    button.position.y = 325; 
                    button.interactive = true; 
                    button.buttonMode = true; 
                    button.loop = false; 
                    button.animationSpeed = 0.2;
                    button.onComplete = that.onButtonUpdate;
                    button.tap = that.onButtonClick; 
                    button.click = that.onButtonClick; 
                    button.on('mouseover', that.onButtonOver);
                    button.on('mouseout', that.onButtonOut);
                    var text = new PIXI.Text("Выбрать", that.styleRedText); 
                    text.x = (button.width / 2) - (text.width / 2);
                    text.y = button.height / 3.2;
                    button.addChild(text); 
                    that.windowStage.addChild(button);
                }
                
                var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].redRewardPersonage2][3]);
                textureSprite.position.x = 357;
                textureSprite.position.y = 385;
                that.windowStage.addChild(textureSprite);
                
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(1, 0xFFFF80, 1);
                graphics.beginFill(0xFF0000, 0.15);
                graphics.drawRoundedRect(355, 385, 280, 75, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].redRewardPersonage2][0] + "  [Сила: " + that.powerPersonage(parent.initialization.planets[that.planetID].redRewardPersonage2) + "]", that.styleRedText2); 
                text.x = 440;
                text.y = 385;
                that.windowStage.addChild(text);
                
                if(parent.initialization.personages[parent.initialization.planets[that.planetID].redRewardPersonage2].status !== parent.initialization.USER_PERSONAGE_AVAILABLE)
                {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
                    button.name = parent.initialization.planets[that.planetID].redRewardPersonage2;
                    button.position.x = 435; 
                    button.position.y = 410; 
                    button.interactive = true; 
                    button.buttonMode = true; 
                    button.loop = false; 
                    button.animationSpeed = 0.2;
                    button.onComplete = that.onButtonUpdate;
                    button.tap = that.onButtonClick; 
                    button.click = that.onButtonClick; 
                    button.on('mouseover', that.onButtonOver);
                    button.on('mouseout', that.onButtonOut);
                    var text = new PIXI.Text("Выбрать", that.styleRedText); 
                    text.x = (button.width / 2) - (text.width / 2);
                    text.y = button.height / 3.2;
                    button.addChild(text); 
                    that.windowStage.addChild(button);
                }
                
                var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].redRewardPersonage3][3]);
                textureSprite.position.x = 357;
                textureSprite.position.y = 470;
                that.windowStage.addChild(textureSprite);
                
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(1, 0xFFFF80, 1);
                graphics.beginFill(0xFF0000, 0.15);
                graphics.drawRoundedRect(355, 470, 280, 75, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].redRewardPersonage3][0] + "  [Сила: " + that.powerPersonage(parent.initialization.planets[that.planetID].redRewardPersonage3) + "]", that.styleRedText2); 
                text.x = 440;
                text.y = 470;
                that.windowStage.addChild(text);
                
                if(parent.initialization.personages[parent.initialization.planets[that.planetID].redRewardPersonage3].status !== parent.initialization.USER_PERSONAGE_AVAILABLE)
                {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
                    button.name = parent.initialization.planets[that.planetID].redRewardPersonage3;
                    button.position.x = 435; 
                    button.position.y = 495; 
                    button.interactive = true; 
                    button.buttonMode = true; 
                    button.loop = false; 
                    button.animationSpeed = 0.2;
                    button.onComplete = that.onButtonUpdate;
                    button.tap = that.onButtonClick; 
                    button.click = that.onButtonClick; 
                    button.on('mouseover', that.onButtonOver);
                    button.on('mouseout', that.onButtonOut);
                    var text = new PIXI.Text("Выбрать", that.styleRedText); 
                    text.x = (button.width / 2) - (text.width / 2);
                    text.y = button.height / 3.2;
                    button.addChild(text); 
                    that.windowStage.addChild(button);
                }
            }
        },
        
        onButtonOver: function(event)
        {
            this.isOver = true;
            this.gotoAndPlay(1);
        },

        onButtonOut: function(event)
        {
            this.isOver = false;
            this.gotoAndStop(0);
        },

        onButtonUpdate: function(event)
        {
            if(this.isOver)
            {
                this.gotoAndPlay(1);
            }else{
                this.gotoAndStop(0);
            }
        },

        onButtonClick: function(event)
        {
            parent.sound.soundPlayStarWarsButtonClick();
            
            if(parent.config.side === that.SIDE_JEDI)
            {
                // присваиваем планете статус завоёванной
                parent.initialization.planets[that.planetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI;
                // присваиваем статус выбранный для выбранного союзника
                parent.initialization.personages[this.name].status = parent.initialization.USER_PERSONAGE_AVAILABLE;
                // ИИ победил в своей битве
                if(parent.initialization.aiResultBattle() === true && parent.config.stopAI === false)
                {
                    // ИИ присваиваем планете статус завоёванной
                    parent.initialization.planets[that.aiPlanetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH;
                    // Увеличиваем очки опыта ИИ
                    parent.initialization.userExperiencePointsAI += 3;
                    // обновление команды ИИ распределение очков опыта
                    parent.initialization.aiUpgradeCommand(that.SIDE_SITH, that.aiPlanetID);
                    
                    if(parent.config.side === that.SIDE_JEDI && parent.initialization.planets[that.aiPlanetID].id === "Coruscant") parent.endGameShow("lost");
                    else{
                        if(parent.config.side === that.SIDE_SITH && parent.initialization.planets[that.aiPlanetID].id === "DeathStar") parent.endGameShow("lost");
                        else{

                            // Увеличиваем очки опыта Пользователя
                            parent.initialization.userExperiencePoints += 3;
                            // ИИ получает разрешение на выполнение действий!
                            parent.config.stopAI = false;
                            parent.vkWallPost(that.planetID, that.intercept, parent.initialization.personages[this.name].name);
                            parent.victoryClose(); // закрываем окно
                        }
                    }
                }
                else
                {
                    // ИИ проиграл!
                    parent.initialization.aiRemovePersonageCommand(that.SIDE_SITH);
                    // Увеличиваем очки опыта Пользователя
                    parent.initialization.userExperiencePoints += 3;
                    // ИИ получает разрешение на выполнение действий!
                    parent.config.stopAI = false;
                    parent.vkWallPost(that.planetID, that.intercept, parent.initialization.personages[this.name].name);
                    parent.victoryClose(); // закрываем окно
                }
            }
            if(parent.config.side === that.SIDE_SITH)
            {
                // присваиваем планете статус завоёванной
                parent.initialization.planets[that.planetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH;
                // присваиваем статус выбранный для выбранного союзника
                parent.initialization.personages[this.name].status = parent.initialization.USER_PERSONAGE_AVAILABLE;
                // ИИ победил в своей битве
                if(parent.initialization.aiResultBattle() === true && parent.config.stopAI === false)
                {
                    // ИИ присваиваем планете статус завоёванной
                    parent.initialization.planets[that.aiPlanetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI;
                    // Увеличиваем очки опыта ИИ
                    parent.initialization.userExperiencePointsAI += 3;
                    // обновление команды ИИ распределение очков опыта
                    parent.initialization.aiUpgradeCommand(that.SIDE_JEDI, that.aiPlanetID);
                    
                    if(parent.config.side === that.SIDE_JEDI && parent.initialization.planets[that.aiPlanetID].id === "Coruscant") parent.endGameShow("lost");
                    else{
                        if(parent.config.side === that.SIDE_SITH && parent.initialization.planets[that.aiPlanetID].id === "DeathStar") parent.endGameShow("lost");
                        else{

                            // Увеличиваем очки опыта Пользователя
                            parent.initialization.userExperiencePoints += 3;
                            // ИИ получает разрешение на выполнение действий!
                            parent.config.stopAI = false;
                            parent.vkWallPost(that.planetID, that.intercept, parent.initialization.personages[this.name].name);
                            parent.victoryClose(); // закрываем окно
                        }
                    }
                }
                else
                {
                    // ИИ проиграл!
                    parent.initialization.aiRemovePersonageCommand(that.SIDE_JEDI);
                    // Увеличиваем очки опыта Пользователя
                    parent.initialization.userExperiencePoints += 3;
                    // ИИ получает разрешение на выполнение действий!
                    parent.config.stopAI = false;
                    parent.vkWallPost(that.planetID, that.intercept, parent.initialization.personages[this.name].name);
                    parent.victoryClose(); // закрываем окно
                }
            }
            
            
            
            
        },
        
        buttonCloseCreate: function()
        {
            if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI)
            {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
                    button.name = "button_close";
                    button.position.x = 450; 
                    button.position.y = 510; 
                    button.interactive = true; 
                    button.buttonMode = true; 
                    button.loop = false; 
                    button.animationSpeed = 0.2;
                    button.onComplete = that.onButtonCloseUpdate;
                    button.tap = that.onButtonCloseClick; 
                    button.click = that.onButtonCloseClick; 
                    button.on('mouseover', that.onButtonCloseOver);
                    button.on('mouseout', that.onButtonCloseOut);
                    var text = new PIXI.Text("Закрыть", that.styleBlueText); 
                    text.x = (button.width / 2) - (text.width / 2);
                    text.y = button.height / 3.2;
                    button.addChild(text); 
                    that.windowStage.addChild(button);
            }
            if(parent.config.side === that.SIDE_SITH)
            {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
                    button.name = "button_close";
                    button.position.x = 450; 
                    button.position.y = 510; 
                    button.interactive = true; 
                    button.buttonMode = true; 
                    button.loop = false; 
                    button.animationSpeed = 0.2;
                    button.onComplete = that.onButtonCloseUpdate;
                    button.tap = that.onButtonCloseClick; 
                    button.click = that.onButtonCloseClick; 
                    button.on('mouseover', that.onButtonCloseOver);
                    button.on('mouseout', that.onButtonCloseOut);
                    var text = new PIXI.Text("Закрыть", that.styleRedText); 
                    text.x = (button.width / 2) - (text.width / 2);
                    text.y = button.height / 3.2;
                    button.addChild(text); 
                    that.windowStage.addChild(button);
            }
        },

        onButtonCloseOver: function(event)
        {
                this.isOver = true;
                this.gotoAndPlay(1);
        },

        onButtonCloseOut: function(event)
        {
                this.isOver = false;
                this.gotoAndStop(0);
        },

        onButtonCloseUpdate: function(event)
        {
                if(this.isOver)
                {
                    this.gotoAndPlay(1);
                }else{
                    this.gotoAndStop(0);
                }
        },

        onButtonCloseClick: function(event)
        {
            parent.sound.soundPlayStarWarsButtonClick();
            
            if(parent.config.side === that.SIDE_SITH && parent.initialization.planets[that.planetID].id === "Coruscant") parent.endGameShow("win");
            else{
                if(parent.config.side === that.SIDE_JEDI && parent.initialization.planets[that.planetID].id === "DeathStar") parent.endGameShow("win");
                else{
                    // ИИ пропускает ход!
                    parent.config.stopAI = true;    
                    // Увеличиваем очки опыта Пользователя
                    parent.initialization.userExperiencePoints += 3;
                    parent.vkWallPost(that.planetID, that.intercept, null);
                    parent.victoryClose(); // закрываем окно
                }
            }
            
            
        },
        
        tweenStart: function()
        {
            createjs.Tween.get(that.lineAnimationGraphics, {loop: true}) 
                    .to({x: 0, y: 390}, 2500, createjs.Ease.getPowInOut(3));
            createjs.Ticker.setFPS(60);

        },

        tweenStop: function()
        {
            createjs.Tween.removeTweens(that.lineAnimationGraphics);
        },

        show: function()
        {
                if(parent.level !== null) parent.timer.timerPauseBegin();
                that.tweenStart();
                return that.windowStage;
        },

        close: function()
        {
                that.tweenStop();
                for(var child in that.windowStage.children) that.windowStage.removeChild(that.windowStage.children[child]);
                return that.windowStage;
        },

        getWindowStage: function()
        {
                return that.windowStage;
        },

        destroy: function()
        {
                for(var child in that.windowStage.children) that.windowStage.removeChild(that.windowStage.children[child]);
                that.windowStage.destroy();
                delete that.windowStage.children;

                for(var property in that) that[property] = null;
        }
    };
    return that;
};

/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var Game = function(mainStage)
{
	var that = {
		config: {music:true, sound:true, language:"rus", side: "side_none", MAIN_WIDTH:860, MAIN_HEIGH:730, stopAI: false},
		sound: null,
		timer: null,
		match: null,
		initialization: null,
		assets: null,
		menu: null,
		backmenu: null,
		settings: null,
		message: null,
		side: null,
		command: null,
		startbattle: null,
		level: null,
		victory: null,
		lost: null,
                endGame: null,

		vkInvite: function()
		{
                    VK.callMethod("showInviteBox");
		},
                
                vkWallPost: function(planetID, intercept, personage)
                {
                    if(intercept === false)
                    {
                        VK.api("wall.post", {message:'Star Wars Heroes. \nЯ победил в битве на планете ' + that.initialization.planets[planetID].name + '\n Набрал ' + that.initialization.userlTotalPointsPlayerLevel + ' очков в миссии. \nПолучил +3 очка опыта и нового союзника ' + personage + '.\nПрисоединяйтесь к игре https://vk.com/app5170657', attachments : 'photo-62618339_398688727'}); 
                    }else{
                        VK.api("wall.post", {message:'Star Wars Heroes. \nЯ победил соперника на планете ' + that.initialization.planets[planetID].name + '\n Набрал ' + that.initialization.userlTotalPointsPlayerLevel + ' очков в миссии и получил +3 очка опыта.\nПрисоединяйтесь к игре https://vk.com/app5170657', attachments : 'photo-62618339_398688727'}); 
                    }
                },
                
                vkWallPostEndGame: function(text)
                {
                    VK.api("wall.post", {message: text + '.\nПрисоединяйтесь к игре https://vk.com/app5170657', attachments : 'photo-62618339_398688727'}); 
                },
		
		loadAssets: function()
		{
			that.assets = Preloader(that);
			that.assets.load();
			mainStage.addChild(that.assets.show());
		},
		
		loadAssetsComplete: function()
		{
                        that.sound = Sound(that);
                        
                        mainStage.removeChild(that.assets.close());
			that.menuShow();
		},
		
		menuShow: function()
		{
                        that.sound.soundPlayStarWarsThemeSong();
                        
                        that.menu = Menu(that);
			that.menu.create();
			mainStage.addChild(that.menu.show());
		},
		
		menuStartGame: function()
		{
                        mainStage.removeChild(that.menu.close());
			that.menu.destroy();
			that.endGame = that.timer = that.match = that.initialization = that.menu = that.backmenu = that.settings = that.message = that.side = that.command = that.startbattle = that.level = that.victory = that.lost = null;
                        
			that.sideShow();
		},
		
		settingsShow: function(location)
		{
                        that.sound.soundPlayStarWarsWindowOpen();
                    
			that.settings = Settings(that, location);
			that.settings.create();
			mainStage.addChild(that.settings.show());
		},
		
		settingsClose: function()
		{
                        that.sound.soundPlayStarWarsWindowClose();
                        
			mainStage.removeChild(that.settings.close());
			that.settings.destroy();
			that.settings = null;
		},
		
		sideShow: function()
		{
			that.side = Side(that);
			that.side.create();
			mainStage.addChild(that.side.show());
		},
		
		sideClose: function()
		{
			that.initializationGame();
			mainStage.removeChild(that.side.close());
			that.side.destroy();
                        that.side = that.menu = that.settings = null;
			that.mapShow();
		},
		
		initializationGame: function()
		{
			that.initialization = null;
			that.initialization = Initialization(that.assets.getAsset("planetTextures"), that.assets.getAsset("heroesTextures"), that.assets.getAsset("personagesJson"), that.assets.getAsset("planetsJson"), that.assets.getAsset("fieldLevelsJson"), that.config.side);
			that.initialization.initGame();
		},
		
		mapShow: function()
		{
                        that.sound.soundPlayStarWarsThemeSong();
                        
                        that.map = Map(that);
			that.map.create();
			mainStage.addChild(that.map.show());
		},
		
		mapClose: function()
		{
			mainStage.removeChild(that.map.close());
			that.map.destroy();
			that.map = that.settings = that.backmenu = that.message = that.startbattle = that.command = that.side = that.menu = null;
		},
		
		backmenuShow: function()
		{
                        that.sound.soundPlayStarWarsWindowOpen();
                        
			that.backmenu = Backmenu(that);
			that.backmenu.create();
			mainStage.addChild(that.backmenu.show());
		},
		
		backmenuClose: function(back)
		{
                        that.sound.soundPlayStarWarsWindowClose();
                        
			mainStage.removeChild(that.backmenu.close());
			that.backmenu.destroy();
			that.backmenu = null;
			if(back === true)
			{
				that.config.side = "side_none";
				if(that.map !== null) that.mapClose();
                                if(that.level !== null) that.levelClose();
                                that.menuShow();
			}
		},
		
		commandShow: function()
		{
			that.mapClose();
			that.command = Command(that);
			that.command.create();
			mainStage.addChild(that.command.show());
		},
		
		commandClose: function()
		{
			mainStage.removeChild(that.command.close());
			that.command.destroy();
			that.command = null;
			that.mapShow();
		},
		
		messageShow: function(titleText, messageText)
		{
                        that.sound.soundPlayStarWarsWindowOpen();
                        
			that.message = Message(that);
			that.message.create(titleText, messageText);
			mainStage.addChild(that.message.show());
		},
		
		messageClose: function()
		{
                        that.sound.soundPlayStarWarsWindowClose();
                        
			mainStage.removeChild(that.message.close());
			that.message.destroy();
			that.message = null;
		},
		
		startbattleShow: function(planetUserTargetID, planetAITargetID)
		{
                        that.sound.soundPlayStarWarsWindowOpen();
                        
			that.startbattle = StartBattle(that);
			that.startbattle.create(planetUserTargetID, planetAITargetID);
			mainStage.addChild(that.startbattle.show());
		},
		
		startbattleClose: function()
		{
                        that.sound.soundPlayStarWarsWindowClose();
                        
			mainStage.removeChild(that.startbattle.close());
			that.startbattle.destroy();
			that.startbattle = null;
		},
		
		timerShow: function()
		{
			that.timer = Timer(that);
			that.timer.create();
			mainStage.addChild(that.timer.show());
		},
		
		timerClose: function()
		{
			mainStage.removeChild(that.timer.close());
			that.timer.destroy();
			that.timer = that.match = that.level = null;
		},
		
		matchShow: function(levelJSON)
		{
			that.match = Match3(that);
			that.match.createMatchField(levelJSON);
			mainStage.addChild(that.match.show());
		},
		
		matchClose: function()
		{
			mainStage.removeChild(that.match.close());
			that.match.destroy();
			that.match = null;
		},
		
		levelShow: function(planetID, intercept, aiPlanetID)
		{
                        that.sound.soundPlayStarWarsBattle();
                        
			that.level = Level(that);
			that.level.levelCreate(planetID, intercept, aiPlanetID);
			mainStage.addChild(that.level.show());
			that.level.levelFieldCreate();
			that.timerShow();
		},
		
		levelClose: function()
		{
			mainStage.removeChild(that.level.close());
			that.level.destroy();
                        that.level = that.backmenu = that.settings = that.victory = that.lost =  null;
		},
                
                victoryShow: function(planetID, intercept, aiPlanetID)
                {
                        that.sound.soundPlayStarWarsWindowOpen();
                        
                        that.victory = Victory(that);
			that.victory.create(planetID, intercept, aiPlanetID);
			mainStage.addChild(that.victory.show());
                },
                
                victoryClose: function()
                {
                        that.sound.soundPlayStarWarsWindowClose();
                        
                        mainStage.removeChild(that.victory.close());
			that.victory.destroy();
			that.victory = null;
                        that.levelClose();
                        that.mapShow();
                },
                
                lostShow: function(planetID, intercept, aiPlanetID)
                {
                    that.sound.soundPlayStarWarsWindowOpen();
                    
                    that.lost = Lost(that);
                    that.lost.create(planetID, intercept, aiPlanetID);
                    mainStage.addChild(that.lost.show());
                },
                
                lostClose: function()
                {
                    that.sound.soundPlayStarWarsWindowClose();
                    
                    mainStage.removeChild(that.lost.close());
                    that.lost.destroy();
                    that.lost = null;
                    that.levelClose();
                    that.mapShow();
                },
                
                endGameShow: function(status)
                {
                    if(status === "win") that.sound.soundPlayStarWarsThemeSong();
                    if(status === "lost")
                    {
                        that.sound.soundStopStarWarsThemeSong();
                        that.sound.soundStopStarWarsBattle();
                        that.sound.soundPlayStarWarsThemeEnd();
                    }
                    
                    if(that.lost !== null)
                    {
                        mainStage.removeChild(that.lost.close());
                        that.lost.destroy();
                        that.lost = null;
                    }
                    
                    if(that.victory !== null)
                    {
                        mainStage.removeChild(that.victory.close());
                        that.victory.destroy();
                        that.victory = null;
                    }
                
                    if(that.level !== null)
                    {
                        mainStage.removeChild(that.level.close());
			that.level.destroy();
                        that.level = null;
                    }
                    if(that.map !== null)
                    {
                        mainStage.removeChild(that.map.close());
			that.map.destroy();
                        that.map = null;
                    }
                    
                    that.endGame = EndGame(that);
                    that.endGame.create(status);
                    mainStage.addChild(that.endGame.show());
                },
                
                endGameClose: function()
                {
                    that.sound.soundStopStarWarsThemeEnd();
                    
                    mainStage.removeChild(that.endGame.close());
                    that.endGame.destroy();
                    that.endGame = that.timer = that.match = that.initialization = that.menu = that.backmenu = that.settings = that.message = that.side = that.command = that.startbattle = that.level = that.victory = that.lost = null;
                    that.config.side = "side_none";
                    that.config.stopAI = false;
                    that.menuShow();
                }
		
        };
        return that;
};

/* == END FILE ========================================================== */

/* == START FILE ========================================================= */

var renderer = null;
var stage = null;

function onInit()
{
    renderer = PIXI.autoDetectRenderer(860, 730,{backgroundColor : 0xFFFFFF, antialias : true});
    document.body.appendChild(renderer.view);
    stage = new PIXI.Container();

    draw();
	
	var game = Game(stage);
	game.loadAssets();
	
	/* Инициализация ВКонтакте */
	VK.init(function() {
            apiId: 5170657;
        });
}

function draw() 
{
    requestAnimationFrame(draw);
    renderer.render(stage);
}

window.addEventListener("load", onInit, false);

/* == END FILE ========================================================== */
