export class Car {
    id: String;
    modelo: String;
    ano: Number;
    preco: Number;
    cor: String;
    descricao: String;
    imagem: String;
    vendido: Boolean;
    author: {
        id: String,
        username: String,            
    };
    createdAt: String;
    updatedAt: String;
}
