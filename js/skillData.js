// 技能数据
window.skillData = {
    // 龙系技能
    dragon: [
        { id: "DragonCanon", name: "龙炮", description: "发射强力的龙系能量炮" },
        { id: "DragonBreath", name: "龙息", description: "喷射龙系能量气息" },
        { id: "DragonMeteor", name: "龙陨", description: "召唤龙系陨石攻击" },
        { id: "DragonWave", name: "龙波", description: "发射龙系能量波" },
        { id: "Unique_FairyDragon_FairyTornado", name: "妖精龙卷风", description: "独特的妖精龙技能" }
    ],
    
    // 火系技能
    fire: [
        { id: "FireBlast", name: "大字爆炎", description: "发射大范围火焰爆炸" },
        { id: "Flamethrower", name: "喷射火焰", description: "喷射持续的火焰" },
        { id: "FireBall", name: "火球", description: "发射火球攻击" },
        { id: "FlareArrow", name: "火焰箭", description: "发射火焰箭矢" },
        { id: "FireSeed", name: "火种", description: "种下会爆炸的火种" },
        { id: "FlareTornado", name: "火焰龙卷", description: "创造火焰龙卷风" },
        { id: "Inferno", name: "地狱火", description: "召唤强力地狱火" },
        { id: "Eruption", name: "喷发", description: "火山喷发式攻击" },
        { id: "FlameWall", name: "火墙", description: "创造火焰墙壁" },
        { id: "FlameFunnel", name: "火焰漏斗", description: "创造火焰漩涡" }
    ],
    
    // 水系技能
    water: [
        { id: "WaterGun", name: "水枪", description: "发射高压水流" },
        { id: "WaterWave", name: "水波", description: "发射水波攻击" },
        { id: "HydroPump", name: "水炮", description: "发射强力水炮" },
        { id: "WaterBall", name: "水球", description: "发射水球攻击" },
        { id: "TidalWave", name: "潮汐波", description: "发动潮汐波攻击" },
        { id: "AquaJet", name: "水流喷射", description: "高速水流喷射" },
        { id: "BubbleShot", name: "泡沫射击", description: "发射泡沫攻击" },
        { id: "AcidRain", name: "酸雨", description: "召唤酸性雨水" },
        { id: "LineGeyser", name: "直线喷泉", description: "直线水柱攻击" },
        { id: "WallSplash", name: "水墙飞溅", description: "创造飞溅水墙" }
    ],
    
    // 草系技能
    grass: [
        { id: "GrassTornado", name: "草系龙卷", description: "创造草系龙卷风" },
        { id: "SolarBeam", name: "太阳光束", description: "发射太阳能光束" },
        { id: "SeedMachinegun", name: "种子机关枪", description: "发射多颗种子" },
        { id: "SeedMine", name: "种子地雷", description: "埋设种子地雷" },
        { id: "RootAttack", name: "根系攻击", description: "使用根系攻击" },
        { id: "SpecialCutter", name: "特殊切割", description: "特殊的切割攻击" },
        { id: "RootLance", name: "根系长矛", description: "使用根系长矛攻击" }
    ],
    
    // 电系技能
    electric: [
        { id: "Funnel_RaijinDaughter", name: "雷神之女漏斗", description: "释放雷神之女的特殊雷电漏斗攻击" },
        { id: "ThunderRain", name: "雷雨", description: "召唤雷电雨" },
        { id: "ThunderBall", name: "雷球", description: "发射雷电球" },
        { id: "LineThunder", name: "直线雷电", description: "发射直线雷电" },
        { id: "CrossThunder", name: "交叉雷电", description: "发射交叉雷电" },
        { id: "ThreeThunder", name: "三连雷", description: "发射三连雷电" },
        { id: "ElecWave", name: "电波", description: "发射电波攻击" },
        { id: "Thunderbolt", name: "雷电", description: "召唤雷电攻击" },
        { id: "ThunderFunnel", name: "雷电漏斗", description: "创造雷电漩涡" },
        { id: "SpreadPulse", name: "扩散脉冲", description: "发射扩散电脉冲" },
        { id: "LockonLaser", name: "锁定激光", description: "发射锁定目标的激光" },
        { id: "LightningStrike", name: "闪电打击", description: "召唤闪电攻击" },
        { id: "TriSpark", name: "三重火花", description: "发射三重电火花" },
        { id: "ThunderStorm", name: "雷暴", description: "召唤雷暴攻击" }
    ],
    
    // 冰系技能
    ice: [
        { id: "IceMissile", name: "冰导弹", description: "发射冰系导弹" },
        { id: "BlizzardLance", name: "暴风雪长矛", description: "发射暴风雪长矛" },
        { id: "SnowStorm", name: "暴风雪", description: "召唤暴风雪攻击" },
        { id: "IcicleThrow", name: "冰柱投掷", description: "投掷冰柱攻击" },
        { id: "IceBlade", name: "冰刃", description: "使用冰刃攻击" },
        { id: "FrostBreath", name: "冰霜吐息", description: "喷射冰霜吐息" },
        { id: "IcicleLine", name: "冰柱线", description: "创造直线冰柱" },
        { id: "IciclePierce", name: "冰柱穿刺", description: "使用冰柱穿刺攻击" },
        { id: "DoubleIcicleThrow", name: "双冰柱投掷", description: "投掷两个冰柱" },
        { id: "IceAge", name: "冰河时代", description: "创造大范围冰冻区域" }
    ],
    
    // 地/岩石系技能
    ground: [
        { id: "SandTornado", name: "沙尘龙卷", description: "创造沙尘龙卷风" },
        { id: "ThrowRock", name: "投石", description: "投掷岩石攻击" },
        { id: "RockLance", name: "岩石长矛", description: "使用岩石长矛攻击" },
        { id: "MudShot", name: "泥浆射击", description: "发射泥浆攻击" },
        { id: "StoneShotgun", name: "石头霰弹", description: "发射石头霰弹" },
        { id: "SandTwister", name: "沙尘旋风", description: "创造沙尘旋风" },
        { id: "Tremor", name: "震动", description: "引发地面震动" }
    ],
    
    // 暗/幽灵系技能
    dark: [
        { id: "DarkLaser", name: "暗黑激光", description: "发射暗黑激光" },
        { id: "DarkWave", name: "暗黑波", description: "发射暗黑波" },
        { id: "ShadowBall", name: "暗影球", description: "发射暗影球攻击" },
        { id: "Psychokinesis", name: "精神动力", description: "使用精神力量攻击" },
        { id: "PoisonShot", name: "毒液射击", description: "发射毒液攻击" },
        { id: "GhostFlame", name: "幽灵火焰", description: "使用幽灵火焰攻击" },
        { id: "DarkBall", name: "暗黑球", description: "发射暗黑能量球" },
        { id: "PoisonFog", name: "毒雾", description: "释放毒雾攻击" },
        { id: "DarkLegion", name: "暗黑军团", description: "召唤暗黑军团攻击" },
        { id: "DarkCanon", name: "暗黑炮", description: "发射暗黑能量炮" },
        { id: "DarkArrow", name: "暗黑箭", description: "发射暗黑箭矢" },
        { id: "DarkPulse", name: "暗黑脉冲", description: "发射暗黑能量脉冲" },
        { id: "Apocalypse", name: "启示录", description: "释放终极暗黑攻击" }
    ],
    
    // 风/空气系技能
    wind: [
        { id: "WindCutter", name: "风刃", description: "发射风刃攻击" },
        { id: "AirCanon", name: "空气炮", description: "发射空气炮" },
        { id: "AirBlade", name: "空气刃", description: "使用空气刃攻击" },
        { id: "RaidCutter", name: "突袭切割", description: "使用突袭切割攻击" },
        { id: "WindEdge", name: "风之刃", description: "使用风之刃攻击" }
    ],
    
    // 特殊技能
    special: [
        { id: "EnergyShot", name: "能量射击", description: "发射基础能量弹" },
        { id: "Scratch", name: "抓击", description: "使用基础抓击攻击" },
        { id: "Funnel_DreamDemon", name: "梦魔漏斗", description: "释放梦魔的特殊漏斗攻击" },
        { id: "HyperBeam", name: "破坏光线", description: "发射强力破坏光线" },
        { id: "PowerShot", name: "强力射击", description: "发射强力能量弹" },
        { id: "PowerBall", name: "力量球", description: "发射蕴含力量的能量球" },
        { id: "SelfDestruct", name: "自爆", description: "使用自爆攻击" },
        { id: "SelfDestruct_Bee", name: "蜂式自爆", description: "蜜蜂式自爆攻击" },
        { id: "SelfExplosion", name: "自我爆炸", description: "引发自我爆炸" },
        { id: "StardustArrow", name: "星尘箭", description: "发射星尘箭矢" },
        { id: "DiamondFall", name: "钻石陨落", description: "召唤钻石陨落攻击" },
        { id: "BeamSlicer", name: "光束切割", description: "使用光束切割攻击" },
        { id: "Commet", name: "彗星", description: "召唤彗星攻击" },
        { id: "StarMine", name: "星星地雷", description: "埋设星星地雷" },
        { id: "HolyBlast", name: "神圣爆炸", description: "释放神圣能量爆炸" },
        { id: "ThreeCommet", name: "三重彗星", description: "召唤三重彗星攻击" },
        { id: "CommetRain", name: "彗星雨", description: "召唤彗星雨攻击" },
        { id: "BlastCanon", name: "爆炸炮", description: "发射爆炸能量炮" },
        { id: "ChargeCanon", name: "充能炮", description: "发射充能能量炮" },
        { id: "RangeThunder", name: "范围雷电", description: "释放范围雷电攻击" },
        { id: "Railbolt", name: "电磁轨道炮", description: "发射电磁轨道炮" },
        { id: "ShokeiLaser", name: "处刑激光", description: "发射处刑激光" },
        { id: "BubbleShower", name: "泡沫淋浴", description: "释放泡沫淋浴攻击" },
        { id: "WaterBalloon", name: "水球气球", description: "发射水球气球" },
        { id: "FlareTwister", name: "火焰旋风", description: "创造火焰旋风" },
        { id: "TrisRing", name: "三环", description: "释放三环攻击" }
    ],
    
    // 独特技能
    unique: [
        { id: "Unique_JetDragon_JumpBeam", name: "喷射龙跳跃光束", description: "喷射龙的独特跳跃光束攻击" },
        { id: "Unique_Anubis_LowRoundKick", name: "阿努比斯低踢", description: "阿努比斯的低踢攻击" },
        { id: "Unique_Anubis_GroundPunch", name: "阿努比斯地面拳", description: "阿努比斯的地面拳击" },
        { id: "Unique_Anubis_Tackle", name: "阿努比斯冲撞", description: "阿努比斯的冲撞攻击" },
        { id: "Unique_Deer_PushupHorn", name: "鹿角顶", description: "鹿的角顶攻击" },
        { id: "Unique_Garm_Bite", name: "加姆咬击", description: "加姆的咬击攻击" },
        { id: "Intimidate", name: "威吓", description: "威吓敌人降低其攻击" },
        { id: "Unique_Boar_Tackle", name: "野猪冲撞", description: "野猪的冲撞攻击" },
        { id: "Unique_PinkCat_CatPunch", name: "粉猫猫拳", description: "粉猫的猫拳攻击" },
        { id: "Unique_FlowerDinosaur_Whip", name: "花恐龙鞭打", description: "花恐龙的鞭打攻击" },
        { id: "Unique_SheepBall_Roll", name: "绵羊球滚动", description: "绵羊球的滚动攻击" },
        { id: "Unique_ChickenPal_ChickenPeck", name: "鸡啄", description: "鸡帕鲁的啄击" },
        { id: "Unique_Gorilla_GroundPunch", name: "猩猩地面拳", description: "猩猩的地面拳击" },
        { id: "Unique_Grassmammoth_Earthquake", name: "草系猛犸地震", description: "草系猛犸的地震攻击" },
        { id: "Unique_GrassPanda_MusclePunch", name: "草熊猫肌肉拳", description: "草熊猫的肌肉拳击" },
        { id: "Unique_RobinHood_BowSnipe", name: "罗宾汉弓狙击", description: "罗宾汉的弓箭狙击" },
        { id: "Unique_Alpaca_Tackle", name: "羊驼冲撞", description: "羊驼的冲撞攻击" },
        { id: "Unique_KingAlpaca_BodyPress", name: "羊驼王身体压制", description: "羊驼王的身体压制" },
        { id: "Unique_Werewolf_Scratch", name: "狼人抓击", description: "狼人的抓击攻击" },
        { id: "Unique_FengyunDeeper_CloudTempest", name: "风云深潜者云暴", description: "风云深潜者的云暴攻击" },
        { id: "Unique_Baphomet_SwallowKite", name: "巴弗灭吞燕", description: "巴弗灭的吞燕攻击" },
        { id: "Unique_HerculesBeetle_BeetleTackle", name: "大力神甲虫冲撞", description: "大力神甲虫的冲撞" },
        { id: "Unique_HawkBird_Storm", name: "鹰鸟风暴", description: "鹰鸟的风暴攻击" },
        { id: "Unique_Eagle_GlidingNail", name: "鹰滑翔爪", description: "鹰的滑翔爪攻击" },
        { id: "Unique_Horus_FlareBird", name: "荷鲁斯火焰鸟", description: "荷鲁斯的火焰鸟攻击" },
        { id: "Unique_FireKirin_Tackle", name: "火麒麟冲撞", description: "火麒麟的冲撞攻击" },
        { id: "Unique_AmaterasuWolf_FireCharge", name: "天照狼火焰冲锋", description: "天照狼的火焰冲锋" },
        { id: "Unique_VolcanicMonster_MagmaAttack", name: "火山怪岩浆攻击", description: "火山怪的岩浆攻击" },
        { id: "Unique_FlameBuffalo_FlameHorn", name: "火焰水牛角", description: "火焰水牛的角攻击" },
        { id: "Unique_BluePlatypus_Toboggan", name: "蓝鸭嘴兽雪橇", description: "蓝鸭嘴兽的雪橇攻击" },
        { id: "Unique_QueenBee_SpinLance", name: "蜂后旋转长矛", description: "蜂后的旋转长矛攻击" },
        { id: "Unique_ElecPanda_ElecScratch", name: "电熊猫电抓", description: "电熊猫的电抓攻击" },
        { id: "Unique_Kirin_LightningTackle", name: "麒麟闪电冲撞", description: "麒麟的闪电冲撞" },
        { id: "Unique_IceHorse_IceBladeAttack", name: "冰马冰刃攻击", description: "冰马的冰刃攻击" },
        { id: "Unique_DrillGame_ShellAttack", name: "钻头兽壳攻击", description: "钻头兽的壳攻击" },
        { id: "Unique_DarkCrow_TelePoke", name: "暗乌鸦远程戳", description: "暗乌鸦的远程戳攻击" },
        { id: "Unique_BirdDragon_FireBreath", name: "鸟龙火息", description: "鸟龙的火息攻击" },
        { id: "Unique_BlackMetalDragon_FirePunch", name: "黑金属龙火拳", description: "黑金属龙的火拳攻击" },
        { id: "Unique_DarkScorpion_Pierce", name: "暗蝎子穿刺", description: "暗蝎子的穿刺攻击" },
        { id: "Unique_GhostBeast_Tossin", name: "幽灵兽投掷", description: "幽灵兽的投掷攻击" },
        { id: "Unique_ThunderBird_ThunderStorm", name: "雷鸟雷暴", description: "雷鸟的雷暴攻击" },
        { id: "Unique_Yeti_SnowBall", name: "雪人雪球", description: "雪人的雪球攻击" },
        { id: "Unique_NaughtyCat_CatPress", name: "淘气猫猫压", description: "淘气猫的猫压攻击" },
        { id: "Unique_IceDeer_IceHorn", name: "冰鹿角", description: "冰鹿的角攻击" },
        { id: "Unique_KingBahamut_AirCrash", name: "巴哈姆特王空中撞击", description: "巴哈姆特王的空中撞击" },
        { id: "Unique_Manticore_InfernoStrike", name: "曼提柯尔地狱打击", description: "曼提柯尔的地狱打击" },
        { id: "Unique_SoldierBee_NeedleLance", name: "士兵蜂针矛", description: "士兵蜂的针矛攻击" },
        { id: "Unique_ThunderDog_InazumaShorai", name: "雷犬电光", description: "雷犬的电光攻击" },
        { id: "Unique_BlackCentaur_TwoSpearRushes", name: "黑半人马双矛冲锋", description: "黑半人马的双矛冲锋" },
        { id: "Unique_BlackGriffon_TackleLaser", name: "黑狮鹫冲撞激光", description: "黑狮鹫的冲撞激光" },
        { id: "Unique_SakuraSaurus_SideTackle", name: "樱花龙侧身冲撞", description: "樱花龙的侧身冲撞" },
        { id: "Unique_ThunderDragonMan_ThunderSwordAttack", name: "雷龙人雷剑攻击", description: "雷龙人的雷剑攻击" },
        { id: "Unique_RedArmorBird_TriplePeck", name: "红甲鸟三连啄", description: "红甲鸟的三连啄攻击" },
        { id: "Unique_CaptainPenguin_BodySlide", name: "企鹅队长身体滑行", description: "企鹅队长的身体滑行" },
        { id: "Unique_Ronin_Iai", name: "浪人居合", description: "浪人的居合斩攻击" },
        { id: "Unique_GrassRabbitMan_GrassRoundKick", name: "草兔人回旋踢", description: "草兔人的回旋踢" },
        { id: "Unique_SaintCentaur_OneSpearRushes", name: "圣半人马单矛冲锋", description: "圣半人马的单矛冲锋" },
        { id: "Unique_Umihebi_WindingTackle", name: "海蛇缠绕冲撞", description: "海蛇的缠绕冲撞" },
        { id: "Unique_WeaselDragon_FlyingTackle", name: "鼬龙飞行冲撞", description: "鼬龙的飞行冲撞" },
        { id: "Unique_WhiteTiger_IceScratch", name: "白虎冰抓", description: "白虎的冰抓攻击" },
        { id: "Unique_BirdDragon_Ice_IceBreath", name: "冰鸟龙冰息", description: "冰鸟龙的冰息攻击" },
        { id: "Unique_FireKirin_Dark_DarkTossin", name: "暗火麒麟暗投", description: "暗火麒麟的暗投攻击" },
        { id: "Unique_VolcanicMonster_Ice_IceAttack", name: "冰火山怪冰攻击", description: "冰火山怪的冰攻击" },
        { id: "Unique_Yeti_Grass_GrassBall", name: "草雪人草球", description: "草雪人的草球攻击" },
        { id: "Unique_GrassPanda_Electric_ElectricPunch", name: "电草熊猫电拳", description: "电草熊猫的电拳攻击" }
    ]
};

// 所有技能列表
const allSkills = [];
for (const category in skillData) {
    skillData[category].forEach(skill => {
        allSkills.push({
            ...skill,
            category: category
        });
    });
}