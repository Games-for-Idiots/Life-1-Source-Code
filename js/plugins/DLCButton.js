(() => {
    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('dlc', this.showDLCImage.bind(this));
    };

    const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.call(this);
        this.addCommand("DLC", 'dlc');
    };

    Scene_Title.prototype.showDLCImage = function() {
        this._dlcImage = new Sprite();
        this._dlcImage.bitmap = ImageManager.loadPicture('ComingSoon');
        this._dlcImage.x = (Graphics.width - 823) / 2; // Centrado horizontalmente
        this._dlcImage.y = (Graphics.height - 669) / 2; // Centrado verticalmente
        this.addChild(this._dlcImage);
        this._commandWindow.close();
        this.startDLCImageTimer();
    };

    Scene_Title.prototype.startDLCImageTimer = function() {
        this._dlcTimer = 10 * 60; // 10 segundos a 60 FPS
        this._waitForTimer = true;
    };

    const _Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _Scene_Title_update.call(this);
        this.checkDLCImageTimer();
    };

    Scene_Title.prototype.checkDLCImageTimer = function() {
        if (this._waitForTimer) {
            this._dlcTimer--;
            if (this._dlcTimer <= 0) {
                this.restartGame();
            }
        }
    };

    Scene_Title.prototype.restartGame = function() {
        SceneManager.goto(Scene_Title); // Cambiar a Scene_Title para reiniciar el juego
        if (this._dlcImage) {
            this.removeChild(this._dlcImage);
            this._dlcImage = null;
        }
        this._commandWindow.open();
        this._waitForTimer = false;
    };
})();
