import Room from './classes/Room';
import Model from './classes/Model';
import InfoModel from './classes/InfoModel';
import {showModelInformation, showFloorInformation, showRoomInformation} from '../WebGLGetData';
import Building from './classes/Building';
import {infoModel} from '../WebGLOutput';

//Script
function scriptInit(name) {
    return new Promise(resolve => {
        const cached = infoModel.findStructures(struct => struct.src === name);
        if (!cached) {
            fetch('http://backend/scriptLoader.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "file=" + name
            }).then(res => res.text()).then(res => {
                    console.log(name);
                    // eslint-disable-next-line
                    const script = Function(res)();
                    const args = getArgs(script);
                    const deps = args.map(arg => {
                        switch (arg) {
                            case 'Room': return Room;
                            case 'Building': return Building;
                            case 'toVector': return InfoModel.toVector;
                            case 'showModelInformation': return showModelInformation;
                            case 'showFloorInformation': return showFloorInformation;
                            case 'showRoomInformation': return showRoomInformation;
                            case 'infoModel': return infoModel;
                            case 'toStructure': return InfoModel.toStructure;
                            case 'Model': return Model;
                            default: return null;
                        }
                    })        
                    script(...deps).then(res => {
                        res.prev = infoModel.getCurrent();
                        res.src = name;
                        infoModel.addStructure(res);
                        resolve(res)
                    });
            })
        } else {
            console.log('cached');
            cached.src = name;
            resolve(cached);
        }
    }) 
}

function getArgs(func) {
    var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
    return args.split(',').map(function(arg) {
      return arg.replace(/\/\*.*\*\//, '').trim();
    }).filter(function(arg) {
      return arg;
    });
  }

export default scriptInit;