namespace SpriteKind {
    export const Goomba = SpriteKind.create()
    export const BasicEnemy = SpriteKind.create()
    export const Crate = SpriteKind.create()
    export const AiEnemy = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStarted) {
        if (Direction == "r") {
            mySprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                . . . 5 f f f f f f f f 5 . . . 
                . . . 5 f f f f f f f f 5 . . . 
                . . . 5 f f f f f f f f 5 . . . 
                . . . 5 f f f f f f f f 5 . . . 
                . . . 5 f f f f f 5 5 5 5 5 5 . 
                . . . 5 f f f f f 5 f f f f 5 . 
                . . . 5 f f f f f 5 5 5 5 5 5 . 
                . . . 5 f f f f f f f f 5 . . . 
                . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                `)
        } else if (Direction == "l") {
            mySprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                . . . 5 f f f f f f f f 5 . . . 
                . . . 5 f f f f f f f f 5 . . . 
                . . . 5 f f f f f f f f 5 . . . 
                . . . 5 f f f f f f f f 5 . . . 
                . 5 5 5 5 5 5 f f f f f 5 . . . 
                . 5 f f f f 5 f f f f f 5 . . . 
                . 5 5 5 5 5 5 f f f f f 5 . . . 
                . . . 5 f f f f f f f f 5 . . . 
                . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                `)
        }
        if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
            mySprite.vy = -200
        }
        Crouch = false
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Crate, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    timer.background(function () {
        otherSprite.destroy(effects.disintegrate, 500)
    })
    timer.after(50, function () {
        if (Math.percentChance(25)) {
            info.changeScoreBy(10)
        } else if (Math.percentChance(25)) {
            Ammo += 5
            if (Ammo > 20) {
                Ammo = 20
            }
        } else if (Math.percentChance(25)) {
            statusbar.value += 5
        } else if (Math.percentChance(25)) {
            info.changeScoreBy(15)
        }
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BasicEnemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    timer.background(function () {
        otherSprite.destroy(effects.disintegrate, 500)
    })
    timer.after(50, function () {
        statusbar.value += -10
    })
})
function Crate_maker () {
    if (Math.percentChance(75)) {
        Reward_Crate = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . e e e e e e e e . . . . 
            . . . . e f f f f f f e . . . . 
            . . . . e f f e e f f e . . . . 
            . . . . e e e e e e e e . . . . 
            . . . . e f f e e f f e . . . . 
            . . . . e f f f f f f e . . . . 
            . . . . e f f f f f f e . . . . 
            . . . . e e e e e e e e . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Crate)
        tiles.placeOnTile(Reward_Crate, tiles.getTileLocation(randint(0, 44), 0))
        Reward_Crate.setVelocity(0, 60)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStarted) {
        if (Ammo > 0) {
            if (!(Delay_Actived)) {
                if (Direction == "r") {
                    if (Crouch == false) {
                        animation.runImageAnimation(
                        mySprite,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f 5 5 5 5 5 5 . 
                            . . . 5 f f f f f 5 f f f f 5 . 
                            . . . 5 f f f f f 5 5 5 5 5 5 . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f 5 5 5 5 5 5 . . 
                            . . . 5 f f f f 5 f f f f 5 . . 
                            . . . 5 f f f f 5 5 5 5 5 5 . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f 5 5 5 5 5 5 . . . 
                            . . . 5 f f f 5 f f f f 5 . . . 
                            . . . 5 f f f 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f 5 5 5 5 5 5 . . 
                            . . . 5 f f f f 5 f f f f 5 . . 
                            . . . 5 f f f f 5 5 5 5 5 5 . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f 5 5 5 5 5 5 . 
                            . . . 5 f f f f f 5 f f f f 5 . 
                            . . . 5 f f f f f 5 5 5 5 5 5 . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `],
                        75,
                        false
                        )
                    } else if (Crouch == true) {
                        animation.runImageAnimation(
                        mySprite,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f 5 5 5 5 5 5 . 
                            . . . 5 f f f f f 5 f f f f 5 . 
                            . . . 5 f f f f f 5 5 5 5 5 5 . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f 5 5 5 5 5 5 . . 
                            . . . 5 f f f f 5 f f f f 5 . . 
                            . . . 5 f f f f 5 5 5 5 5 5 . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f 5 5 5 5 5 5 . . . 
                            . . . 5 f f f 5 f f f f 5 . . . 
                            . . . 5 f f f 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f 5 5 5 5 5 5 . . 
                            . . . 5 f f f f 5 f f f f 5 . . 
                            . . . 5 f f f f 5 5 5 5 5 5 . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f 5 5 5 5 5 5 . 
                            . . . 5 f f f f f 5 f f f f 5 . 
                            . . . 5 f f f f f 5 5 5 5 5 5 . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `],
                        75,
                        false
                        )
                    }
                    music.playTone(147, music.beat(BeatFraction.Half))
                    projectile = sprites.createProjectileFromSprite(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . 5 5 5 5 
                        . . . . . . . . . . . . 5 f f 5 
                        . . . . . . . . . . . . 5 5 5 5 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, mySprite, 150, 0)
                    Ammo += -1
                } else if (Direction == "l") {
                    if (Crouch == false) {
                        animation.runImageAnimation(
                        mySprite,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . 5 5 5 5 5 5 f f f f f 5 . . . 
                            . 5 f f f f 5 f f f f f 5 . . . 
                            . 5 5 5 5 5 5 f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . 5 5 5 5 5 5 f f f f 5 . . . 
                            . . 5 f f f f 5 f f f f 5 . . . 
                            . . 5 5 5 5 5 5 f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 f f f 5 . . . 
                            . . . 5 f f f f 5 f f f 5 . . . 
                            . . . 5 5 5 5 5 5 f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . 5 5 5 5 5 5 f f f f 5 . . . 
                            . . 5 f f f f 5 f f f f 5 . . . 
                            . . 5 5 5 5 5 5 f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . 5 5 5 5 5 5 f f f f f 5 . . . 
                            . 5 f f f f 5 f f f f f 5 . . . 
                            . 5 5 5 5 5 5 f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . 5 5 5 5 5 5 f f f f f 5 . . . 
                            . 5 f f f f 5 f f f f f 5 . . . 
                            . 5 5 5 5 5 5 f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `],
                        75,
                        false
                        )
                    } else if (Crouch == true) {
                        animation.runImageAnimation(
                        mySprite,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . 5 5 5 5 5 5 f f f f f 5 . . . 
                            . 5 f f f f 5 f f f f f 5 . . . 
                            . 5 5 5 5 5 5 f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . 5 5 5 5 5 5 f f f f 5 . . . 
                            . . 5 f f f f 5 f f f f 5 . . . 
                            . . 5 5 5 5 5 5 f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 f f f 5 . . . 
                            . . . 5 f f f f 5 f f f 5 . . . 
                            . . . 5 5 5 5 5 5 f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . 5 5 5 5 5 5 f f f f 5 . . . 
                            . . 5 f f f f 5 f f f f 5 . . . 
                            . . 5 5 5 5 5 5 f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . 5 5 5 5 5 5 f f f f f 5 . . . 
                            . 5 f f f f 5 f f f f f 5 . . . 
                            . 5 5 5 5 5 5 f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . 5 5 5 5 5 5 f f f f f 5 . . . 
                            . 5 f f f f 5 f f f f f 5 . . . 
                            . 5 5 5 5 5 5 f f f f f 5 . . . 
                            . . . 5 f f f f f f f f 5 . . . 
                            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                            `],
                        75,
                        false
                        )
                    }
                    projectile = sprites.createProjectileFromSprite(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        5 5 5 5 . . . . . . . . . . . . 
                        5 f f 5 . . . . . . . . . . . . 
                        5 5 5 5 . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, mySprite, -150, 0)
                    Ammo += -1
                }
                Delay_Actived = true
                timer.after(Delay, function () {
                    Delay_Actived = false
                })
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Crate, SpriteKind.Crate, function (sprite, otherSprite) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(randint(0, 44), 0))
    sprite.setVelocity(0, 90)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Direction = "l"
    if (Crouch == false) {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . 5 5 5 5 5 5 f f f f f 5 . . . 
            . 5 f f f f 5 f f f f f 5 . . . 
            . 5 5 5 5 5 5 f f f f f 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
            `)
    } else if (Crouch == true) {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . 5 5 5 5 5 5 f f f f f 5 . . . 
            . 5 f f f f 5 f f f f f 5 . . . 
            . 5 5 5 5 5 5 f f f f f 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
            `)
    }
})
function Map_maker () {
    tiles.setTilemap(tiles.createTilemap(hex`2d000f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
        .............................................
        .............................................
        .............................................
        .............................................
        .............................................
        .............................................
        .............................................
        .............................................
        .............................................
        .............................................
        .............................................
        .............................................
        .............................................
        .............................................
        .............................................
        `, [myTiles.transparency16,myTiles.tile16], TileScale.Sixteen))
    for (let index = 0; index < 100; index++) {
        tiles.setTileAt(tiles.getTileLocation(randint(0, 44), randint(0, 14)), myTiles.tile16)
    }
    for (let value of tiles.getTilesByType(myTiles.tile16)) {
        tiles.setWallAt(value, true)
    }
    tiles.placeOnRandomTile(mySprite, myTiles.transparency16)
}
sprites.onOverlap(SpriteKind.BasicEnemy, SpriteKind.BasicEnemy, function (sprite, otherSprite) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(randint(0, 44), 0))
    sprite.setVelocity(0, 202)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Direction = "r"
    if (Crouch == false) {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 f f f f f 5 5 5 5 5 5 . 
            . . . 5 f f f f f 5 f f f f 5 . 
            . . . 5 f f f f f 5 5 5 5 5 5 . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
            `)
    } else if (Crouch == true) {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 f f f f f 5 5 5 5 5 5 . 
            . . . 5 f f f f f 5 f f f f 5 . 
            . . . 5 f f f f f 5 5 5 5 5 5 . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
            `)
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    Crouch = true
    if (Direction == "r") {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 f f f f f 5 5 5 5 5 5 . 
            . . . 5 f f f f f 5 f f f f 5 . 
            . . . 5 f f f f f 5 5 5 5 5 5 . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
            `)
    } else if (Direction == "l") {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . 5 5 5 5 5 5 f f f f f 5 . . . 
            . 5 f f f f 5 f f f f f 5 . . . 
            . 5 5 5 5 5 5 f f f f f 5 . . . 
            . . . 5 f f f f f f f f 5 . . . 
            . . . 5 5 5 5 5 5 5 5 5 5 . . . 
            `)
    }
})
info.onLifeZero(function () {
    if (gameStarted) {
        game.over(false, color.FadeToWhite)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BasicEnemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    timer.background(function () {
        otherSprite.destroy(effects.disintegrate, 500)
    })
    timer.after(50, function () {
        info.changeScoreBy(2)
    })
})
blockMenu.onMenuOptionSelected(function (option, index) {
    if (option == "PLAY") {
        color.FadeToWhite.startScreenEffect()
        textSprite.destroy()
        blockMenu.setControlsEnabled(false)
        blockMenu.closeMenu()
        timer.after(1500, function () {
            statusbar = statusbars.create(20, 4, StatusBarKind.Health)
            statusbar.value = 100
            statusbar.max = 100
            info.setLife(3)
            statusbar.positionDirection(CollisionDirection.Top)
            Ammo = 20
            textSprite2 = textsprite.create("" + Ammo + " / 20")
            textSprite2.setFlag(SpriteFlag.RelativeToCamera, true)
            mySprite = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                . . . 5 f f f f f f f f 5 . . . 
                . . . 5 f f f f f f f f 5 . . . 
                . . . 5 f f f f f f f f 5 . . . 
                . . . 5 f f f f f f f f 5 . . . 
                . . . 5 f f f f f 5 5 5 5 5 5 . 
                . . . 5 f f f f f 5 f f f f 5 . 
                . . . 5 f f f f f 5 5 5 5 5 5 . 
                . . . 5 f f f f f f f f 5 . . . 
                . . . 5 5 5 5 5 5 5 5 5 5 . . . 
                `, SpriteKind.Player)
            scene.cameraFollowSprite(mySprite)
            mySprite.ay = 250
            controller.moveSprite(mySprite, 100, 0)
            Map_maker()
            color.startFade(color.White, color.originalPalette)
            timer.after(10, function () {
                gameStarted = true
            })
        })
    } else if (option == "INFORMATION") {
        game.setDialogFrame(img`
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
            9 f f f f f f f f f f f f f 9 
            9 f f f f f f f f f f f f f 9 
            9 f f f f f f f f f f f f f 9 
            9 f f f f f f f f f f f f f 9 
            9 f f f f f f f f f f f f f 9 
            9 f f f f f f f f f f f f f 9 
            9 f f f f f f f f f f f f f 9 
            9 f f f f f f f f f f f f f 9 
            9 f f f f f f f f f f f f f 9 
            9 f f f f f f f f f f f f f 9 
            9 f f f f f f f f f f f f f 9 
            9 f f f f f f f f f f f f f 9 
            9 f f f f f f f f f f f f f 9 
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
            `)
        game.setDialogTextColor(9)
        game.showLongText("AD or LEFT and RIGHT ARROW KEYS to move left and right. W or UP KEY to jump. S or DOWN ARROW to crouch. SPACE or Z to shoot. Shooting enemies will give you 2 points. Crates can give you health, points, or ammunition. 5 points = 1 unit (in-game-currency).", DialogLayout.Full)
    }
})
function Enemy_Maker () {
    Basic_Enemy = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 2 . . . 
        . . . 2 f f f f f f f f 2 . . . 
        . . . 2 f f f f f f f f 2 . . . 
        . . . 2 f f f f f f f f 2 . . . 
        . . . 2 f f f f f f f f 2 . . . 
        . . . 2 f f f f f f f f 2 . . . 
        . . . 2 f f f f f f f f 2 . . . 
        . . . 2 f f f f f f f f 2 . . . 
        . . . 2 f f f f f f f f 2 . . . 
        . . . 2 2 2 2 2 2 2 2 2 2 . . . 
        `, SpriteKind.BasicEnemy)
    tiles.placeOnTile(Basic_Enemy, tiles.getTileLocation(randint(0, 44), 0))
    Basic_Enemy.setVelocity(0, 202)
    mySprite.lifespan = 10000
}
let Basic_Enemy: Sprite = null
let textSprite2: Sprite = null
let projectile: Sprite = null
let Reward_Crate: Sprite = null
let statusbar: StatusBarSprite = null
let Ammo = 0
let mySprite: Sprite = null
let Direction = ""
let textSprite: Sprite = null
let gameStarted = false
let Crouch = false
let Delay_Actived = false
let Delay = 0
Delay = 250
Delay_Actived = false
Crouch = false
gameStarted = false
blockMenu.showMenu(["PLAY", "INFORMATION"], MenuStyle.List, MenuLocation.BottomHalf)
textSprite = textsprite.create("GAME", 0, 9)
textSprite.setPosition(80, 15)
blockMenu.setColors(9, 15)
game.onUpdate(function () {
    if (gameStarted) {
        textSprite2.destroy()
        textSprite2 = textsprite.create("" + Ammo + " | 20", 1, 8)
        textSprite2.setFlag(SpriteFlag.RelativeToCamera, true)
        textSprite2.setPosition(21, 20)
    }
})
game.onUpdate(function () {
    if (gameStarted) {
        if (statusbar.value == 0) {
            color.FadeToWhite.startScreenEffect(1000)
            tiles.destroySpritesOfKind(SpriteKind.BasicEnemy)
            tiles.destroySpritesOfKind(SpriteKind.Crate)
            info.changeLifeBy(-1)
            Crate_maker()
            Enemy_Maker()
            Map_maker()
            statusbar.value = statusbar.max
            timer.after(1500, function () {
                color.startFade(color.White, color.originalPalette, 1000)
            })
        }
    }
})
game.onUpdate(function () {
    if (gameStarted) {
        color.setColor(1, color.rgb(0, 0, 0))
    }
})
game.onUpdateInterval(2000, function () {
    if (gameStarted) {
        Crate_maker()
    }
})
game.onUpdateInterval(2000, function () {
    if (gameStarted) {
        Enemy_Maker()
    }
})
