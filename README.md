# Собственная реализация блока
### Задача: используя Event Bus, proxy-объекты и теорию данного курса, реализуйте базовый класс для работы с блоком.

Блок должен:

- Содержать жизненный цикл на основе Event Bus с методами:
    - `init` — создание обёртки DOM-элемента и вызов CDM. Название события: `init`,
    - `componentDidMount` — эмитится через метод `dispatchComponentDidMount` снаружи блока. Название события: `flow:component-did-mount`,
    - `componentDidUpdate` — эмитится через Event Bus после изменения пропсов блока. Если пропсы не поменялись, перерендер не нужен, если явно не переопределён в классе блока такой метод. Метод должен вернуть значение `boolean`. Если `true` — компоненту нужно перерендерить, если `false` — не нужно. Название события: `flow:component-did-update`,
    - `render` — получение уже готовой разметки со всеми значениями. Всегда делается рендер строки. Название события: `flow:render`. В первый раз должен быть вызван после `init`, затем после обновлений.

- Предоставлять методы, показывающие и скрывающие блок:
    - `show` — делает значение `display` равным `block`,
    - `hide` — делает значение `display` равным `none`.

- Создавать «обёртку» с указанным тегом в конструкторе.

- Перерисовываться при изменении пропсов через Proxy.

- Выкидывать ошибку «нет доступа» при попытке удалить свойства в `props` блока.