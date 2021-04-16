import os
import sys
import pygame as py
import ChessEngine

TILEWIDTH = 64  # holds the tile width and height
TILEHEIGHT = 64
TILEHEIGHT_HALF = TILEHEIGHT / 2
TILEWIDTH_HALF = TILEWIDTH / 2
WIDTH = HEIGHT = 512
screen = py.display.set_mode((WIDTH, HEIGHT))
DIMENSION = 8   # dimensions of a chess board are 8x8
SQ_SIZE = HEIGHT // DIMENSION
MAX_FPS = 15  # for animations
IMAGES = {}
wall = py.image.load('pawn.png').convert_alpha()  # load images
grass = py.image.load('grass.png').convert_alpha()

def loadImages():
    pieces = ['wp', 'wR', 'wN', 'wB', 'wK', 'wQ', 'bp', 'bR', 'bR', 'bN', 'bB', 'bK', 'bQ']
    for piece in pieces:
        #print(piece)
        IMAGES[piece] = py.transform.scale(py.image.load("images/" + piece + ".png"), (SQ_SIZE, SQ_SIZE))
        # IMAGES[piece] = py.transform.scale(py.image.load("wp.png"), (SQ_SIZE, SQ_SIZE))
        #IMAGES[piece] = py.image.load(r'D:\Studia UWr\Semestr 2\Projekt w języku skryptowym\Game\pawn.png')
        #IMAGES[piece] = py.transform.scale(py.image.load('Game/images/' + piece + '.png'), (SQ_SIZE, SQ_SIZE))


def main():
    py.init()


    #clock = py.Clock()
    screen.fill(py.Color("White"))
    gs = ChessEngine.GameState()
    print(gs.board)
    loadImages()  # only once
    running = True
    sqSelected = ()  # row, col
    playerClicks = []
    while running:
        for e in py.event.get():
            if e.type == py.QUIT:
                running = False
            elif e.type == py.MOUSEBUTTONDOWN:
                location = py.mouse.get_pos() #  x and y postion of mouse
                col = location[0]//SQ_SIZE
                row = location[1]//SQ_SIZE
                if sqSelected == (row, col): # the same square clicked twice
                    sqSelected = ()  # noone
                    playerClicks = []
                else:
                    sqSelected = (row, col)
                    playerClicks.append(sqSelected)
                if len(playerClicks) == 2:                 #  moving pawns
                    move = ChessEngine.Move(playerClicks[0], playerClicks[1], gs.board)
                    print(move.getChessNotation())
                    gs.makeMove(move)
                    sqSelected = ()
                    playerClicks = []

        drawGameState(screen, gs)
        #clock.tick(MAX_FPS)
        py.display.flip()


'''
Responsible for all the graphics within a current game state
'''


def drawGameState(screen, gs):
    drawBoard(screen)  # draw square on te board
    # add in piece highlighting or move suggestions (later)
    drawPieces(screen, gs.board)  # draw pieces on top of those squares


'''
Draw the squares on the board
'''

def drawBoard(screen):

    colors = [py.Color("white"), py.Color("gray")]
    for r in range(DIMENSION):
        for c in range(DIMENSION):
            color = colors[((r+c) % 2)]
            py.draw.rect(screen, color, py.Rect(c*SQ_SIZE, r*SQ_SIZE, SQ_SIZE, SQ_SIZE))

    '''
    gs = ChessEngine.GameState()
    for row_nb, row in enumerate(gs.board):  # for every row of the map...
        for col_nb, tile in enumerate(row):
            if tile == "bR":
                tileImage = wall
            else:
                tileImage = grass
            cart_x = row_nb * TILEWIDTH_HALF
            cart_y = col_nb * TILEHEIGHT_HALF
            iso_x = (cart_x - cart_y)
            iso_y = (cart_x + cart_y) / 2
            centered_x = screen.get_rect().centerx + iso_x
            centered_y = screen.get_rect().centery / 2 + iso_y
            screen.blit(tileImage, (centered_x, centered_y))  # display the actual tile
    '''
'''
Draw the pieces on the board using the current GameState.board
'''


def drawPieces(screen, board):
    for r in range(DIMENSION):
        for c in range(DIMENSION):
            piece = board[r][c]
            if piece != '--':
                screen.blit(IMAGES[piece], py.Rect(c * SQ_SIZE, r * SQ_SIZE, SQ_SIZE, SQ_SIZE))


if __name__ == "__main__":
    main()

main()
