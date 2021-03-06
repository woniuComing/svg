function DrawSVG(circleID1, circleID2, lineID1, lineID2, BGid, preNumID, showLine, num3, showShadow = false, showBlackbg = false) {
    // console.log('绘制的圆环数值：',num3);
    var circle1: any = document.getElementById(circleID1);
    var circle2: any = document.getElementById(circleID2);
    var g2: any = document.getElementById('g2');
    if (showShadow) {
        var shadow: any = document.getElementById('shadow');
        var pointer: any = document.getElementById('pointer');
    }
    // var rotate: any = document.getElementById('rotate_num');
    // var rotate_num: number = 0;
    if (showLine) {
        var lines1: any = document.getElementById(lineID1);
        var lines2: any = document.getElementById(lineID2);
        if (!lines2) return;
        var line1_html: any = '';
        var line2_html: any = '';
        for (var i = 0; i < 22; i++) {
            if (i == 21) {
                line1_html += `<line class='ll' fill="none" stroke="#3a3a3a" stroke-miterlimit="10" stroke-width="2" x1="150" y1="38" x2="150" y2="29" transform='rotate(${i * 6},150,150)'/>`;
                line2_html += '';
            } else {
                if ((i * 6) % 30 === 0) {
                    if (i == 0) {
                        line1_html += `<line class='ll' fill="none" stroke="#3a3a3a" stroke-miterlimit="10" stroke-width="2" x1="150" y1="38" x2="150" y2="29" transform='rotate(${i * 6},150,150)'/>`;
                        line2_html += `<line class='ll' fill="none" stroke="#3a3a3a" stroke-miterlimit="10" x1="150" y1="33" x2="150" y2="29" transform='rotate(${i * 6},150,150)'/>`;
                    } else if (i * 6 == 120) {
                        line1_html += `<line class='ll' fill="none" stroke="#3a3a3a" stroke-miterlimit="10" x1="150" y1="33" x2="150" y2="29" transform='rotate(${i * 6},150,150)'/>`;
                        line2_html += `<line class='ll' fill="none" stroke="#3a3a3a" stroke-miterlimit="10" stroke-width="2" x1="150" y1="38" x2="150" y2="29" transform='rotate(${i * 6},150,150)'/>`;
                    } else {
                        line1_html += `<line class='ll' fill="none" stroke="#3a3a3a" stroke-miterlimit="10" stroke-width="2" x1="150" y1="38" x2="150" y2="29" transform='rotate(${i * 6},150,150)'/>`;
                        line2_html += `<line class='ll' fill="none" stroke="#3a3a3a" stroke-miterlimit="10" stroke-width="2" x1="150" y1="38" x2="150" y2="29" transform='rotate(${i * 6},150,150)'/>`;
                    }
                } else {
                    line1_html += `<line class='ll' fill="none" stroke="#3a3a3a" stroke-miterlimit="10" x1="150" y1="33" x2="150" y2="29" transform='rotate(${i * 6},150,150)'/>`;
                    line2_html += `<line class='ll' fill="none" stroke="#3a3a3a" stroke-miterlimit="10" x1="150" y1="33" x2="150" y2="29" transform='rotate(${i * 6},150,150)'/>`;
                }
            }
        }
        if (line1_html && lines1) {
            lines1.innerHTML = line1_html;
        }
        if (line2_html && lines2) {
            lines2.innerHTML = line2_html;
        }
    }

    var bg_ring: any = document.getElementById(BGid);
    var black_bg: any = document.getElementById('blackBg');
    if (bg_ring) {
        var radius: any = bg_ring.getAttribute('r');
    }

    var num: number = 0;
    var aa: any = document.getElementById(preNumID);
    if (aa) {
        let result = aa.innerHTML;
        // console.log(result);
        // let results = result.split('<');
        // console.log(result);
        num = Number(result) || 0;
    }
    //计算圆的周长
    const perimeter: number = Math.round(2 * Math.PI * radius);
    if (bg_ring) {
        //绘制的是252度的圆环，也就是7/10的圆环。360 * 0.7 = 252;
        //从周长部分开始；
        bg_ring.setAttribute('stroke-dasharray', perimeter);
        //到0.3的部分停止，也就是绘制了0.7个周长；
        bg_ring.setAttribute('stroke-dashoffset', (perimeter / 10) * 3);
       
    }
    if (showBlackbg) {
        console.log('perimeter', radius, perimeter, (perimeter / 10) * 3);
        black_bg.setAttribute('stroke-dasharray', perimeter);
        black_bg.setAttribute('stroke-dashoffset', (perimeter / 10) * 3);
    }
    circle2.setAttribute('stroke-dasharray', perimeter);
    circle1.setAttribute('stroke-dasharray', perimeter);
    //252度分成一百份
    const per: number = perimeter * 0.7 / 100;
    //渐变效果由两个126度的圆环组成；
    var circleInit = function(num) {
        if (num <= 50) {
            //小于50，只走前半环
            circle1.setAttribute('stroke-dashoffset', perimeter - num * per);
            circle2.setAttribute('stroke-dashoffset', perimeter);
        } else {
            //大于50，前半环走50，后半环走剩余的部分，记得css部分要把后半环的给旋转过去
            const num2: number = num - 50;
            circle1.setAttribute('stroke-dashoffset', perimeter - 50 * per);
            circle2.setAttribute('stroke-dashoffset', perimeter - num2 * per);
        }
    };

    function draw() {
        //获取初始大小
        if (num3 === num) {
            circleInit(num);
            if (showShadow) {
                drawShadow(num)
            };
            // g2.setAttribute('transform', 'rotate(' + num3 * 2.65 + ' 150 150)');
        }
        if (num < num3) {
            window['requestAnimationFrame'](draw);
            circleInit(num);
            num += 1;
            if (showShadow) {
                drawShadow(num)
            };
            // g2.setAttribute('transform', 'rotate(' + num * 2.65 + ' 150 150)');
            // g2.style.transform = `rotate(${num*2.60}deg)`;
        } else if (num > num3) {
            window['requestAnimationFrame'](draw);
            circleInit(num);
            num -= 1;
            if (showShadow) {
                drawShadow(num)
            };
            // g2.setAttribute('transform', 'rotate(' + num * 2.65 + ' 150 150)');
        }


    }

    function drawShadow(num) {
        var starttangle = 0;
        var endangle = (2.52 * num) / 360 * Math.PI * 2;
        var cx = 74; //圆心位置
        var cy = 74;
        var r = 73; //圆半径
        var x1 = cx + r * Math.sin(0);
        var y1 = cy - r * Math.cos(0);
        var x2 = cx + r * Math.sin(endangle);
        var y2 = cy - r * Math.cos(endangle);
        //角度大于半圆
        var big = 0;
        if (endangle - starttangle > Math.PI) big = 1;
        // var path = document.createElementNS(svgns, "path");
        //路径信息
        var d = 'M ' + cx + ',' + cy + //从圆心开始
            ' L ' + x1 + ',' + y1 + //画一条到(x1,y1)的线段
            ' A ' + r + ',' + r + //再画一条半径为r的弧
            ' 0 ' + big + ' 1 ' + // 弧的详细信息
            x2 + ',' + y2 + //弧到(x2,y2)结束
            ' Z'; //d当前路径到(cx,cy)结束
        if (shadow) {
            shadow.setAttribute('d', d); //设置路径
        }
        if (pointer) {
            pointer.setAttribute('transform', 'rotate(' + num * 2.52 + ',100,100)');
        }
    }
    window['requestAnimationFrame'](draw);
}
export default DrawSVG;