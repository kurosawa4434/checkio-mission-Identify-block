"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""
from random import choice
from numpy import array, rot90
BLOCKS = {
    'T': {(0, 0), (0, 1), (0, 2), (1, 1)},
    'I': {(0, 0), (1, 0), (2, 0), (3, 0)},
    'O': {(0, 0), (0, 1), (1, 0), (1, 1)},
    'L': {(0, 0), (1, 0), (2, 0), (2, 1)},
    'J': {(0, 1), (1, 1), (2, 0), (2, 1)},
    'S': {(0, 1), (0, 2), (1, 0), (1, 1)},
    'Z': {(0, 0), (0, 1), (1, 1), (1, 2)},
}

def random_block():

    while True:
        num = choice(range(16))
        num_yx = ((num)//4, (num)%4)
        shape = choice(['I', 'J', 'L', 'O', 'S', 'T', 'Z'])
        dr = choice(range(4))

        def co(grid):
            xys = []
            for y, row in enumerate(grid):
                for x, v in enumerate(row):
                    if v:
                        xys.append((y, x))
            return xys

        grid = []
        for y in range(4):
            grid.append([int((y, x) in BLOCKS[shape]) for x in range(4)])

        xys = co(rot90(grid, dr))
        for f in range(4):
            dif = (num_yx[0]-xys[f][0], num_yx[1]-xys[f][1])
            new_xys = [(xys[i][0]+dif[0], xys[i][1]+dif[1])
                    for i in range(4)]
            if all(0 <= ny <= 3 and 0 <= nx <= 3 for ny, nx in new_xys):
                return {'input': [[y*4+x+1 for y, x in new_xys]],
                        'answer': shape}

rand_tests = []
wk_numbers = []
for _ in range(10):
    while True:
        rs = random_block()
        if set(*rs['input']) not in wk_numbers:
            rand_tests.append(rs)
            wk_numbers.append(frozenset(*rs['input']))
            break

TESTS = {
    "Basics": [
        {
            "input": [[10, 13, 14, 15]],
            "answer": 'T',
        },
        {
            "input": [[1, 5, 9, 6]],
            "answer": 'T',
        },
        {
            "input": [[2, 3, 7, 11]],
            "answer": 'L',
        },
        {
            "input": [[4, 8, 12, 16]],
            "answer": 'I',
        },
        {
            "input": [[3, 1, 5, 8]],
            "answer": None,
        },
        {
            "input": [[3, 4, 7, 8]],
            "answer": 'O',
        },
        {
            "input": [[6, 10, 11, 15]],
            "answer": 'S',
        },
        {
            "input": [[7, 6, 10, 14]],
            "answer": 'J',
        },
        {
            "input": [[3, 6, 7, 10]],
            "answer": 'Z',
        },
    ],
    "Randoms": rand_tests,
    "Edges": [
        {
            "input": [[1, 4, 13, 16]],
            "answer": None,
        },
        {
            "input": [[2, 6, 11, 15]],
            "answer": None,
        },
        {
            "input": [[5, 8, 9, 12]],
            "answer": None,
        },
    ],
}
