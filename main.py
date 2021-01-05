@namespace
class SpriteKind:
    Goomba = SpriteKind.create()
    BasicEnemy = SpriteKind.create()
    Crate = SpriteKind.create()
    AiEnemy = SpriteKind.create()

def on_up_pressed():
    global Crouch
    if gameStarted:
        if Direction == "r":
            mySprite.set_image(img("""
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
            """))
        elif Direction == "l":
            mySprite.set_image(img("""
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
            """))
        if mySprite.is_hitting_tile(CollisionDirection.BOTTOM):
            mySprite.vy = -200
        Crouch = False
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_on_overlap(sprite, otherSprite):
    scene.camera_shake(4, 500)
    
    def on_background():
        otherSprite.destroy(effects.disintegrate, 500)
    timer.background(on_background)
    
    
    def on_after():
        global Ammo
        if Math.percent_chance(25):
            info.change_score_by(10)
        elif Math.percent_chance(25):
            Ammo += 5
            if Ammo > 20:
                Ammo = 20
        elif Math.percent_chance(25):
            statusbar.value += 5
        elif Math.percent_chance(25):
            info.change_score_by(15)
    timer.after(50, on_after)
    
sprites.on_overlap(SpriteKind.player, SpriteKind.Crate, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    scene.camera_shake(4, 500)
    
    def on_background2():
        otherSprite.destroy(effects.disintegrate, 500)
    timer.background(on_background2)
    
    
    def on_after2():
        statusbar.value += -10
    timer.after(50, on_after2)
    
sprites.on_overlap(SpriteKind.player, SpriteKind.BasicEnemy, on_on_overlap2)

def Crate_maker():
    global Reward_Crate
    if Math.percent_chance(75):
        Reward_Crate = sprites.create(img("""
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
            """),
            SpriteKind.Crate)
        tiles.place_on_tile(Reward_Crate, tiles.get_tile_location(randint(0, 44), 0))
        Reward_Crate.set_velocity(0, 60)

def on_a_pressed():
    global projectile, Ammo, Delay_Actived
    if gameStarted:
        if Ammo > 0:
            if not (Delay_Actived):
                if Direction == "r":
                    if Crouch == False:
                        animation.run_image_animation(mySprite,
                            [img("""
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
                                """),
                                img("""
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
                                """),
                                img("""
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
                                """),
                                img("""
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
                                """),
                                img("""
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
                                """)],
                            75,
                            False)
                    elif Crouch == True:
                        animation.run_image_animation(mySprite,
                            [img("""
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
                                """),
                                img("""
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
                                """),
                                img("""
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
                                """),
                                img("""
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
                                """),
                                img("""
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
                                """)],
                            75,
                            False)
                    music.play_tone(147, music.beat(BeatFraction.WHOLE))
                    projectile = sprites.create_projectile_from_sprite(img("""
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
                        """),
                        mySprite,
                        150,
                        0)
                    Ammo += -1
                elif Direction == "l":
                    if Crouch == False:
                        animation.run_image_animation(mySprite,
                            [img("""
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
                                """),
                                img("""
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
                                """),
                                img("""
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
                                """),
                                img("""
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
                                """),
                                img("""
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
                                """),
                                img("""
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
                                """)],
                            75,
                            False)
                    elif Crouch == True:
                        animation.run_image_animation(mySprite,
                            [img("""
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
                                """),
                                img("""
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
                                """),
                                img("""
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
                                """),
                                img("""
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
                                """),
                                img("""
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
                                """),
                                img("""
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
                                """)],
                            75,
                            False)
                    projectile = sprites.create_projectile_from_sprite(img("""
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
                        """),
                        mySprite,
                        -150,
                        0)
                    Ammo += -1
                Delay_Actived = True
                
                def on_after3():
                    global Delay_Actived
                    Delay_Actived = False
                timer.after(Delay, on_after3)
                
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap3(sprite, otherSprite):
    tiles.place_on_tile(sprite, tiles.get_tile_location(randint(0, 44), 0))
    sprite.set_velocity(0, 90)
sprites.on_overlap(SpriteKind.Crate, SpriteKind.Crate, on_on_overlap3)

def on_left_pressed():
    global Direction
    Direction = "l"
    if Crouch == False:
        mySprite.set_image(img("""
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
        """))
    elif Crouch == True:
        mySprite.set_image(img("""
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
        """))
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def Map_maker():
    tiles.set_tilemap(tiles.create_tilemap(hex("""
                2d000f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            """),
            img("""
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
            """),
            [myTiles.transparency16, myTiles.tile16],
            TileScale.SIXTEEN))
    for index in range(100):
        tiles.set_tile_at(tiles.get_tile_location(randint(0, 44), randint(0, 14)),
            myTiles.tile16)
    for value in tiles.get_tiles_by_type(myTiles.tile16):
        tiles.set_wall_at(value, True)
    tiles.place_on_random_tile(mySprite, myTiles.transparency16)

def on_on_overlap4(sprite, otherSprite):
    tiles.place_on_tile(sprite, tiles.get_tile_location(randint(0, 44), 0))
    sprite.set_velocity(0, 202)
sprites.on_overlap(SpriteKind.BasicEnemy, SpriteKind.BasicEnemy, on_on_overlap4)

def on_right_pressed():
    global Direction
    Direction = "r"
    if Crouch == False:
        mySprite.set_image(img("""
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
        """))
    elif Crouch == True:
        mySprite.set_image(img("""
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
        """))
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_down_pressed():
    global Crouch
    Crouch = True
    if Direction == "r":
        mySprite.set_image(img("""
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
        """))
    elif Direction == "l":
        mySprite.set_image(img("""
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
        """))
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_life_zero():
    if gameStarted:
        game.over(False, color.fade_to_white)
info.on_life_zero(on_life_zero)

def on_on_overlap5(sprite, otherSprite):
    scene.camera_shake(4, 500)
    
    def on_background3():
        otherSprite.destroy(effects.disintegrate, 500)
    timer.background(on_background3)
    
    
    def on_after4():
        info.change_score_by(2)
    timer.after(50, on_after4)
    
sprites.on_overlap(SpriteKind.projectile, SpriteKind.BasicEnemy, on_on_overlap5)

def on_menu_option_selected(option, index):
    if option == "PLAY":
        color.fade_to_white.start_screen_effect()
        textSprite.destroy()
        blockMenu.set_controls_enabled(False)
        blockMenu.close_menu()
        
        def on_after5():
            global statusbar, Ammo, textSprite2, mySprite
            statusbar = statusbars.create(20, 4, StatusBarKind.health)
            statusbar.value = 100
            statusbar.max = 100
            info.set_life(3)
            statusbar.position_direction(CollisionDirection.TOP)
            Ammo = 20
            textSprite2 = textsprite.create("" + str(Ammo) + " / 20")
            textSprite2.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
            mySprite = sprites.create(img("""
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
                """),
                SpriteKind.player)
            scene.camera_follow_sprite(mySprite)
            mySprite.ay = 250
            controller.move_sprite(mySprite, 100, 0)
            Map_maker()
            color.start_fade(color.white, color.original_palette)
            
            def on_after6():
                global gameStarted
                gameStarted = True
            timer.after(10, on_after6)
            
        timer.after(1500, on_after5)
        
    elif option == "INFORMATION":
        game.set_dialog_frame(img("""
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
        """))
        game.set_dialog_text_color(9)
        game.show_long_text("AD or LEFT and RIGHT ARROW KEYS to move left and right. W or UP KEY to jump. S or DOWN ARROW to crouch. SPACE or Z to shoot. Shooting enemies will give you 2 points. Crates can give you health, points, or ammunition. 5 points = 1 unit (in-game-currency).",
            DialogLayout.FULL)
blockMenu.on_menu_option_selected(on_menu_option_selected)

def Enemy_Maker():
    global Basic_Enemy
    Basic_Enemy = sprites.create(img("""
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
        """),
        SpriteKind.BasicEnemy)
    tiles.place_on_tile(Basic_Enemy, tiles.get_tile_location(randint(0, 44), 0))
    Basic_Enemy.set_velocity(0, 202)
    mySprite.lifespan = 10000
Basic_Enemy: Sprite = None
textSprite2: Sprite = None
projectile: Sprite = None
Reward_Crate: Sprite = None
statusbar: StatusBarSprite = None
Ammo = 0
mySprite: Sprite = None
Direction = ""
textSprite: Sprite = None
gameStarted = False
Crouch = False
Delay_Actived = False
Delay = 0
Delay = 250
Delay_Actived = False
Crouch = False
gameStarted = False
blockMenu.show_menu(["PLAY", "INFORMATION"],
    MenuStyle.LIST,
    MenuLocation.BOTTOM_HALF)
textSprite = textsprite.create("GAME", 0, 9)
textSprite.set_position(80, 15)
blockMenu.set_colors(9, 15)

def on_on_update():
    global textSprite2
    if gameStarted:
        textSprite2.destroy()
        textSprite2 = textsprite.create("" + str(Ammo) + " | 20", 1, 8)
        textSprite2.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
        textSprite2.set_position(21, 20)
game.on_update(on_on_update)

def on_on_update2():
    if gameStarted:
        if statusbar.value == 0:
            color.fade_to_white.start_screen_effect(1000)
            tiles.destroy_sprites_of_kind(SpriteKind.BasicEnemy)
            tiles.destroy_sprites_of_kind(SpriteKind.Crate)
            info.change_life_by(-1)
            Crate_maker()
            Enemy_Maker()
            Map_maker()
            statusbar.value = statusbar.max
            
            def on_after7():
                color.start_fade(color.white, color.original_palette, 1000)
            timer.after(1500, on_after7)
            
game.on_update(on_on_update2)

def on_on_update3():
    if gameStarted:
        color.set_color(1, color.rgb(0, 0, 0))
game.on_update(on_on_update3)

def on_update_interval():
    if gameStarted:
        Crate_maker()
game.on_update_interval(2000, on_update_interval)

def on_update_interval2():
    if gameStarted:
        Enemy_Maker()
game.on_update_interval(2000, on_update_interval2)
