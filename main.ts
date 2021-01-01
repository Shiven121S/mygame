namespace SpriteKind {
    export const Goomba = SpriteKind.create()
    export const BasicEnemy = SpriteKind.create()
    export const Crate = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStarted) {
        if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
            mySprite.vy = -200
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Crate, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    timer.background(function () {
        otherSprite.destroy(effects.disintegrate, 500)
    })
    timer.after(50, function () {
        Reward = randint(1, 2)
        if (Reward == 1) {
            info.changeScoreBy(20)
        } else if (Reward == 2) {
            Ammo += 5
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStarted) {
        if (Ammo > 0) {
            if (Direction == "r") {
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
        }
    }
})
sprites.onOverlap(SpriteKind.Crate, SpriteKind.Crate, function (sprite, otherSprite) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(randint(0, 44), 0))
    sprite.setVelocity(0, 90)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Direction = "l"
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
})
sprites.onOverlap(SpriteKind.BasicEnemy, SpriteKind.BasicEnemy, function (sprite, otherSprite) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(randint(0, 44), 0))
    sprite.setVelocity(0, 202)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Direction = "r"
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
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BasicEnemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    timer.background(function () {
        otherSprite.destroy(effects.disintegrate, 500)
    })
    timer.after(50, function () {
        info.changeScoreBy(5)
    })
})
blockMenu.onMenuOptionSelected(function (option, index) {
    if (option == "PLAY") {
        color.FadeToWhite.startScreenEffect(1000)
        textSprite.destroy()
        blockMenu.setControlsEnabled(false)
        blockMenu.closeMenu()
        timer.after(750, function () {
            color.startFade(color.White, color.originalPalette, 1000)
            blockMenu.showMenu(["Neon Map"], MenuStyle.Grid, MenuLocation.FullScreen)
            blockMenu.setControlsEnabled(true)
        })
    }
    if (option == "Neon Map") {
        color.startFade(color.originalPalette, color.White, 1000)
        blockMenu.setControlsEnabled(false)
        blockMenu.closeMenu()
        timer.after(750, function () {
            statusbar = statusbars.create(20, 4, StatusBarKind.Health)
            statusbar.value = 100
            statusbar.max = 100
            info.setLife(3)
            statusbar.positionDirection(CollisionDirection.Top)
            Ammo = 15
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
            tiles.placeOnRandomTile(mySprite, myTiles.transparency16)
            Camera = sprites.create(img`
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
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Player)
            Camera.follow(mySprite, 80)
            scene.cameraFollowSprite(Camera)
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
                `, [myTiles.transparency16], TileScale.Sixteen))
            for (let index2 = 0; index2 < 100; index2++) {
                tiles.setTileAt(tiles.getTileLocation(randint(0, 44), randint(0, 14)), myTiles.tile16)
            }
            for (let value of tiles.getTilesByType(myTiles.tile16)) {
                tiles.setWallAt(value, true)
            }
            mySprite.ay = 250
            controller.moveSprite(mySprite, 100, 0)
            color.startFade(color.White, color.originalPalette, 1000)
            gameStarted = true
        })
    }
})
let Basic_Enemy: Sprite = null
let Reward_Crate: Sprite = null
let Camera: Sprite = null
let textSprite2: Sprite = null
let projectile: Sprite = null
let Direction = ""
let statusbar: StatusBarSprite = null
let Ammo = 0
let Reward = 0
let mySprite: Sprite = null
let textSprite: TextSprite = null
let gameStarted = false
gameStarted = false
blockMenu.showMenu(["PLAY"], MenuStyle.List, MenuLocation.BottomHalf)
textSprite = textsprite.create("GAME")
textSprite.setPosition(41, 15)
textSprite.setMaxFontHeight(20)
blockMenu.setColors(1, 15)
game.onUpdate(function () {
    if (gameStarted) {
        textSprite2.destroy()
        textSprite2 = textsprite.create("" + Ammo + " / 15", 15, 1)
        textSprite2.setFlag(SpriteFlag.RelativeToCamera, true)
        textSprite2.setPosition(25, 20)
    }
})
game.onUpdateInterval(2000, function () {
    if (gameStarted) {
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
        Reward_Crate.setVelocity(0, 90)
    }
})
game.onUpdateInterval(2000, function () {
    if (gameStarted) {
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
})
