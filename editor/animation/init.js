//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {

        function identifyBlockCanvas(dom, dataInp){

            const cellSize = 40,
                [h, w] = [4, 4],
                size = h*w,
                zx = 10 + (w <= 5 ? cellSize * ((6 - w) / 2) : 0),
                zy = 10,
                fullSizeX = 10 * 2 + cellSize * (w <= 5 ? 6 : w),
                fullSizeY = zy * 2 + cellSize * h + 20;

            const color = {
                dark: "#294270",
                erase: "#DFE8F7",
                orange: "#FABA00",
                blue: "#8FC7ED",
            };

            const attr = {
                rect: {
                    'stroke': color.dark,
                    'stroke-width': 1
                },
                rect2: {
                    'stroke': color.dark,
                    'stroke-width': 3
                },
                text: {
                    'stroke': color.dark,
                    'font-size': 16, 
                    'font-family': "Verdana"
                },
            };

            // draw cell & text
            const paper = Raphael(dom, fullSizeX, fullSizeY, 0, 0);
            var cell_dic = paper.set();
            for (var i = 0; i < h; i+=1) {
                for (var j = 0; j < w; j+=1) {
                    // cell
                    const number = i*w+j+1;
                    cell_dic[number]
                        = paper.rect(zx + j * cellSize,
                            zy + i * cellSize,
                            cellSize,
                            cellSize).attr(attr.rect).attr("fill",
                                dataInp[0].indexOf(number) > -1 ?
                                color.orange: color.erase);
                    // text
                    paper.text(zx + j * cellSize + cellSize / 2,
                        zy + i * cellSize + cellSize / 2,
                        i*4+j+1
                    ).attr(attr.text);
                }
            }
            
            function createLinePath(x1, y1, x2, y2) {
                return "M" + x1 + "," + y1 + "L" + x2 + "," + y2;
            }

            // districts checking
            var an_lines = paper.set();

            dataInp[0].forEach(n=>{
                const o = cell_dic[n].attr(); 
                if (dataInp[0].indexOf(n-w) < 0 || n < w) {
                    paper.path(createLinePath(
                        o.x, 
                        o.y, 
                        o.x + o.width, 
                        o.y 
                    )).attr(attr.rect2);
                }
                if (dataInp[0].indexOf(n+w) < 0) {
                    paper.path(createLinePath(
                        o.x, 
                        o.y + o.height, 
                        o.x + o.width, 
                        o.y + o.height 
                    )).attr(attr.rect2);
                }
                if (dataInp[0].indexOf(n+1) < 0 || n % w === 0) {
                    paper.path(createLinePath(
                        o.x + o.width, 
                        o.y, 
                        o.x + o.width, 
                        o.y + o.height 
                    )).attr(attr.rect2);
                }
                if (dataInp[0].indexOf(n-1) < 0 || n % w === 1) {
                    paper.path(createLinePath(
                        o.x, 
                        o.y, 
                        o.x, 
                        o.y + o.height 
                    )).attr(attr.rect2);
                }
            });
        }

        var $tryit;
        var io = new extIO({
            multipleArguments: true,
            functions: {
                js: 'identifyBlock',
                python: 'identify_block'
            },
            animation: function($expl, data){
                identifyBlockCanvas( $expl[0], data.in);
            }
        });
        io.start();
    }
);
