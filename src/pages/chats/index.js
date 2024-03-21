import { Layout } from "./components";

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
    {
        id: 150,
        avatar: { size: 'medium', image: '' },
        name: 'Zombak',
        date: 'Tu',
        message: 'Ha-Ha-ha!!',
        count: '1',
    },
    {
        id: 256,
        avatar: { size: 'medium', image: '' },
        name: 'Imperor',
        date: '21:03',
        message: 'Алло, на!',
        count: '4',
    },
    {
        id: 150,
        avatar: { size: 'medium', image: '' },
    },
    {
        id: 255,
        avatar: { size: 'medium', image: '' },
        name: 'Kornelius Vander Disappointovichev',
    },
    {
        id: 256,
        avatar: { size: 'medium', image: '' },
        name: 'Kornelius Vander Disappointovichev',
        date: '22 Feb 2022',
        message: 'Lorem, quas ab similique quia pere culpa kufnsk su veniam accusantium.',
        count: '4',
    },
    {
        id: 257,
        avatar: { size: 'medium', image: '' },
        name: 'Kornelius Vander Disappointovichev',
        message: 'Lorem, quas ab similique quia pere culpa kufnsk su veniam accusantium.',
    },
    {
        id: 14313,
        avatar: { size: 'medium', image: '' },
        name: 'Тимур',
    },
    {
        id: 13,
        avatar: { size: 'medium', image: '' },
        name: 'Imperor',
        date: '8 March',
        message: 'Алло, на!',
    },
]

export class PageChats extends Layout {
    constructor(props) {
        super({ data, ...props })
    }
};