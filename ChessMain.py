import pygame as py
import ChessEngine

TILEWIDTH = 64  # holds the tile width and height
TILEHEIGHT = 64
TILEHEIGHT_HALF = TILEHEIGHT / 2
TILEWIDTH_HALF = TILEWIDTH / 2
WIDTH = HEIGHT = 512

DIMENSION = 8  # dimensions of a chess board are 8x8
SQ_SIZE = HEIGHT // DIMENSION
MAX_FPS = 15  # for animations
IMAGES = {}


def loadImages():
    pieces = ['wp', 'wR', 'wN', 'wB', 'wK', 'wQ', 'bp', 'bR', 'bR', 'bN', 'bB', 'bK', 'bQ']
    for piece in pieces:
        IMAGES[piece] = py.transform.scale(py.image.load("images/" + piece + ".png"), (SQ_SIZE, SQ_SIZE))


def drawText(screen, text):
    font = py.font.SysFont("Helvitca", 32, True, False)
    textObject = font.render(text, 0, py.Color('Black'))
    textLocation = py.Rect(0, 0, WIDTH, HEIGHT).move(WIDTH / 2 - textObject.get_width() / 2,
                                                     HEIGHT / 2 - textObject.get_height() / 2)
    screen.blit(textObject, textLocation)
    textObject = font.render(text, 0, py.Color('Gray'))
    screen.blit(textObject, textLocation.move(2, 2))


'''
Handle user input and updating the graphics
'''


def main():
    py.init()
    screen = py.display.set_mode((WIDTH, HEIGHT))
    clock = py.time.Clock()
    # py.time.Clock().tick(MAX_FPS)
    screen.fill(py.Color("White"))
    gs = ChessEngine.GameState()
    validMoves = gs.getValidMoves()
    moveMade = False  # flag variable for when a move is made
    animate = False
    loadImages()  # only once
    running = True
    sqSelected = ()  # row, col
    playerClicks = []
    gameOver = False
    while running:
        for e in py.event.get():
            if e.type == py.QUIT:
                running = False
            elif e.type == py.MOUSEBUTTONDOWN:
                if not gameOver:
                    location = py.mouse.get_pos()  # x and y postion of mouse
                    col = location[0] // SQ_SIZE  # divide without remainder
                    row = location[1] // SQ_SIZE
                    if sqSelected == (row, col):  # the same square clicked twice
                        sqSelected = ()  # noone
                        playerClicks = []
                    else:
                        sqSelected = (row, col)
                        playerClicks.append(sqSelected)
                    if len(playerClicks) == 2:  # moving pawns
                        move = ChessEngine.Move(playerClicks[0], playerClicks[1], gs.board)
                        print(move.getChessNotation())
                        for i in range(len(validMoves)):
                            if move == validMoves[i]:
                                gs.makeMove(validMoves[i])
                                moveMade = True
                                animate = True
                                sqSelected = ()  # reset user clicks
                                playerClicks = []
                        if not moveMade:
                            playerClicks = [sqSelected]
            # key handlerrs
            elif e.type == py.KEYDOWN:
                if e.key == py.K_z:  # undo whhen 'z' is pressed
                    gs.undoMove()
                    moveMade = True
                    animate = False
                if e.key == py.K_r:  # reset board
                    gs = ChessEngine.GameState()
                    validMoves = gs.getValidMoves()
                    sqSelected = ()
                    playerClicks = []
                    moveMade = False
                    animate = False

        if moveMade:
            if animate:
                animateMove(gs.moveLog[-1], screen, gs.board, clock)
            validMoves = gs.getValidMoves()
            moveMade = False
            animate = False

        drawGameState(screen, gs, validMoves, sqSelected)
        # clock.tick(MAX_FPS)

        if gs.checkMate:
            gameOver = True
            if gs.whiteToMove:
                drawText(screen, 'Czarne wygrały')
            else:
                drawText(screen, 'Białe wygrały')
        elif gs.staleMate:
            gameOver = True
            drawText(screen, 'Remis')

        py.time.Clock().tick(60)
        py.display.flip()


'''
Highlight square selected and moves for piece selected
'''


def highlightSquares(screen, gs, validMoves, sqSelected):
    if sqSelected != ():
        r, c = sqSelected
        if gs.board[r][c][0] == ('w' if gs.whiteToMove else 'b'):  # sqSelected is a piec that can be moved
            # highlight selected square
            s = py.Surface((SQ_SIZE, SQ_SIZE))
            s.set_alpha(100)  # transparency value
            s.fill(py.Color('blue'))
            screen.blit(s, (c * SQ_SIZE, r * SQ_SIZE))
            # highlight moves form that square
            s.fill(py.Color('yellow'))
            for move in validMoves:
                if move.startRow == r and move.startCol == c:
                    screen.blit(s, (move.endCol*SQ_SIZE, move.endRow*SQ_SIZE))


'''
Responsible for all the graphics within a current game state
'''


def drawGameState(screen, gs, validMoves, sqSelected):
    drawBoard(screen)  # draw square on te board
    highlightSquares(screen, gs, validMoves, sqSelected)
    drawPieces(screen, gs.board)  # draw pieces on top of those squares


'''
Draw the squares on the board
'''


def drawBoard(screen):
    global colors
    colors = [py.Color(235, 235, 208), py.Color(119, 148, 85)]
    for r in range(DIMENSION):
        for c in range(DIMENSION):
            color = colors[((r + c) % 2)]
            py.draw.rect(screen, color, py.Rect(c * SQ_SIZE, r * SQ_SIZE, SQ_SIZE, SQ_SIZE))

'''
Draw the pieces on the board using the current GameState.board
'''


def drawPieces(screen, board):
    for r in range(DIMENSION):
        for c in range(DIMENSION):
            piece = board[r][c]
            if piece != '--':
                screen.blit(IMAGES[piece], py.Rect(c * SQ_SIZE, r * SQ_SIZE, SQ_SIZE, SQ_SIZE))


'''
Animating a move
'''


def animateMove(move, screen, board, clock):
    global colors
    coords = []  # list of coord thhat the animation will move through
    dR = move.endRow - move.startRow
    dC = move.endCol - move.startCol
    framesPerSquare = 10  # frames to move one square
    frameCount = (abs(dR) + abs(dC)) * framesPerSquare
    for frame in range(frameCount + 1):
        r, c = (move.startRow + dR * frame / frameCount, move.startCol + dC * frame / frameCount)
        drawBoard(screen)
        drawPieces(screen, board)
        # erase the piece move from thhis ending square
        color = colors[(move.endRow + move.endCol) % 2]
        endSquare = py.Rect(move.endCol * SQ_SIZE, move.endRow * SQ_SIZE, SQ_SIZE, SQ_SIZE)
        py.draw.rect(screen, color, endSquare)
        # draw captured piece onto rectangle
        if move.pieceCaptured != '--':
            screen.blit(IMAGES[move.pieceCaptured], endSquare)
        # draw moving piece
        screen.blit(IMAGES[move.pieceMoved], py.Rect(c * SQ_SIZE, r * SQ_SIZE, SQ_SIZE, SQ_SIZE))
        py.display.flip()
        py.time.Clock().tick(60)


if __name__ == "__main__":
    main()
