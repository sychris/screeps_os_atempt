function spawner() {
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }
  
  let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
  let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
  let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
  
  if (harvesters.length < 2) {
    let newName = 'Harvester' + Game.time;
    console.log('Spawning new harvester: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
      {memory: {role: 'harvester'}});
  }
  
  if (upgraders.length < 2) {
    let newName = 'upgrader' + Game.time;
    console.log('Spawning new upgrader: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
      {memory: {role: 'upgrader'}});
  }
  if (builders.length < 1) {
    let newName = 'builder' + Game.time;
    console.log('Spawning new builder: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
      {memory: {role: 'builder'}});
  }
  
  
  if (Game.spawns['Spawn1'].spawning) {
    let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      Game.spawns['Spawn1'].pos.x + 1,
      Game.spawns['Spawn1'].pos.y,
      {align: 'left', opacity: 0.8});
  }
  
  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep.memory.role === 'harvester') {
      harvester(creep);
    }
    if (creep.memory.role === 'upgrader') {
      upgrader(creep);
    }
    if (creep.memory.role === 'builder') {
      builder(creep);
    }
  }
}

/**
 * pass the id of the creep to control
 * @param creep
 */
function harvester(creep) {
  
  if (creep === undefined) {
    console.log("non extant creep is trying to be ordered")
    console.log(JSON.stringify(creep))
    
  } else {
    if (creep.store.getFreeCapacity() > 0) {
      let sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    } else {
      let targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
        //move them close to Spawn if there's not a target to fill, so  they don't camp the resource node
      } else {
        let targets = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType === STRUCTURE_SPAWN)
          }
        });
        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
      }
    }
  }
}

function upgrader(creep) {
  if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
    creep.memory.upgrading = false;
    creep.say('🔄 harvest');
  }
  if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
    creep.memory.upgrading = true;
    creep.say('⚡ upgrade');
  }
  
  if (creep.memory.upgrading) {
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
    }
  } else {
    let sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
  }
}

function builder(creep) {
  if (creep.memory.building === true) {
    if (creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    
    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) creep.moveTo(targets[0]);
  }
  if (creep.memory.building === false) {
    if (creep.store.getFreeCapacity() === 0) {
      creep.memory.building = true;
      creep.say('⚡ building');
    }
    
    let sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
  }
}

module.exports = spawner;