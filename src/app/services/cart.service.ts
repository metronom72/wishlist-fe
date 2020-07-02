import { IProduct } from './../common/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart: IProduct[] = [
    {
      category: 48531,
      id: 1,
      name: '100 рублей 1898 года Коншин',
      prices: [3000, 4000],
      subHeader: 'lorem ipsum dolor sit amet',
      description: 'отличное пополнение Вашей коллекции',
      photos: [
        'https://d.radikal.ru/d31/1909/b0/7d66ac650f9b.jpg',
        'https://a.radikal.ru/a19/1909/ac/67bddd0eb156.jpg',
      ],
    },
    {
      category: 48531,
      id: 2,
      name: '1 рубль 1898 года Шипов-Шмидт aUNC ',
      prices: [3000, 4000],
      subHeader: 'lorem ipsum dolor sit amet',
      description: 'отличное пополнение Вашей коллекции',
      photos: [
        'https://d.radikal.ru/d18/1712/4d/7bb49fcac59e.jpg',
        'https://a.radikal.ru/a12/1712/5d/aa0c8176dc65.jpg',
        'https://d.radikal.ru/d18/1712/4d/7bb49fcac59e.jpg',
        'https://a.radikal.ru/a12/1712/5d/aa0c8176dc65.jpg',
        'https://d.radikal.ru/d18/1712/4d/7bb49fcac59e.jpg',
        'https://a.radikal.ru/a12/1712/5d/aa0c8176dc65.jpg',
        'https://d.radikal.ru/d18/1712/4d/7bb49fcac59e.jpg',
        'https://a.radikal.ru/a12/1712/5d/aa0c8176dc65.jpg',
        'https://d.radikal.ru/d18/1712/4d/7bb49fcac59e.jpg',
        'https://a.radikal.ru/a12/1712/5d/aa0c8176dc65.jpg',
      ],
    },
    {
      category: 48531,
      id: 3,
      name: '1898 г. 1 рубль Тимашев-Трофимов RARE   ',
      prices: [3000, 4000],
      subHeader: 'lorem ipsum dolor sit amet',
      description: 'отличное пополнение Вашей коллекции',
      photos: [
        'http://s019.radikal.ru/i601/1712/bf/354c91395da3.jpg',
        'http://s015.radikal.ru/i333/1712/31/948f3138be9d.jpg',
      ],
    },
    {
      category: 48531,
      id: 4,
      name: '1898 г. 1 рубль НВ-462 Ев.Гейльман UNC',
      prices: [3000, 4000],
      subHeader: 'lorem ipsum dolor sit amet',
      description: 'отличное пополнение Вашей коллекции',
      photos: [
        'http://s018.radikal.ru/i527/1708/1e/52c8052d2f7a.jpg',
        'http://s019.radikal.ru/i630/1708/48/7bc02fd36134.jpg',
      ],
    },
  ];

  public addProductToCart = (product: IProduct) => {
    this.cart.push(product);
  };

  public removProductFromCart = (id: number) => {
    this.cart = this.cart.filter((product) => product.id !== id);
  };

  public getProductCount = (id: number) => {
    return this.cart.filter((product: IProduct) => product.id === id).length;
  };

  public getTotalPrice = this.cart.reduce(
    (accum, item) => accum + item.prices[0],
    0
  );

  constructor() {}
}
