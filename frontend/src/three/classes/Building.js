import Structure from './Structure';

class Building extends Structure {
    constructor(sizeVector, posVector, color, opacity, options) {
        super(sizeVector, posVector, color, opacity, options);

        this._box = this.drawBox(sizeVector, posVector, color, opacity);
        this.addObject(this._box);

        this._windowsCount1 = this._options.windowsCount1 ?? 0;
        this._windowsCount2 = this._options.windowsCount2 ?? 0;
        this._windowsCount3 = this._options.windowsCount3 ?? 0;
        this._windowsCount4 = this._options.windowsCount4 ?? 0;

        this._windowWidth = this._options.windowWidth ?? ((this._size.x > this._size.y) ? this._size.y / 4 : this._size.x / 4);
        this._windowHeight = this._options.windowHeight ?? this._size.z / 1.5;
        this._windowsTop = this._options.windowsTop ?? 0;

        this._drawBuildingWindows(this._windowsCount1, 1);
        this._drawBuildingWindows(this._windowsCount2, 2);
        this._drawBuildingWindows(this._windowsCount3, 3);
        this._drawBuildingWindows(this._windowsCount4, 4);

        this._outline = [this._box, this._windows, this._doors];

        if (this._events) {
            this._setHighlight();
            this._setInteraction();
            for (let eventName in this._events) {
                let handler = this._events[eventName];
                if (handler) {
                    this._interactionCube.cursor = 'pointer';
                    this._interactionCube.on(eventName, (event) => handler(event));
                }
            }
        }
    }

    _drawBuildingWindows(count, wallID) {
        const size = this.getSize();
        let between;
        if (wallID === 1 || wallID === 3) {
            between = (size.y - count * this._windowWidth) / (count + 1);
        } else if (wallID === 2 || wallID === 4) {
            between = (size.x - count * this._windowWidth) / (count + 1);
        } else {
            console.error('wrong wallID value');
            return undefined;
        }
        
        const pos = between;
        for (let i = 0; i < count; i++) {
            this.drawWindow(this._windowWidth, this._windowHeight, pos + i * (between + this._windowWidth), (size.z / 2) - (this._windowHeight / 2) + this._windowsTop, wallID);
        }
    }
}

export default Building