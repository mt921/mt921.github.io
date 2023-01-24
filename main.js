function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function update_colour(num, R,G,B){
    if (num===1){
        document.getElementById("colour1").style.backgroundColor = 'rgb('+ R + ',' + G + "," + B +')';
    }
    if (num===2){
        document.getElementById("colour2").style.backgroundColor = 'rgb('+ R + ',' + G + "," + B +')';
    }
    if (num===3){
        document.getElementById("colour3").style.backgroundColor = 'rgb('+ R + ',' + G + "," + B +')';
    }
    if (num===4){
        document.getElementById("colour4").style.backgroundColor = 'rgb('+ R + ',' + G + "," + B +')';
    }
    if (num===5){
        document.getElementById("colour5").style.backgroundColor = 'rgb('+ R + ',' + G + "," + B +')';
    }
}

function generate_colour(R,G,B,V){
    let R_OUT = R + getRandomInt(-V,V);
    let G_OUT = G + getRandomInt(-V,V);
    let B_OUT = B + getRandomInt(-V,V);
    return [R_OUT,G_OUT,B_OUT];
}

function generate_display(num,R,G,B,V){
    V = parseInt(V);
    R = parseInt(R);
    G = parseInt(G);
    B = parseInt(B);
    let colour = generate_colour(R,G,B,V);
    R = colour[0];
    G = colour[1];
    B = colour[2];
    update_colour(num,R,G,B);
}

function update(){
    let R = document.getElementById("red").value;
    let G = document.getElementById("green").value;
    let B = document.getElementById("blue").value;
    let V = document.getElementById("variability").value;
    document.body.style.backgroundColor = 'rgb('+ R + ',' + G + "," + B +')';
    generate_display(1,R,G,B,V);
    generate_display(2,R,G,B,V);
    generate_display(3,R,G,B,V);
    generate_display(4,R,G,B,V);
    generate_display(5,R,G,B,V);
}
