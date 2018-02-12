import { Key } from "phaser-ce";

export class Player extends Phaser.Graphics {

    private state: Phaser.State;

    private diameter: number;

    private w: Phaser.Key;
    private a: Phaser.Key;
    private s: Phaser.Key;
    private d: Phaser.Key;
    private up_arrow: Phaser.Key;
    private left_arrow: Phaser.Key;
    private down_arrow: Phaser.Key;
    private right_arrow: Phaser.Key;

    private speed: number;

    constructor(state: Phaser.State, diameter: number =  32, speed: number = 1, x: number, y: number) {

        super(state.game);

        this.x = x;
        this.y = y;

        this.state = state;

        this.speed = speed;

        this.diameter = diameter;

        this.beginFill(0x33DDFF);
        this.drawCircle(0, 0, diameter)
        this.endFill();

        this.lineStyle(4, 0xCE33FF);
        this.arc(0, 0, diameter/2, -Phaser.Math.PI2/8, Phaser.Math.PI2/8, false);

        this.w = this.game.input.keyboard.addKey(Phaser.KeyCode.W);
        this.up_arrow = this.game.input.keyboard.addKey(Phaser.KeyCode.UP);

        this.a = this.game.input.keyboard.addKey(Phaser.KeyCode.A);
        this.left_arrow = this.game.input.keyboard.addKey(Phaser.KeyCode.LEFT);

        this.s = this.game.input.keyboard.addKey(Phaser.KeyCode.S);
        this.down_arrow = this.game.input.keyboard.addKey(Phaser.KeyCode.DOWN);

        this.d = this.game.input.keyboard.addKey(Phaser.KeyCode.D);
        this.right_arrow = this.game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
        

        state.add.existing(this);
    }

    update() {

        this.rotation = this.game.physics.arcade.angleToPointer(this);

        if(this.w.isDown || this.up_arrow.isDown){

            this.y -=  this.speed;

        }
        
        else if(this.s.isDown || this.down_arrow.isDown){

            this.y += this.speed;

        }

        if(this.a.isDown || this.left_arrow.isDown){

            this.x -= this.speed;
            
        }

        else if(this.d.isDown || this.right_arrow.isDown){
            
            this.x += this.speed;
            
        }
    }

}