
export function matmul(mA:number[][], mB:number[][]){
    let R = mA.length;
    let C = mA[0].length;
    let output = new Array(R).fill(0).map(() => new Array(C).fill(0));

    for(let i=0; i<R; i++){
        for(let j=0; j<C; j++){
            for(let k=0; k<R; k++){
                output[i][j] += mA[i][k] * mB[k][j];
            }
        }
    }
    return output;
}

export function dot(vA:number[], vB:number[]){
    let output = 0;
    for(let i=0; i<vA.length; i++){
        output += vA[i] * vB[i];
    }
    return output;
}

export function transpose(matrix:number[][]){
    let R = matrix.length;
    let C = matrix[0].length;
    let output = new Array(C).fill(0).map(() => new Array(R).fill(0));

    for(let i=0; i<R; i++){
        for(let j=0; j<C; j++){
            output[j][i] = matrix[i][j];
        }
    }
    return output;
}
