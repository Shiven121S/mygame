namespace SpriteKind {
    export const Goomba = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStarted) {
        if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
            mySprite.vy = -200
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStarted) {
        if (Ammo > 0) {
            if (Direction == "r") {
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
            Camera.follow(mySprite, 91)
            scene.cameraFollowSprite(Camera)
            tiles.setTilemap(tiles.createTilemap(hex`2d000f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000803000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b0900000000000000000000000000000000000000000000000000000803000000000000000000000000000000000000000000000000000000000000000803000000000000000000000b0900000000000000000803000000000000000000000000000000000000000000040700000000000000000000000000000000000000000b090000000000000000000000000000000000000803000407000000000000000000000000000000000000000000000000000000020203000000000008030000000b09000b0900000000000000000000000000000000000000000000000008020201010700000000000b090000000000000000000000000000000000000000000000000000000000000000040101010107000000000000000000000000000000000000000803000000000008020203000000000000000000040101010107000000000000000000000000000000000000000b0900000000000b0a0a09000000000000000000040101010107000000000000000000000000000000000000000000000000000000000000000000000000000000040101010107000000000000000802020202020300000000000008020203000000000000000000000000000000040101010107000000000000000401010101010700000000000004010107000000000c00000000000000000000040101010105020202020202020601010101010502020202020206010105020202020d02020202020202020202060101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101`, img`
                .............................................
                22...........................................
                22..........................22...............
                ................22..........22........22.....
                ................22....................22.....
                .............22.22...........................
                222.....22...22.22........................222
                222.....22................................222
                222...................22.....2222.........222
                222...................22.....2222.........222
                222.......................................222
                222.......2222222......2222...............222
                222.......2222222......2222....2..........222
                222222222222222222222222222222222222222222222
                222222222222222222222222222222222222222222222
                `, [myTiles.transparency16,myTiles.tile16,myTiles.tile17,myTiles.tile18,myTiles.tile19,myTiles.tile20,myTiles.tile21,myTiles.tile22,myTiles.tile23,myTiles.tile2,myTiles.tile1,myTiles.tile3,myTiles.tile5,myTiles.tile6], TileScale.Sixteen))
            squareGoomba = sprites.create(img`
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
                `, SpriteKind.Goomba)
            tiles.placeOnTile(squareGoomba, tiles.getTileLocation(41, 12))
            squareGoomba.setVelocity(-75, 0)
            squareGoomba.setFlag(SpriteFlag.BounceOnWall, true)
            mySprite.ay = 250
            controller.moveSprite(mySprite, 100, 0)
            color.startFade(color.White, color.originalPalette, 1000)
            gameStarted = true
        })
    }
})
let squareGoomba: Sprite = null
let Camera: Sprite = null
let textSprite2: Sprite = null
let projectile: Sprite = null
let Direction = ""
let Ammo = 0
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
