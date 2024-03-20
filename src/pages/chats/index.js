import { ListChats, Layout } from "./components";

const data = [
    {
        id: 5,
        avatar: { size: 'medium', image: '' },
        name: 'John Doe',
        date: 'Su',
        message: 'Чекаво? Вася!',
        count: '9+',
    },
    {
        id: 7,
        avatar: { size: 'medium', image: '' },
        name: 'Samanta Smith',
        date: '10:59',
        message: 'Алло, на!',
        count: '7',
    },
]

export class PageChats extends Layout {
    constructor() {
        super({
            listChats: new ListChats({
                items: data,
            }),
        })
    }
};