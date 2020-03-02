import './sass/business-car.scss';
import $ from 'jquery';
import './vendors/flexslider';
import {getQueryString, notNull} from './utils/urlFilter'
import api from './fetch/api';
import './vendors/loading'
import {operateNav, loadingAnimate, removeLoading} from './utils/urlFilter';

import './img/bc_01.jpg';
import './img/bc_02.jpg';
import './img/bc_03.jpg';
import './img/bc_04.jpg';
import './img/bc_05.jpg';
import './img/bc_06.jpg';
import './img/bc_07.jpg';
import './img/bc_08.jpg';
import './img/bc_09.jpg';
import './img/bc_10.jpg';
import './img/bc_11.jpg';
import './img/ad_01.jpg';
import './img/ad_02.jpg';
import './img/bm_01.jpg';
import './img/bm_02.jpg';
import './img/bm_03.jpg';
import './img/bm_04.jpg';
import './img/fen_01.jpg';
import './img/fen_02.jpg';
import './img/fen_03.jpg';
import './img/fen_04.jpg';
import './img/fen_05.jpg';
import './img/fen_06.jpg';
import './img/fen_07.jpg';
import './img/fen_08.jpg';
import './img/ft_01.jpg';
import './img/ft_02.jpg';
import './img/lf_01.jpg';
import './img/lf_02.jpg';
import './img/lf_03.jpg';
import './img/lk_01.jpg';
import './img/lk_02.jpg';
import './img/dz_01.jpg';
import './img/dz_02.jpg';
(function ($) {

  let carLogoArr = [
    {
      icon: 'icon-benchi',
      title: '奔驰',
      brands: [
        {
          name: '奔驰GLC',
          imgs: [
            { src: './img/bc_01.jpg',
              desc: {
                name: '奔驰标准版',
                year: '',
                volume: '',
                opera: '',
                info: '2.0T,9速，四驱，19轮，行李架，前后雷达，倒车影像，卤素灯，电尾门，一键启动，真皮座椅带记忆，电动调节带腿拖，腰部支撑，换挡拨片，实木内饰，隐私玻璃，定速巡航，三色氛围灯，二排座椅一键放倒，外后视镜电动折叠，蓝牙，注意力辅助，驾驶模式选择，带触摸comand系统，中控小屏（可选装led大灯、全景天窗、无钥匙启动）'
              }
            },
            { src: './img/bc_02.jpg',
              desc: {
                name: '奔驰运动版',
                year: '',
                volume: '',
                opera: '',
                info: '2.0T,9速，四驱，行李架，前后雷达，倒车影像，电尾门，一键启动，真皮座椅带记忆，电动调节带腿拖，腰部支撑，换挡拨片，实木内饰，隐私玻璃，定速巡航，三色氛围灯，二排座椅一键放倒，外后视镜电动折叠，蓝牙，注意力辅助，驾驶模式选择，led大灯带随动转向，led日行灯，踏板，20轮，无钥匙进入，镀铬门把手（选装全景天窗、中控大屏、 双拼座椅，运动方向盘）'
              }
            }
          ]
        },
        {
          name: '奔驰GLE400',
          imgs: [
            { src: './img/bc_03.jpg',
              desc: {
                name: '奔驰',
                year: '',
                volume: '',
                opera: '',
                info: '3.0T v6发动机，9速变速箱，四驱，LED大灯,AMG 运动外观包,电动座椅带记忆，腰部支撑调节,哈曼音响，隐私玻璃，氛围灯，无钥匙启动,电动尾门，实木内饰，盲点辅助，主动制动辅助，注意力辅助，自动车道辅助，内外镜面自动调光，真皮方向盘带拨片，滑动天窗，胎压监测，前后雷达，环车影像，20英寸AMG 轮毂，备胎，carplay，驾驶模式选择，外后视镜电动调节和折叠，踏板，行李架，陡坡缓降、无钥匙进入'
              }
            }
          ]
        },
        {
          name: '奔驰GLS400',
          imgs: [
            { src: './img/bc_04.jpg',
              desc: {
                name: '奔驰',
                year: '',
                volume: '',
                opera: '',
                info: '3.0T,9速，四驱，底升，胎压监测，七座，AMG外观包，21轮，command系统，桃木内饰，哈曼音响，二三排电动，一键启动，全景天窗，LED大灯和日行灯，LED尾灯，真皮座椅带前加热和腰部支撑，座椅记忆，后视镜电动调节，定速巡航，多功能方向盘带拨片，膝部气囊，踏板，行李架，驾驶模式选择，蓝牙，电吸门'
              }
            }
          ]
        },
        {
          name: '奔驰GLS450',
          imgs: [
            { src: './img/bc_05.jpg',
              desc: {
                name: '奔驰豪华包',
                year: '',
                volume: '',
                opera: '',
                info: '（全景天窗、智能卡、一键启动、哈曼卡顿音响、温控杯架、环影 前后雷达、双LED随动转向鹰眼大灯、主副座椅电调带记忆、多轮廓前排按摩座椅、前后座椅加热、二三排电动座椅、后排车窗遮阳帘、电动第三排车窗弹出功能、电吸门、魔术雨刷）运动包（AMG大包围、ADS PLUS车身稳定系统、AMG电镀、运动底盘、21寸AMG运动轮毂）智能辅助驾驶包（雷达测距，自动防碰撞系统，主动盲点监测，车道保持）真皮包裹仪表台、全地形反馈（5种路况模式选择）空气悬挂、底盘升降、新款9速变速箱'
              }
            }
          ]
        },
        {
          name: '奔驰GLS500',
          imgs: [
            { src: './img/bc_06.jpg',
              desc: {
                name: '奔驰 18款墨版',
                year: '',
                volume: '',
                opera: '',
                info: 'GLS500 ，黑棕 ， 4.7TT汽油，7座，9速，全景天窗，真皮座椅、前排电动座椅带记忆、前座椅通风，前后座椅加热、并道辅助、主动泊车辅助、桃木方向盘、车道保持、空气悬挂、环车影像、动态LED大灯、自动远光灯、第二排三排座椅电动可折叠、隐私玻璃、21英寸AMG轮毂、AMG外观套件、智能卡、电动尾门、后排娱乐、脚踏、行李架、室内氛围灯、三区空调 、电吸门 、哈曼音响。'
              }
            }
          ]
        },
        {
          name: '奔驰S450',
          imgs: [
            { src: './img/bc_07.jpg',
              desc: {
                name: '奔驰',
                year: '',
                volume: '',
                opera: '',
                info: '3.0T，V6，9速，全景天窗，360环车影像，电吸门，无钥匙进入，无钥匙启动，电动尾门，18轮，底盘升降，驾驶模式选择，LED大灯日行灯，桃木方向盘带换挡拨片和电动调节，真皮座椅带记忆，前排通风加热，后排座椅电动调节带记忆，64色氛围灯，抬头显示，液晶仪表盘，柏林之声音响，电动尾门，外后视镜电动折叠和防炫目，三区空调，后排遮阳帘，实木内饰，前后排手机无线充电，carplay，胎压监测，交通标示辅助，主动驻车辅助，主动制动辅助，注意力辅助，主动车道保持辅助，主动盲点辅助，转向辅助，ACC'
              }
            }
          ]
        },
        {
          name: '奔驰S560',
          imgs: [
            { src: './img/bc_08.jpg',
              desc: {
                name: '奔驰',
                year: '',
                volume: '4.0升',
                opera: '',
                info: 'V8发动机，463马力，新9速变速箱 金属漆，全景天窗，空气悬挂，柏林之声，智能LED大灯，电吸门，魔术显示屏， 单选20轮 高级包：后排百叶窗，前座椅通风加热，前座椅多项调节，舒适头枕，环影，NAPPA真皮，泊车辅助，空气平衡系统，驾驶疲劳提醒 运动包 运输防护，AMG套间，运动刹车 智能驾驶包 主动驾驶辅助，雷达测距，主动方向盘，并道辅助'
              }
            }
          ]
        },
        {
          name: '奔驰V-class',
          imgs: [
            { src: './img/bc_09.jpg',
              desc: {
                name: '奔驰',
                year: '',
                volume: '',
                opera: '',
                info: '热控制台、折叠桌、座椅舒适包、2.0T、7速变速箱，18轮，备胎，电动真皮座椅带腰部支撑，胎压监测，可折叠三排座椅，真皮多功能方向盘，行李架，command系统，中控彩屏，电动折叠后视镜，内外防眩目后视镜，换挡拨片，注意力辅助，室内氛围灯，驾驶模式选择，前后雷达、倒车影像，led智能大灯，隐私玻璃，定速巡航，两侧电动门，脚垫，前座椅加热带记忆，蓝牙，电动尾门，二排座椅可旋转'
              }
            }
          ]
        },
        {
          name: '奔驰G500',
          imgs: [
            { src: './img/bc_10.jpg',
              desc: {
                name: '奔驰',
                year: '',
                volume: '4.0T',
                opera: '',
                info: 'V8，7速，氙灯，LED日行灯，19AMG轮，天窗，踏板，后挂备胎，桃木内饰，桃木方向盘带换挡拨片，后排娱乐，前座椅通风加热，后座椅加热，真皮座椅带电动调节，座椅记忆，前中后三把差速锁，哈曼音响，前后雷达，倒车影像，盲点辅助，前保险杠，自动空调'
              }
            }
          ]
        },
        {
          name: '奔驰G500 4x4',
          imgs: [
            { src: './img/bc_11.jpg',
              desc: {
                name: '奔驰',
                year: '',
                volume: '',
                opera: '',
                info: '离地距离 450mm、涉水能力 1米、轮胎间距 1.744mm、3种驱动模式、22寸轮毂、每个轮胎带有两个减震器及两个悬架弹簧 单天窗、22轮、红卡钳、双减震、氙灯LED日行灯、多轮廓电动包裹座椅、翻毛皮内饰（翻毛皮双色座椅、翻毛皮方向盘、翻毛皮门板、翻毛皮内顶）、前排座椅通风加热、二排座椅加热、哈曼音响（14个扬声器）、三把差速锁、中控碳纤维装饰、底盘舒适度调节、脚踏、前电眼、倒影、导航、多功能方向盘（蓝牙、定速巡航、换挡拨片）。'
              }
            }
          ]
        }
      ]
    },
    {
      icon: 'icon-aodi',
      title: '奥迪',
      brands: [
        {
          name: '奥迪Q5',
          imgs: [
            {
              src: './img/ad_01.jpg',
              desc: {
                name: '奥迪',
                year: '',
                volume: '',
                opera: '',
                info: '动感版：电动尾门、2.0T，七速双离合，四驱，18轮，氙灯，LED日行灯,LED尾灯，大灯清洗，后雷达，外后视镜电动调节加热，行李架，换挡拨片，一键启动，定速巡航，中控小屏，carplay，蓝牙，自动内防炫目后视镜，胎压监测，单色氛围灯，真皮座椅，10向调节带腰部支撑，奥迪音响9扬声器，小备胎，自动启停，陡坡缓降，驾驶模式选择，尾翼'
              }
            }
          ]
        },
        {
          name: '奥迪Q7',
          imgs: [
            {
              src: './img/ad_02.jpg',
              desc: {
                name: '奥迪',
              year: '',
              volume: '',
              opera: '',
              info: '3.0T 8速手自一体变速箱 奥迪侧向辅助、四区空调、电动转向柱辅助、电动尾门、驾驶员电动座椅带记忆带腰部支撑、Cricket真皮座椅、远光灯辅助、奥迪驾驶模式选择、奥迪虚拟座舱系统、倒车影像、定速巡航、后部隐私玻璃、电动机械助力转向、电动车窗、防炫目外后视镜带记忆、折叠功能，大灯清洗、舒适钥匙、LED大灯、led动态后尾灯、MMI收音机、彩色屏幕8.3、后排娱乐、自适应大灯、铝制行李架、铝制10幅20轮、前后泊车辅助、语音控制、MMI导航带MMI触摸、BOSE 3D环绕音响、第三排座椅、3幅多功能运动真皮方向盘、Valcona皮革（SE）、运动前座椅（SE）、全景天窗'

              }
            }
          ]
        }
      ]
    },
    {
      icon: 'icon-baoma',
      title: '宝马',
      brands: [
        {
          name: '宝马X5北美版（墨版)',
          imgs: [
            {
              src: './img/bm_01.jpg',
              desc: {
                name: '宝马',
                year: '',
                volume: '',
                opera: '',
                info: '大灯清洗3.0T，四驱，八速，全景天窗，氙灯，前雾灯，LED日行灯，19轮，踏板，行李架，前后雷达，倒车影像，运动排气，备胎，虚拟仪表盘，运动档杆，一键启动，方向盘电动调节带换挡拨片，定速巡航，自动启停，电动尾门，10.2寸大屏，8向电动调节，真皮座椅带记忆，蓝牙，可触摸IDRIVER,驾驶模式选择，陡坡缓降，自动空调'
              }
             }
          ]
        },
        {
          name: '宝马X5加版',
          imgs: [
            {
              src:'./img/bm_02.jpg',
              desc: {
                name: '宝马',
                year: '',
                volume: '',
                opera: '',
                info: '配置:标配：自适应氙灯，方向盘电动调节，前排座椅加热，带加热功能前挡风感应雨刷，全景天窗，后排私密玻璃，自动防眩目后视镜，电动尾门，前后驻车雷达，蓝牙USB连接，方向盘后视镜及座椅记忆、方向盘加热、后摄像头、定速巡航、电尾门 单选：M包（带M标的20寸M轮毂、陶瓷档把、运动变速箱、M自适应悬挂,运动M方向盘，M运动座椅，M标门槛,M大包围）大豪华包（电吸门、智能卡、哈曼卡顿音响、四区空调、后排手动遮阳帘、氛围灯、抬头显示，后排加热，并道，环影）熏黑轮毂'
              }
            }
          ]
        },
        {
          name: '宝马X5欧版',
          imgs: [
            {
              src: './img/bm_03.jpg',
              desc: {
                name: '宝马',
                year: '',
                volume: '',
                opera: '',
                info: '3.0T，8速，四驱，前后雷达，18轮，全景天窗，卤素大灯，前雾灯，外后视镜电动调节，一键启动，多功能方向盘带电动调节，定速巡航，自动启停，AUTOHOLD，小屏，蓝牙，胎压监测，真皮座椅带记忆，8向调节，电动尾门，前加热，陡坡缓降'

              }
             }
          ]
        },
        {
          name: '宝马X6',
          imgs: [
            {
              src: './img/bm_04.jpg',
              desc: {
                name: '宝马宝马',
                year: '2018款',
                volume: '',
                opera: '',
                info: '宝马X6配置：黑色金属漆，红色真皮，隐私玻璃、自动调光外观镜、玻璃天窗、双氙气大灯、LED雾灯、加热前座椅、吸烟包、加热方向盘、报警系统、后视摄像头、自适应大灯、通用遥控器、USB与蓝牙集成、宝马车载导航、自动中继线、自动气候控制。M套件(20寸469M混合轮、自适应M悬架、M空气动力学外观、高光影线外形、M陶瓷控制手柄、舒适前座椅、高性能轮胎)；'
              }
             }
          ]
        }
      ]
    },
    {
      icon: 'icon-luhu',
      title: '路虎',
      brands: [
        {
          name: '路虎揽胜行政',
          imgs: [
            {
              src: './img/lf_01.jpg',
              desc: {
                  name: '路虎',
                  year: '17款揽运S版柴油',
                  volume: '',
                  opera: '',
                  info: '配置:17款揽运S版柴油，白/黑，新款大屏，滑动全景，液晶仪表盘，氙灯+LED灯+大灯清洗，19轮，五座，丝绒座椅，雷达，两项腰部支撑，车道偏离预警，双区空调，250瓦高级音响，底升，全地形反馈。国五排放'
              }
            }
          ]
        },
        {
          name: '路虎揽胜创世加长',
          imgs: [
            {
              src: './img/lf_02.jpg',
              desc: {
                  name: '路虎',
                  year: '',
                  volume: '5.0排量',
                  opera: '',
                  info: '高级金属漆 4座 22战盾轮 抬显 加热方向盘 雷达测距 并道 自动泊车 1700W音响 鹿皮顶 前后冰箱 四区空调、前后电动座椅、前后座椅加热、前后座椅通风、前后座椅按摩、飞翼头枕、10.2寸大屏后娱、滑动全景、环影、电吸门、智能卡、一键启动、电动折叠后视镜、后排电动遮阳帘、底盘升降、轮毂锁、氙灯LED、雾灯、三代地形反馈、前后电眼、倒影、液晶仪表盘、脚感电尾门 全尺寸备胎'
              }
            }
          ]
        },
        {
          name: '路虎揽胜运动',
          imgs: [
            {
              src: './img/lf_03.jpg',
              desc: {
                  name: '路虎',
                  year: '17款揽运S版柴油',
                  volume: '',
                  opera: '',
                  info: '白/黑，新款大屏，滑动全景，液晶仪表盘，氙灯+LED灯+大灯清洗，19轮，五座，丝绒座椅，雷达，两项腰部支撑，车道偏离预警，双区空调，250瓦高级音响，底升，全地形反馈。国五排放。'
              }
            }
          ]
        }
      ]
    },
    {
      icon: 'icon-linken',
      title: '林肯',
      brands: [
        {
          name: '林肯MKX',
          imgs: [{
            src: './img/lk_01.jpg',
            desc: {
              name: '林肯',
              year: '',
              volume: '2.7T 双增压发动机 6速 340马力',
              opera: '',
              info: '20轮 全景8寸触摸屏 智能卡 前座椅通风加热 换挡拨片 定速巡航 遥控启动 脚感应电尾门环影 后娱 胎压监测 自动泊车 蓝牙 自动雨刷 真皮方向盘 Revel高级音响 脚垫 前后电眼 自动空调 自适应前大灯 LED尾灯'
            }
          }]
        },
        {
          name: '林肯领航员',
          imgs: [{
            src: './img/lk_02.jpg',
            desc: {
                name: '林肯',
                year: '',
                volume: '',
                opera: '',
                info: '7座、长轴5.7米镀鉻套件、LED日行灯、氙灯、电尾门、盲点辅助、天窗、22寸轮、导航、无钥匙进入和无钥匙启动、倒影、遥控启动、前座椅加热通风、二排座椅加热、真皮仪表台、桃木方向盘、三排电动座椅、后排娱乐、电动脚踏'
            }
          }]
        }
      ]
    },
    {
      icon: 'icon-fute',
      title: '福特',
      brands: [
        {
          name: '福特野马',
          imgs: [
            {
              src: './img/ft_01.jpg',
              desc: {
                name: '福特',
                year: '',
                volume: '2.3T发动机，6速自动变速箱',
                opera: '',
                info: '氙气大灯、led日间行车灯/尾灯，AM/FA广播，MP3接口，单CD，防侧翻稳定控制系统，AUX输入接口，前脚垫，迎宾灯，前排电动座椅，sync声音控制系统，刹车防抱死，发动机预热，无钥匙进入，一键启动，倒车影像，前排、侧气囊，儿童座椅插口，智能防盗系统，车辆碰撞预警系统，胎压监测系统'
              }
            }
          ]
        },
        {
          name: '福特F150',
          imgs: [
            {
              src: './img/ft_02.jpg',
              desc: {
                name: '福特',
                year: '',
                volume: '',
                opera: '',
                info: '全景天窗，FX4 off road包，LED大灯，盲点辅助，电动折叠后视镜，电动脚踏板，遥控启动，后倒车雷达，无钥匙进入，20轮，胎压监测，氛围灯，方向盘加热，前座椅通风，前后座椅加热，座椅记忆，小梯子，车门密码锁'
              }
            }]
        }
      ]
    },
    {
      icon: 'icon-fengtian',
      title: '丰田',
      brands: [
        {
          name: '丰田赛纳四驱LTD',
          imgs: [
             {
                src: './img/fen_01.jpg',
                desc: {
                  name: '丰田赛纳四驱LTD',
                  year: '',
                  volume: '3.5排量 四驱 ',
                  opera: '',
                info: ' 360环车影像 雷达测距 高级真皮座椅、吸顶DVD、7寸触摸屏、JBL高级音响、蓝光播放器、倒车影像、电眼、双天窗、氙灯、前排加热座椅、电动折叠后视镜、感应雨刷、并道辅助、一键启动、无钥匙进入，18寸轮毂，金属漆'
              }
            }
          ]
        },
        {
          name: '丰田赛纳四驱XLE',
          imgs: [
            {
              src: './img/fen_02.jpg',
              desc: {
                  name: '丰田赛纳四驱XLE',
                  year: '',
                  volume: '3.5排量 四驱',
                  opera: '',
                  info: '导航，天窗，倒影，真皮座椅，金属漆，双电动门，电尾门，18寸轮毂防爆胎，前排座椅加热，方便钥匙，自动恒温空调，桃木内饰，后排隐私玻璃，电眼，真皮方向盘带多功能按键，电动座椅'
              }
            }
          ]
        },
        {
          name: '丰田赛纳两驱XLE',
          imgs: [
            {
              src: './img/fen_03.jpg',
              desc: {
                  name: '丰田赛纳两驱XLE',
                  year: '17款',
                  volume: '',
                  opera: '',
                  info: '18轮，7座，7寸导航屏，定速巡航，前雾灯，后电眼，倒影，第三排手动座椅，备胎，音响6声道mp3，可滑动天窗，原厂真皮座椅，第二排腿部支撑，前排座椅加热，智能卡，一键启动，主驾驶8向座椅调节，副驾驶4向座椅调节，多功能方向盘，镀珞门把手，行李架，电动门，电尾门，遮阳帘，隐私玻璃。'
              }
            }
          ]
        },
        {
          name: '丰田赛纳两驱LE',
          imgs: [
            {
              src: './img/fen_04.jpg',
              desc: {
                  name: '丰田赛纳四驱XLE',
                  year: '17款',
                  volume: '两驱',
                  opera: '',
                  info: '双侧电动门. 前座椅加热. 主驾驶电动座椅. 丝绒座椅. 大屏. 倒影. 巡航定速. 多功能方向盘. 私密玻璃. 后排遮阳帘. 行李架. 17轮'
               }
            }
          ]
        },
        {
          name: '丰田霸道2700',
          imgs: [
            {
              src: './img/fen_05.jpg',
              desc: {
                  name: '丰田',
                  year: '18款',
                  volume: '',
                  opera: '',
                  info: '两气囊&nbsp; 七座 17寸铁轮冰箱后挂电子空调,天窗，卤素大灯，大灯清洗，彩条，胎压检测，电动折叠后视镜，多功能方向盘，冰箱，主驾驶腰部支撑。'
              }
            }
          ]
        },
        {
          name: '丰田陆地巡洋舰4000',
          imgs: [
            {
                src: './img/fen_06.jpg',
                desc: {
                    name: '丰田',
                    year: '',
                    volume: '4.0发动机',
                    opera: '',
                    info: '天窗，18寸合金轮毂，8座，底挂，冰箱，桃木内饰，防眩目后视镜，电动座椅，9寸导航屏，DVD，6扬声器，多功能方向盘，拖钩，雾灯，航踏，行李架，镀铬镶边，双差速锁，巡航定速，倒影，8气囊，遥控启动，保护包，电折镜，小杠'
                }
            }
          ]
        },
        {
          name: '丰田陆地巡洋舰4600',
          imgs: [
            {
              src: './img/fen_07.jpg',
              desc: {
                  name: '丰田',
                  year: '',
                  volume: '',
                  opera: '',
                  info: 'VXR 7座，遥启，天窗 LED氙灯 冰箱 20 轮 环影系统 真皮电动座椅，前排座椅通风，8速，电动后备箱门 油箱138L，9寸屏幕导航，10.1寸后座娱乐系统，全地形全时四驱，四区自动空调，桃木内饰，真皮 桃木 方向盘，多功能方向盘，一键启动，无线门锁，智能卡，中控锁，自动感应雨刷，大灯清洗装置，电动折叠后视镜，防炫目内后视镜，侧脚踏，前、后雾灯，地板照明系统，车辆稳定性控制系统（VSC）, 盲点监测（BSD），倒车后视辅助(RCTA)，预碰撞安全系统(PCS)，车道偏离警报(LDA)，转弯辅助功能，泊车辅助，上坡辅助（HAC）, 胎压监测，巡航定速，后尾翼，行李架，拖钩'
              }
            }
          ]
        },
        {
          name: '丰田陆地巡洋舰5700',
          imgs: [
            {
              src: './img/fen_08.jpg',
              desc: {
                  name: '丰田',
                  year: '',
                  volume: '',
                  opera: '',
                  info:'VXR 7座，遥启，天窗 LED氙灯 冰箱 20 轮 环影系统 真皮电动座椅，前排座椅通风，8速，电动后备箱门 油箱138L，9寸屏幕导航，10.1寸后座娱乐系统，全地形全时四驱，四区自动空调，桃木内饰，真皮 桃木 方向盘，多功能方向盘，一键启动，无线门锁，智能卡，中控锁，自动感应雨刷，大灯清洗装置，电动折叠后视镜，防炫目内后视镜，侧脚踏，前、后雾灯，地板照明系统，车辆稳定性控制系统（VSC）, 盲点监测（BSD），倒车后视辅助(RCTA)，预碰撞安全系统(PCS)，车道偏离警报(LDA)，转弯辅助功能，泊车辅助，上坡辅助（HAC）, 胎压监测，巡航定速，后尾翼，行李架，拖钩'
              }
            }
          ]
        },
      ]
    },
    {
      icon: 'icon-dazhong',
      title: '大众',
      brands: [
        {
          name: '大众帕萨特',
          imgs: [
            {
              src: './img/dz_02.jpg',
              desc: {
                  name: '大众帕萨特',
                  year: '',
                  volume: '2.5L，6速 ',
                  opera: '',
                  info: '17轮，胎压监测，10个扬声器，防盗螺丝，双区自动空调，桃木内饰，电动天窗，6.5寸触摸屏，carplay,蓝牙，USB接口，AUX,CD，8气囊，电动真皮座椅8向调节，前加热，无钥匙进入和启动，真皮多功能方向盘带巡航，外后视镜电动调节带加热，LED大灯和尾灯，LED日行灯，备胎，前后雷达，倒影，寻车键，二排座椅可折叠，二排出风口带USB接口'
              }
            }
          ]
        },
        {
          name: '大众途观',
          imgs: [{
            src: './img/dz_01.jpg',
            desc: {
              name: '大众途观',
              year: '',
              volume: '2.0T/1.4T发动机',
              opera: '',
              info: '17轮、2驱、行李架、全景天窗、手动织物座椅、定速巡航、后视镜加热、多功能方向盘、防炫目内后视镜、卤素大灯、中控大屏不带导航、第二排出风口、备胎'
            }
          }]
        }
      ]
    }
  ];
  function MouseScrollEvent (scrollCon, scrollBody, scrollItem, name) {
    this.tabLeft = 0;
    this.index = 0;
    this.parentIndex = 0;
    this.name = name;
    this.scrollCon = scrollCon;
    this.scrollBody = scrollBody;
    this.scrollItem = scrollItem;
  }

  MouseScrollEvent.prototype = {
    constructor: MouseScrollEvent,
    init: function (cb) {
      let allItem = $(this.scrollBody).find(this.scrollItem);
      let self = this;
      allItem.each(function () {
        let name = $(this).attr('data-name');
        if (name === self.name) {
          $(this).addClass('active').siblings().removeClass('active');
          self.moveToTab($(this).get(0), cb);
        }
      });
    },
    handleScroll: function (e) {
      let type = e.type;
      let delta = 0; // 滚动距离
      if (type === 'DOMMouseScroll' || type === 'mousewheel') { // 滚动一下 移动120px
        delta = (e.wheelDelta ? e.wheelDelta / 3 : -(e.delta || 0)) * 40;
      }
      let left = 0;
      if (delta > 0) { // 滚动条向左走
        left = Math.min(0, this.tabLeft + delta);
      } else {
        // 获取容器宽度
        let scrollConWidth = $(this.scrollCon).get(0).offsetWidth;
        let scrollBodyWidth = $(this.scrollBody).get(0).offsetWidth;
        if (scrollConWidth - 100 < scrollBodyWidth) { // 当滚动区域 小于内容滚动区域时， 可滚动
          if (this.tabLeft < -(scrollBodyWidth -scrollConWidth + 100)) {
            left = this.tabLeft;
          } else {
            left = Math.max(this.tabLeft + delta, scrollConWidth - scrollBodyWidth - 100);
          }
        } else {
          left = 0;
        }
      }
      this.tabLeft = left;
      this.startMove();
    },
    moveToTab: function (tab, cb) {
      let scrollConWidth = $(this.scrollCon).get(0).offsetWidth;
      if (tab.offsetLeft < -this.tabLeft) {
        this.tabLeft = -tab.offsetLeft + 10
      } else if (tab.offsetLeft + 10 > -this.tabLeft &&
        tab.offsetLeft + tab.offsetWidth < -this.tabLeft + scrollConWidth - 100) { // 当前标签在可视区内
        this.tabLeft = Math.min(0, scrollConWidth - 100 - tab.offsetWidth - tab.offsetLeft)
      } else { // 当前标签在可视区右侧
        this.tabLeft = -(tab.offsetLeft - (scrollConWidth - 100 - tab.offsetWidth));
      }
      this.startMove(cb);
    },
    startMove: function (cb) {
      $(this.scrollBody).stop();
      $(this.scrollBody).animate({left: this.tabLeft}, 100);
      cb && cb(this.index);
    },
    setName: function (name) {
      this.name = name;
    },
    setIndex: function (index) {
      this.index = index;
    },
    setParentIndex: function (index) {
      this.parentIndex = index;
    }
  }

  let loadCars = function (obj) {
    let pIndex = obj.parentIndex;
    let cIndex = obj.index;
    let brands = carLogoArr[pIndex].brands || [];
    if (brands[cIndex] && brands[cIndex].imgs) {
      let imgs = brands[cIndex].imgs;
      let carList = ``;
      imgs.map(img => {
        carList += `
          <li class="car-item">
            <img src="${img.src}" />
          </li>
        `
      });
      let carStr = `
        <div class="flexslider car-flexslider">
          <ul class="slides car-slides">${carList}</ul>
        </div>
        <div class="flexslider car-show-flexslider">
          <ul class="slides car-show-slides">${carList}</ul>
        </div>
      `;
      let initDesc = function (index) {
        let desc = imgs[index].desc || {};
        let descStr = `
          <div class="desc-left">
            <div class="title">${desc.name}</div>
            <div class="desc">${desc.year}</div>
            <div class="desc">${desc.volume}</div>
            <div class="desc">${desc.opera}</div>
          </div>
          <div class="desc-right">${desc.info}</div>
        `;
        $('.car-desc-info').empty().append(descStr);
      }
      $('.car-img-wrap').empty().append(carStr);
      initDesc(0);
      $('.car-show-flexslider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: true,
        slideshow: false,
        itemWidth: 100,
        // itemMargin: 20,
        asNavFor: '.car-flexslider',
        minItems:2,
        // maxItems: 5,
        directionNav: false,
        slideshowSpeed: 3000
      });

      $('.car-flexslider').flexslider({
        animation: "slide",
        controlNav: false, //是否显示控制菜单
        animationLoop: true,
        slideshow: true, //载入页面时，是否自动播放
        sync: ".car-show-flexslider",
        directionNav: false, // 左右控件
        slideshowSpeed: 3000,
        after: function (obj) {
          let currentSlide = obj.currentSlide;
          initDesc(currentSlide);
        }
      });
    }
  }

  let bindClick = function (origin, target, msEvent, cb) {
    $(origin).on('click', target, function () {
      let name = $(this).attr('data-name');
      let index = $(this).index();
      msEvent.setName(name);
      msEvent.setIndex(index);
      msEvent.init(function (index) {
        cb && cb(msEvent);
      });
    });
  }
  // 加载品牌
  let loadBrands = function (obj) {
    // api.GetCarType({})
    let brands = carLogoArr[obj.index].brands || [];
    let brandStr = brands.map(brand => {
      return `
        <li class="brand-item" data-name="${brand.name}">${brand.name}</li>
      `;
    }).join('');
    $('.brand-list').empty().append(brandStr).find('.logo-item').eq(0).addClass('active');
    $('.car-img-wrap').empty();
    $('.car-desc-info').empty();
    let brandScroll = null;
    brandScroll = new MouseScrollEvent('.sub-brand-list', '.brand-list', '.brand-item', brands && brands[0] && brands[0].name);
    brandScroll.setParentIndex(obj.index);
    brandScroll.init(function () {
      loadCars(brandScroll);
    });
    bindClick('.brand-list', '.brand-item', brandScroll, loadCars);
  }

  let logoStr = carLogoArr.map(logo => {
    return `
      <li class="logo-item" data-name="${logo.title}" data-id="${logo.id}">
        <i class="icon font_family ${logo.icon}"></i>
      </li>
    `;
  });
  $('.logo-list').empty().append(logoStr).find('.logo-item').eq(0).addClass('active');
  // 实例化滚轮事件
  let logoScroll = new MouseScrollEvent('.car-logo-list', '.logo-list', '.logo-item', '奔驰');
  logoScroll.init(function () {
    loadBrands(logoScroll);
  });
  bindClick('.logo-list', '.logo-item', logoScroll, loadBrands);

  let maps = {
    0: '综合物流产业园',
    1: '标准运输',
    2: '商贸流通',
    3: '平行车产业链',
    4: '港口经营'
  };
  let pages = {
    pageNo: 1,
    pageSize: 100
  }
  /** */
  let search = location.search;
  let params = search.substring(1).split('&');
  let id = params[0].split('=')[1];
  let tab = params[1].split('=')[1];
  let secondTxt = maps[tab];
  $('.second-crumb').text(secondTxt);
  $('.second-crumb').click(function () {
    window.location.href=`business.html?tab=${tab}`;
  });
  $('.first-crumb').click(function () {
    window.location.href=`business.html`;
  });

  function fetchCarBrand ({pageNo, pageSize, companyId}) {
    api.GetAllCar({pageNo, pageSize, companyId}).then(res => {
      let carLogos = res.list.map(logo => {
        return `
          <li class="logo-item" data-name="${logo.title}">
            <i class="icon font_family ${logo.icon}"></i>
          </li>
        `;
      });
      $('.logo-list').empty().append(carLogos).find('.logo-item').eq(0).addClass('active');
      let logoScroll = new MouseScrollEvent('.car-logo-list', '.logo-list', '.logo-item', '奔驰');
      logoScroll.init(function () {
        loadBrands(logoScroll);
      });
      bindClick('.logo-list', '.logo-item', logoScroll, loadBrands);
    })
  }
  function fetchData ({id}) {
    loadingAnimate()
    api.GetBusinessById({id}).then(res => {
      removeLoading()
      // let companyId = res.id
      // fetchCarBrand({pageNo: pages.pageNo, pageSize: pages.pageSize, companyId});
      let person = res.companyPrincipals[0];
      let tempPhone = []
      if (person.phone1) tempPhone.push(person.phone1)
      if (person.phone2) tempPhone.push(person.phone2)
      let phone = tempPhone.map(p => {
        return `
          <span class="desc">${p}</span><br/>
        `
      }).join('')
      let personResult = `
        <div class="info-common info-phone">
          <div class="common-title">业务联系</div>
          <div class="common-desc">
            <span class="desc">${person.name}</span><br>
            ${phone}
          </div>
        </div>
      `
      let addressResult = `
        <div class="info-common info-address">
          <div class="common-title">办公地址</div>
          <div class="common-desc">
            <span class="desc">
                ${res.detailAddress}
            </span>
          </div>
        </div>
      `
      let result = `
        <div class="left-img">
          <img style="width: 100%; height: 100%;" src="${res.companyImage}" />
        </div>
        <div class="left-content">
          <div class="content-title">${res.companyName}</div>
          <div class="content-desc">
            ${res.companyDetail}
          </div>
        </div>
        <div class="left-info">
          ${personResult}
          ${addressResult}
        </div>
      `
      $('.business-car-left').empty().append(result);
      // 根据公司id查找车品牌
      // 根据车品牌查找车类型
      // 根据车类型查找车详情信息
    })
  }
  fetchData({id})
  operateNav();
})($);
