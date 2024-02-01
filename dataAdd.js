import {WFS} from 'ol/format';

export default class useWfs{
   constructor(feature){
       this.feature = feature//传入要增删改的图层数据
   }
   
    //添加图层到数据库和服务器
    wfsAdd() {
        let WFSTSerializer = new WFS();
        let featObject = WFSTSerializer.writeTransaction([this.feature],
            null, null, {
            featureType: 'TestLoading:testgeoserverwfs',
            featurePrefix: 'TestLoading',
            featureNS: 'https://xxx/geoserver/TestLoading',
            srsName: 'EPSG:4326'
        });
        //创建请求
        let serializer = new XMLSerializer();
        let featString = serializer.serializeToString(featObject);
        let request = new XMLHttpRequest();
        //发送请求
        this.wfsSend(request,featString)
    }

    //删除数据
    wfsDelete() {
        let WFSTSerializer = new WFS();
        let featObject = WFSTSerializer.writeTransaction(null,
            null, [this.feature], {
            featureType: 'TestLoading:testgeoserverwfs',//图层名
            featurePrefix: 'TestLoading',
            featureNS: 'https://xxx/geoserver/TestLoading',//命名空间uri
            srsName: 'EPSG:4326'
        });
        //创建请求
        let serializer = new XMLSerializer();
        let featString = serializer.serializeToString(featObject);
        let request = new XMLHttpRequest();
        this.wfsSend(request,featString)
    }

    //修改数据
    wfsModify() {
        let WFSTSerializer = new WFS();
        let featObject = WFSTSerializer.writeTransaction(null,
            [this.feature], null, {
            featureType: 'TestLoading:testgeoserverwfs',
            featurePrefix: 'TestLoading:testgeoserverwfs',
            featureNS: 'https://xxx/geoserver/TestLoading',
            srsName: 'EPSG:4326'
        });
        //创建请求
        let serializer = new XMLSerializer();
        let featString = serializer.serializeToString(featObject);
        let request = new XMLHttpRequest();
        this.wfsSend(request, featString)
    }

//发送数据请求  
    wfsSend(request, featString) {
        console.time('aaa')
        request.open('POST', 'https://xxx/geoserver/TestLoading/ows?');
        request.setRequestHeader('Content-Type', 'text/xml');
        request.send(featString);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText);
            }
        }
        console.timeEnd('aaa')
    }
}