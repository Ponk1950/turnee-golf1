import React, { useState, useEffect, useCallback, useRef } from "react";

const SCHOOLS_SEED = [
  { id:"t1",  name:"Anacoco",                  type:"school", color:"#166534", gender:"boys" },
  { id:"t2",  name:"Avoyelles Public Charter", type:"school", color:"#1e40af", gender:"boys" },
  { id:"t3",  name:"Converse",                 type:"school", color:"#92400e", gender:"boys" },
  { id:"t4",  name:"Delta Charter",            type:"school", color:"#6b21a8", gender:"boys" },
  { id:"t5",  name:"Florien",                  type:"school", color:"#0e7490", gender:"boys" },
  { id:"t6",  name:"Grace Christian",          type:"school", color:"#166534", gender:"boys" },
  { id:"t7",  name:"Harrisonburg",             type:"school", color:"#be185d", gender:"boys" },
  { id:"t8",  name:"Hicks",                    type:"school", color:"#b45309", gender:"boys" },
  { id:"t9",  name:"Hornbeck",                 type:"school", color:"#1e40af", gender:"boys" },
  { id:"t10", name:"Logansport",               type:"school", color:"#166534", gender:"boys" },
  { id:"t11", name:"Montgomery",               type:"school", color:"#92400e", gender:"boys" },
  { id:"t12", name:"Negreet",                  type:"school", color:"#6b21a8", gender:"boys" },
  { id:"t13", name:"St. Mary's",               type:"school", color:"#0e7490", gender:"boys" },
  { id:"c1",  name:"Lasalle CC",               type:"club",   color:"#166534", aliases:["LGCC","LCC","LaGCC","Lasalle"], gender:"mixed" },
  { id:"c2",  name:"Links On Bayou",           type:"club",   color:"#1e40af", aliases:["LOB","Links"], gender:"mixed" },
];

const GOLFERS_SEED = [
  { id:"g1",  name:"Alex Chadwick",      handicap:13, team:"Converse",                 gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g2",  name:"Alex Ezernack",      handicap:10, team:"Converse",                 gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g3",  name:"Asa Leach",          handicap:18, team:"Florien",                  gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g4",  name:"Ben Morrison",       handicap:3,  team:"Harrisonburg",             gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g5",  name:"Bentley Underwood",  handicap:17, team:"Grace Christian",          gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g6",  name:"Brandon Doyle",      handicap:17, team:"Hicks",                    gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g7",  name:"Brayden Eicemann",   handicap:14, team:"Grace Christian",          gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g8",  name:"Caleb House",        handicap:13, team:"Harrisonburg",             gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g9",  name:"Caleb Taylor",       handicap:27, team:"Anacoco",                  gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g10", name:"Cane McCoy",         handicap:5,  team:"Logansport",               gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g11", name:"Carter Dubea",       handicap:12, team:"Avoyelles Public Charter", gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g12", name:"Carter Lachney",     handicap:28, team:"Avoyelles Public Charter", gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g13", name:"Carter Lowe",        handicap:23, team:"Hornbeck",                 gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g14", name:"Carter Ward",        handicap:11, team:"Hornbeck",                 gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g15", name:"Cole Leach",         handicap:10, team:"Negreet",                  gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g16", name:"Cole Yupp",          handicap:7,  team:"St. Mary's",               gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g17", name:"Drew Paton",         handicap:12, team:"Anacoco",                  gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g18", name:"Dylan Mayo",         handicap:16, team:"Anacoco",                  gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g19", name:"Eli Merrill",        handicap:8,  team:"Delta Charter",            gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g20", name:"Ethan Prichard",     handicap:17, team:"Anacoco",                  gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g21", name:"Ethan Probasco",     handicap:26, team:"St. Mary's",               gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g22", name:"Gabe Wallace",       handicap:10, team:"Delta Charter",            gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g23", name:"Gavin Deutch",       handicap:27, team:"Logansport",               gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g24", name:"Hayden Gainey",      handicap:16, team:"Montgomery",               gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g25", name:"Henry Guillermo",    handicap:27, team:"St. Mary's",               gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g26", name:"Ives Burgess",       handicap:23, team:"Hicks",                    gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g27", name:"Jack Schexnyder",    handicap:17, team:"Grace Christian",          gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g28", name:"Jake McGuffee",      handicap:24, team:"Harrisonburg",             gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g29", name:"Jayce Wright",       handicap:5,  team:"Converse",                 gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g30", name:"Josiah Glaspell",    handicap:28, team:"Harrisonburg",             gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g31", name:"Kane Hogan",         handicap:18, team:"Hicks",                    gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g32", name:"Keegan Jeane",       handicap:10, team:"Florien",                  gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g33", name:"Killing Magee",      handicap:15, team:"Logansport",               gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g34", name:"Landon Goodwin",     handicap:6,  team:"Anacoco",                  gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g35", name:"Landon Leach",       handicap:23, team:"Negreet",                  gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g36", name:"Landon Sims",        handicap:20, team:"Converse",                 gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g37", name:"Lawson Davis",       handicap:18, team:"Delta Charter",            gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g38", name:"Liam Ross",          handicap:4,  team:"Florien",                  gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g39", name:"Luke Guillory",      handicap:14, team:"Avoyelles Public Charter", gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g40", name:"Luke Self",          handicap:16, team:"Hornbeck",                 gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g41", name:"Mason Jordan",       handicap:8,  team:"Montgomery",               gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g42", name:"Mason Merritt",      handicap:20, team:"Florien",                  gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g43", name:"Mason Ward",         handicap:6,  team:"Hornbeck",                 gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g44", name:"Mattox Leslie",      handicap:4,  team:"Negreet",                  gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g45", name:"Micah Merchant",     handicap:2,  team:"Hicks",                    gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g46", name:"Pacer Williams",     handicap:13, team:"Logansport",               gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g47", name:"Pete Mitchell",      handicap:12, team:"Hornbeck",                 gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g48", name:"Pierce Regard",      handicap:1,  team:"Avoyelles Public Charter", gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g49", name:"Seth Chatelain",     handicap:22, team:"Avoyelles Public Charter", gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g50", name:"Slade Merchant",     handicap:13, team:"Hicks",                    gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g51", name:"Sully Thompson",     handicap:21, team:"Delta Charter",            gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g52", name:"Taylor Floyd",       handicap:7,  team:"Grace Christian",          gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g53", name:"Trip Philen",        handicap:21, team:"St. Mary's",               gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g54", name:"Tucker Brazil",      handicap:18, team:"Harrisonburg",             gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g55", name:"Ty Wilkerson",       handicap:11, team:"Negreet",                  gender:"boys", clubs:[], phone:"", email:"", dob:"" },
  { id:"g56", name:"Will Poston",        handicap:24, team:"St. Mary's",               gender:"boys", clubs:[], phone:"", email:"", dob:"" },
];

const COURSES_SEED = [
  { name:"Links On Bayou", rating:72.85, greens:18, teeBoxes:18, holes:18, par:[4,4,4,4,3,3,5,3,4,4,4,4,5,3,5,4,4,3] },
  { name:"Lasalle CC",     rating:69.55, greens:18, teeBoxes:18, holes:18, par:[4,3,4,3,4,3,5,4,5,4,4,4,3,4,3,3,4,5], aliases:["LGCC","LCC","Lasalle"] },
];

const SCORES_SEED = {"Alex Chadwick":{"1":4,"2":5,"3":4,"4":6,"5":5,"6":4,"7":4,"8":5,"9":7,"10":5,"11":6,"12":5,"13":7,"14":5,"15":4,"16":4,"17":4,"18":7},"Alex Ezernack":{"1":5,"2":6,"3":5,"4":6,"5":5,"6":4,"7":6,"8":7,"9":7,"10":7,"11":5,"12":3,"13":6,"14":5,"15":4,"16":4,"17":6,"18":7},"Asa Leach":{"1":6,"2":4,"3":5,"4":5,"5":6,"6":5,"7":5,"8":5,"9":5,"10":6,"11":7,"12":5,"13":6,"14":7,"15":5,"16":4,"17":8,"18":6},"Ben Morrison":{"1":4,"2":3,"3":3,"4":3,"5":4,"6":5,"7":5,"8":3,"9":5,"10":4,"11":4,"12":3,"13":7,"14":4,"15":4,"16":3,"17":6,"18":7},"Bentley Underwood":{"1":6,"2":6,"3":5,"4":5,"5":8,"6":6,"7":4,"8":7,"9":6,"10":5,"11":5,"12":3,"13":7,"14":6,"15":5,"16":5,"17":5,"18":9},"Brandon Doyle":{"1":5,"2":5,"3":5,"4":7,"5":8,"6":6,"7":6,"8":7,"9":6,"10":7,"11":4,"12":5,"13":8,"14":6,"15":5,"16":7,"17":8,"18":8},"Brayden Eicemann":{"1":5,"2":4,"3":3,"4":5,"5":5,"6":6,"7":4,"8":5,"9":5,"10":4,"11":5,"12":6,"13":5,"14":6,"15":4,"16":4,"17":6,"18":8},"Caleb House":{"1":6,"2":5,"3":3,"4":4,"5":6,"6":6,"7":6,"8":5,"9":7,"10":4,"11":4,"12":4,"13":8,"14":6,"15":5,"16":3,"17":6,"18":8},"Caleb Taylor":{"1":8,"2":8,"3":5,"4":6,"5":9,"6":6,"7":4,"8":5,"9":6,"10":8,"11":5,"12":5,"13":7,"14":7,"15":5,"16":5,"17":6,"18":7},"Cane McCoy":{"1":4,"2":4,"3":5,"4":5,"5":7,"6":4,"7":3,"8":4,"9":5,"10":5,"11":5,"12":2,"13":5,"14":4,"15":6,"16":2,"17":5,"18":7},"Carter Dubea":{"1":5,"2":6,"3":3,"4":6,"5":7,"6":4,"7":4,"8":6,"9":6,"10":7,"11":4,"12":5,"13":6,"14":5,"15":5,"16":3,"17":4,"18":6},"Carter Lachney":{"1":6,"2":6,"3":7,"4":6,"5":7,"6":6,"7":5,"8":5,"9":9,"10":8,"11":8,"12":7,"13":6,"14":9,"15":8,"16":6,"17":6,"18":9},"Carter Lowe":{"1":8,"2":7,"3":8,"4":6,"5":6,"6":7,"7":6,"8":6,"9":6,"10":7,"11":7,"12":6,"13":6,"14":6,"15":6,"16":6,"17":5,"18":7},"Carter Ward":{"1":7,"2":4,"3":5,"4":6,"5":7,"6":4,"7":4,"8":5,"9":5,"10":6,"11":4,"12":3,"13":5,"14":4,"15":5,"16":6,"17":6,"18":6},"Cole Leach":{"1":4,"2":4,"3":3,"4":4,"5":7,"6":5,"7":6,"8":5,"9":7,"10":5,"11":5,"12":4,"13":8,"14":4,"15":4,"16":4,"17":7,"18":7},"Cole Yupp":{"1":5,"2":6,"3":4,"4":6,"5":5,"6":6,"7":3,"8":5,"9":5,"10":3,"11":5,"12":3,"13":8,"14":5,"15":4,"16":4,"17":4,"18":7},"Drew Paton":{"1":5,"2":5,"3":4,"4":6,"5":5,"6":5,"7":3,"8":4,"9":6,"10":5,"11":5,"12":3,"13":6,"14":5,"15":5,"16":3,"17":5,"18":5},"Dylan Mayo":{"1":4,"2":6,"3":5,"4":8,"5":7,"6":5,"7":4,"8":4,"9":5,"10":5,"11":5,"12":4,"13":6,"14":8,"15":6,"16":6,"17":6,"18":7},"Eli Merrill":{"1":7,"2":4,"3":3,"4":5,"5":6,"6":4,"7":4,"8":3,"9":8,"10":4,"11":7,"12":4,"13":7,"14":6,"15":6,"16":3,"17":7,"18":8},"Ethan Prichard":{"1":5,"2":7,"3":4,"4":5,"5":6,"6":6,"7":5,"8":5,"9":8,"10":6,"11":5,"12":5,"13":6,"14":7,"15":8,"16":6,"17":7,"18":7},"Ethan Probasco":{"1":8,"2":7,"3":4,"4":6,"5":8,"6":5,"7":6,"8":9,"9":6,"10":5,"11":8,"12":6,"13":8,"14":9,"15":6,"16":8,"17":6,"18":8},"Gabe Wallace":{"1":4,"2":5,"3":3,"4":6,"5":6,"6":4,"7":3,"8":5,"9":7,"10":4,"11":4,"12":4,"13":6,"14":7,"15":4,"16":5,"17":4,"18":6},"Gavin Deutch":{"1":6,"2":6,"3":7,"4":8,"5":10,"6":9,"7":4,"8":6,"9":6,"10":6,"11":5,"12":7,"13":7,"14":8,"15":7,"16":4,"17":6,"18":7},"Hayden Gainey":{"1":5,"2":5,"3":5,"4":4,"5":9,"6":5,"7":6,"8":6,"9":6,"10":6,"11":6,"12":4,"13":8,"14":4,"15":6,"16":6,"17":6,"18":6},"Henry Guillermo":{"1":7,"2":5,"3":6,"4":5,"5":7,"6":6,"7":6,"8":5,"9":7,"10":6,"11":6,"12":7,"13":8,"14":8,"15":6,"16":4,"17":8,"18":6},"Ives Burgess":{"1":7,"2":6,"3":7,"4":6,"5":9,"6":6,"7":4,"8":7,"9":8,"10":5,"11":6,"12":7,"13":7,"14":8,"15":6,"16":4,"17":7,"18":6},"Jack Schexnyder":{"1":8,"2":6,"3":3,"4":5,"5":6,"6":5,"7":3,"8":6,"9":7,"10":5,"11":6,"12":7,"13":8,"14":7,"15":8,"16":5,"17":6,"18":6},"Jake McGuffee":{"1":6,"2":6,"3":8,"4":7,"5":6,"6":7,"7":5,"8":6,"9":8,"10":6,"11":7,"12":5,"13":9,"14":6,"15":5,"16":4,"17":5,"18":9},"Jayce Wright":{"1":4,"2":3,"3":3,"4":4,"5":5,"6":5,"7":2,"8":5,"9":6,"10":3,"11":3,"12":3,"13":5,"14":4,"15":5,"16":3,"17":4,"18":6},"Josiah Glaspell":{"1":7,"2":7,"3":6,"4":5,"5":7,"6":6,"7":4,"8":7,"9":10,"10":9,"11":8,"12":6,"13":7,"14":6,"15":7,"16":5,"17":8,"18":9},"Kane Hogan":{"1":4,"2":5,"3":3,"4":7,"5":6,"6":7,"7":4,"8":5,"9":8,"10":5,"11":5,"12":3,"13":6,"14":4,"15":6,"16":5,"17":6,"18":8},"Keegan Jeane":{"1":4,"2":5,"3":3,"4":5,"5":6,"6":5,"7":3,"8":5,"9":5,"10":7,"11":6,"12":3,"13":5,"14":7,"15":6,"16":4,"17":5,"18":5},"Killing Magee":{"1":5,"2":4,"3":4,"4":4,"5":6,"6":5,"7":4,"8":6,"9":5,"10":6,"11":5,"12":4,"13":7,"14":5,"15":7,"16":4,"17":5,"18":6},"Landon Goodwin":{"1":4,"2":5,"3":6,"4":5,"5":5,"6":6,"7":4,"8":3,"9":6,"10":3,"11":5,"12":5,"13":5,"14":4,"15":5,"16":3,"17":4,"18":5},"Landon Leach":{"1":5,"2":5,"3":4,"4":7,"5":7,"6":6,"7":4,"8":5,"9":7,"10":6,"11":6,"12":6,"13":6,"14":6,"15":7,"16":4,"17":5,"18":6},"Landon Sims":{"1":6,"2":6,"3":6,"4":5,"5":8,"6":5,"7":4,"8":7,"9":6,"10":5,"11":7,"12":4,"13":6,"14":8,"15":5,"16":4,"17":8,"18":6},"Lawson Davis":{"1":5,"2":7,"3":5,"4":8,"5":7,"6":5,"7":7,"8":6,"9":5,"10":7,"11":6,"12":3,"13":5,"14":6,"15":6,"16":4,"17":5,"18":7},"Liam Ross":{"1":3,"2":6,"3":5,"4":3,"5":7,"6":4,"7":5,"8":5,"9":5,"10":4,"11":3,"12":3,"13":7,"14":5,"15":4,"16":2,"17":5,"18":5},"Luke Guillory":{"1":7,"2":5,"3":4,"4":5,"5":8,"6":6,"7":4,"8":4,"9":7,"10":5,"11":5,"12":5,"13":6,"14":5,"15":4,"16":3,"17":4,"18":6},"Luke Self":{"1":4,"2":8,"3":5,"4":5,"5":7,"6":6,"7":4,"8":5,"9":5,"10":7,"11":4,"12":3,"13":5,"14":6,"15":5,"16":7,"17":6,"18":5},"Mason Jordan":{"1":5,"2":4,"3":6,"4":6,"5":6,"6":4,"7":3,"8":4,"9":7,"10":5,"11":4,"12":3,"13":7,"14":4,"15":4,"16":4,"17":4,"18":6},"Mason Merritt":{"1":6,"2":6,"3":4,"4":4,"5":9,"6":5,"7":3,"8":5,"9":5,"10":5,"11":6,"12":4,"13":6,"14":6,"15":4,"16":5,"17":6,"18":9},"Mason Ward":{"1":4,"2":4,"3":3,"4":3,"5":5,"6":4,"7":3,"8":4,"9":8,"10":4,"11":3,"12":3,"13":5,"14":6,"15":5,"16":5,"17":3,"18":5},"Mattox Leslie":{"1":6,"2":4,"3":4,"4":5,"5":5,"6":6,"7":3,"8":3,"9":7,"10":6,"11":5,"12":4,"13":5,"14":6,"15":6,"16":5,"17":6,"18":6},"Micah Merchant":{"1":6,"2":3,"3":2,"4":5,"5":5,"6":3,"7":3,"8":3,"9":7,"10":3,"11":5,"12":3,"13":5,"14":4,"15":4,"16":3,"17":3,"18":5},"Pacer Williams":{"1":5,"2":5,"3":3,"4":4,"5":6,"6":4,"7":5,"8":4,"9":5,"10":5,"11":5,"12":4,"13":5,"14":5,"15":4,"16":3,"17":5,"18":7},"Pete Mitchell":{"1":4,"2":7,"3":5,"4":6,"5":7,"6":5,"7":5,"8":6,"9":6,"10":5,"11":4,"12":3,"13":6,"14":7,"15":5,"16":4,"17":5,"18":6},"Pierce Regard":{"1":4,"2":5,"3":3,"4":5,"5":5,"6":4,"7":3,"8":4,"9":6,"10":5,"11":4,"12":3,"13":5,"14":6,"15":4,"16":4,"17":5,"18":5},"Seth Chatelain":{"1":5,"2":5,"3":7,"4":6,"5":7,"6":6,"7":3,"8":4,"9":7,"10":5,"11":5,"12":4,"13":6,"14":5,"15":5,"16":5,"17":4,"18":7},"Slade Merchant":{"1":4,"2":6,"3":4,"4":4,"5":6,"6":4,"7":5,"8":6,"9":7,"10":4,"11":6,"12":4,"13":5,"14":4,"15":4,"16":4,"17":4,"18":5},"Sully Thompson":{"1":6,"2":6,"3":6,"4":5,"5":8,"6":6,"7":4,"8":4,"9":6,"10":6,"11":6,"12":4,"13":7,"14":5,"15":6,"16":7,"17":6,"18":6},"Taylor Floyd":{"1":6,"2":4,"3":3,"4":3,"5":6,"6":4,"7":3,"8":4,"9":6,"10":4,"11":4,"12":3,"13":4,"14":4,"15":3,"16":4,"17":4,"18":5},"Trip Philen":{"1":5,"2":8,"3":5,"4":6,"5":8,"6":8,"7":4,"8":6,"9":9,"10":6,"11":7,"12":4,"13":6,"14":5,"15":5,"16":4,"17":6,"18":8},"Tucker Brazil":{"1":7,"2":7,"3":5,"4":5,"5":8,"6":7,"7":3,"8":5,"9":6,"10":6,"11":5,"12":6,"13":6,"14":5,"15":4,"16":3,"17":4,"18":6},"Ty Wilkerson":{"1":4,"2":5,"3":4,"4":7,"5":6,"6":5,"7":4,"8":7,"9":5,"10":4,"11":5,"12":3,"13":6,"14":4,"15":4,"16":5,"17":6,"18":6},"Will Poston":{"1":6,"2":7,"3":4,"4":6,"5":6,"6":6,"7":7,"8":5,"9":10,"10":8,"11":6,"12":8,"13":6,"14":7,"15":6,"16":8,"17":6,"18":6}};

const ALL_NAMES = Object.keys(SCORES_SEED);

const TOURNAMENTS_SEED = [
  { id:1, name:"District Tournament", date:"4/21/2026", tournamentType:"lhsaa18", holes:18,
    birdies:false, minPerHole:3, maxPerHole:4, pairingMethod:"bracket",
    course:"Links On Bayou", entryFee:15, scatEnabled:true, scatFee:5,
    clubIds:[], leagueId:1, status:"open",
    registrants:[...ALL_NAMES], checkedIn:[...ALL_NAMES],
    scores:SCORES_SEED, pairings:[] },
  { id:2, name:"LCC Big Game", date:"4/11/2026", tournamentType:"biggame", holes:18,
    birdies:true, minPerHole:4, maxPerHole:5, pairingMethod:"snake",
    course:"Lasalle CC", entryFee:20, scatEnabled:true, scatFee:10,
    clubIds:[], registrants:[], checkedIn:[], scores:{}, pairings:[] },
];

const USERS_SEED = [
  { id:1, name:"Admin",      username:"admin",   password:"admin123",  role:"admin",    email:"",                  courseScope:null, pin:"" },
  { id:2, name:"Dave Fuqua", username:"dfuqua",  password:"director1", role:"admin",    email:"ponk1950@gmail.com", courseScope:null, pin:"1234" },
  { id:3, name:"Josh Gullett",username:"jgullett",password:"director2",role:"director", email:"",                  courseScope:"Lasalle CC", pin:"" },
];

const PAIRING_METHODS = [
  { value:"snake",    label:"Snake Draft",    desc:"Balanced A/B/C/D tiers. Best for Big Game.", icon:"🐍" },
  { value:"bracket",  label:"HCP Brackets",   desc:"A/B/C/D brackets, mixed by school. Best for LHSAA.", icon:"📊" },
  { value:"handicap", label:"Handicap Order",  desc:"Low→high HCP, sequential fill.", icon:"🔢" },
  { value:"scramble", label:"Scramble",        desc:"Snake teams, two per hole A/B tee.", icon:"🎯" },
];

const TTYPE_OPTIONS = [
  { value:"lhsaa18",   label:"Stroke Play (LHSAA)", desc:"3–4 man groups, HCP bracket sorted" },
  { value:"biggame",   label:"Big Game",             desc:"4–5 man groups, HCP sorted" },
  { value:"scramble2", label:"2-Man Scramble",       desc:"Pairs, A tee + B tee per hole" },
  { value:"scramble4", label:"4-Man Scramble",       desc:"Teams of 4, A tee + B tee" },
];

const T_TYPE_META = {
  lhsaa18:  {label:"LHSAA",       color:"#166534",bg:"#dcfce7"},
  biggame:  {label:"Big Game",    color:"#1e40af",bg:"#dbeafe"},
  scramble2:{label:"2-Man Scram", color:"#92400e",bg:"#fef9c3"},
  scramble4:{label:"4-Man Scram", color:"#6b21a8",bg:"#f3e8ff"},
};

const SK = {
  users:"dg:users", golfers:"dg:golfers", teams:"dg:teams",
  tournaments:"dg:tournaments", courses:"dg:courses", leagues:"dg:leagues",
};

function store(key,val){try{localStorage.setItem(key,JSON.stringify(val));}catch(e){}}
function load(key,seed){
  try{const r=localStorage.getItem(key);if(r){const p=JSON.parse(r);if(p!=null)return p;}}catch(e){}
  return JSON.parse(JSON.stringify(seed));
}
function uuid(){
  if(typeof crypto!=="undefined"&&crypto.randomUUID)return crypto.randomUUID();
  return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,c=>{const r=Math.random()*16|0;return(c==="x"?r:(r&0x3|0x8)).toString(16);});
}
function hcpGroup(h){
  if(h<=18)return{label:"A",color:"#166534",bg:"#dcfce7"};
  if(h<=22)return{label:"B",color:"#1e40af",bg:"#dbeafe"};
  if(h<=26)return{label:"C",color:"#92400e",bg:"#fef9c3"};
  return{label:"D",color:"#991b1b",bg:"#fee2e2"};
}
function findCourse(courses,name){
  if(!name||!courses?.length)return null;
  const nl=name.trim().toLowerCase();
  return courses.find(x=>x.name.toLowerCase()===nl)
    ||courses.find(x=>x.name.toLowerCase().includes(nl)||nl.includes(x.name.toLowerCase()))
    ||courses.find(x=>(x.aliases||[]).some(a=>a.toLowerCase()===nl))
    ||null;
}
function getCaptain(players){
  const f=players.find(p=>p._captain);if(f)return f;
  return players.reduce((a,b)=>a.handicap<=b.handicap?a:b);
}

// ─── Pairing Engine ───────────────────────────────────────────────────────────
function interleaveByTeam(players){
  const byTeam={};
  players.forEach(p=>{if(!byTeam[p.team])byTeam[p.team]=[];byTeam[p.team].push(p);});
  const queues=Object.values(byTeam),result=[];let i=0;
  while(result.length<players.length){
    const q=queues[i%queues.length];if(q.length)result.push(q.shift());
    i++;if(i>players.length*3)break;
  }
  return result;
}
function assignHoles(rawGroups,maxHoles){
  return rawGroups.map((g,i)=>{
    const holeNum=(i%maxHoles)+1,wave=Math.floor(i/maxHoles);
    const holeName=wave>0?`${holeNum}${String.fromCharCode(64+wave)}`:String(holeNum);
    return{...g,hole:holeNum,wave,holeName};
  });
}
function teamSizes(N,min=4,max=5){
  if(N<=0)return[];if(N<=min)return[N];
  const extras=N%min;
  if(extras===0)return Array(N/min).fill(min);
  const bigCount=extras,smCount=Math.floor((N-bigCount*max)/min);
  if(smCount>=0&&smCount*min+bigCount*max===N)return[...Array(smCount).fill(min),...Array(bigCount).fill(max)];
  const groups=[];let rem=N;
  while(rem>max+min){groups.push(max);rem-=max;}
  groups.push(rem);
  if(groups.length>1&&groups[groups.length-1]<min)groups[groups.length-2]+=groups.pop();
  return groups;
}
function snakeDraft(sorted,min=4,max=5){
  const sizes=teamSizes(sorted.length,min,max);
  const teams=Array.from({length:sizes.length},()=>[]);
  let idx=0,round=0;
  while(idx<sorted.length){
    const order=round%2===0?Array.from({length:sizes.length},(_,i)=>i):Array.from({length:sizes.length},(_,i)=>sizes.length-1-i);
    for(const t of order){if(idx>=sorted.length)break;teams[t].push(sorted[idx++]);}
    round++;
  }
  return teams;
}
function groupsBySize(ordered,minSize=3,maxSize=4,maxGroups=18){
  const N=ordered.length;if(!N)return[];
  const numGroups=Math.min(maxGroups,Math.ceil(N/minSize));
  const bigCount=N-numGroups*minSize;const groups=[];let cur=0;
  for(let i=0;i<numGroups&&cur<N;i++){
    const size=i<bigCount?maxSize:minSize;
    groups.push({players:ordered.slice(cur,cur+size),tee:null});cur+=size;
  }
  return groups;
}
function buildCiGolfers(tournament,golfers){
  return(tournament?.checkedIn||[]).map(name=>{
    const f=golfers.find(g=>g.name===name);
    return f||{name,handicap:18,team:"",gender:"boys",clubs:[],_stub:true};
  });
}
function buildPairings(checkedIn,tournament,course,teams){
  if(!checkedIn?.length||!tournament)return[];
  const maxHoles=Math.min(course?.greens||18,tournament.holes||18);
  const minG=tournament.minPerHole||4,maxG=tournament.maxPerHole||5;
  const method=tournament.pairingMethod||(tournament.tournamentType==="lhsaa18"?"bracket":"snake");
  if(method==="bracket"){
    const sorted=[...checkedIn].sort((a,b)=>a.handicap!==b.handicap?a.handicap-b.handicap:(a.team||"").localeCompare(b.team||""));
    const brackets={A:[],B:[],C:[],D:[]};
    sorted.forEach(g=>brackets[hcpGroup(g.handicap).label].push(g));
    const ordered=[...interleaveByTeam(brackets.A),...interleaveByTeam(brackets.B),...interleaveByTeam(brackets.C),...interleaveByTeam(brackets.D)];
    return assignHoles(groupsBySize(ordered,minG,maxG,maxHoles),maxHoles);
  }
  if(method==="snake"){
    const sorted=[...checkedIn].sort((a,b)=>a.handicap-b.handicap);
    const ts=snakeDraft(sorted,minG,maxG);
    return assignHoles(ts.map(team=>({players:team.map((p,i)=>({...p,_captain:i===0})),tee:null})),maxHoles);
  }
  if(method==="handicap"){
    const sorted=[...checkedIn].sort((a,b)=>a.handicap-b.handicap);
    return assignHoles(groupsBySize(sorted,minG,maxG).map(g=>({...g,players:g.players.map((p,i)=>({...p,_captain:i===0}))})),maxHoles);
  }
  const sorted=[...checkedIn].sort((a,b)=>a.handicap-b.handicap);
  const st=snakeDraft(sorted,minG,maxG);const groups=[];
  for(let i=0;i<st.length;i+=2){
    const tA=(st[i]||[]).map(p=>({...p,_tee:"A",_captain:true}));
    const tB=(st[i+1]||[]).map(p=>({...p,_tee:"B",_captain:false}));
    groups.push({players:[...tA,...tB],teeA:st[i]||[],teeB:st[i+1]||[]});
  }
  return assignHoles(groups,maxHoles);
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{--green:#1a6641;--gl:#2d8a5a;--gd:#0d3d26;--gold:#c8a84b;--gold2:#e8c96a;--cream:#f4f0e8;--white:#fff;--ink:#1c1c1e;--muted:#6e6e73;--border:#e0dbd0;--red:#c0392b;--tab-h:68px;--hdr-h:56px;--r:14px;--rs:10px;--sh:0 2px 12px rgba(0,0,0,.08);--shl:0 8px 32px rgba(0,0,0,.16);}
html,body,#root{height:100%;overflow:hidden;}
body{font-family:'Nunito',sans-serif;background:var(--cream);color:var(--ink);-webkit-tap-highlight-color:transparent;overscroll-behavior:none;position:fixed;width:100%;}
.app{display:flex;flex-direction:column;height:100%;height:-webkit-fill-available;max-width:1100px;margin:0 auto;overflow:hidden;}
.hdr{height:var(--hdr-h);background:var(--gd);display:flex;align-items:center;justify-content:space-between;padding:0 16px;flex-shrink:0;z-index:50;}
.hdr-logo{font-family:'Bebas Neue',sans-serif;font-size:1.4rem;color:var(--gold);letter-spacing:3px;}
.scroll{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding:14px 14px calc(var(--tab-h) + env(safe-area-inset-bottom,0px) + 18px);}
.tabbar{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:1100px;height:calc(var(--tab-h) + env(safe-area-inset-bottom,0px));padding-bottom:env(safe-area-inset-bottom,0px);background:var(--white);border-top:1px solid var(--border);display:flex;align-items:flex-start;z-index:100;box-shadow:0 -4px 20px rgba(0,0,0,.08);}
.tab-btn{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;border:none;background:transparent;color:var(--muted);font-family:'Nunito',sans-serif;transition:color .15s;padding:8px 2px 10px;position:relative;}
.tab-btn.on{color:var(--green);}
.tab-btn.on::after{content:'';position:absolute;top:0;left:20%;right:20%;height:3px;background:var(--green);border-radius:0 0 4px 4px;}
.tab-ico{font-size:1.45rem;line-height:1;}.tab-lbl{font-size:.59rem;font-weight:800;text-transform:uppercase;letter-spacing:.5px;}
.more-bd{position:fixed;inset:0;z-index:190;}
.more-menu{position:fixed;bottom:calc(var(--tab-h)+8px);left:50%;transform:translateX(-50%);width:calc(100% - 28px);max-width:360px;background:var(--white);border-radius:var(--r);box-shadow:var(--shl);border:1px solid var(--border);z-index:200;overflow:hidden;}
.more-item{display:flex;align-items:center;gap:14px;padding:15px 18px;border-bottom:1px solid var(--border);cursor:pointer;font-weight:700;font-size:.93rem;transition:background .1s;}
.more-item:last-child{border-bottom:none;}.more-item:active{background:var(--cream);}.more-item.on{color:var(--green);}
.more-ico{font-size:1.2rem;width:26px;text-align:center;}
.card{background:var(--white);border-radius:var(--r);box-shadow:var(--sh);border:1px solid var(--border);overflow:hidden;margin-bottom:12px;}
.ch{padding:13px 16px 11px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:10px;}
.ct{font-family:'Bebas Neue',sans-serif;font-size:1.1rem;letter-spacing:1px;color:var(--gd);}
.cb{padding:14px 16px;}
.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px;}
.stat-tile{background:var(--white);border-radius:var(--rs);border:1px solid var(--border);padding:12px 6px;text-align:center;}
.sn{font-family:'Bebas Neue',sans-serif;font-size:1.9rem;color:var(--green);line-height:1;}
.sl{font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-top:2px;}
table{width:100%;border-collapse:collapse;font-size:.87rem;}
thead tr{background:var(--gd);color:var(--white);}
thead th{padding:9px 11px;text-align:left;font-size:.7rem;text-transform:uppercase;letter-spacing:.8px;white-space:nowrap;font-weight:800;}
tbody tr{border-bottom:1px solid var(--border);}tbody td{padding:10px 11px;vertical-align:middle;}
.badge{display:inline-flex;align-items:center;justify-content:center;padding:3px 9px;border-radius:20px;font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.4px;}
.btn{display:inline-flex;align-items:center;gap:5px;padding:11px 17px;border-radius:var(--rs);font-size:.87rem;font-weight:800;cursor:pointer;border:none;font-family:'Nunito',sans-serif;transition:all .12s;-webkit-tap-highlight-color:transparent;}
.btn-p{background:var(--green);color:var(--white);}.btn-p:active{background:var(--gd);}
.btn-g{background:var(--cream);color:var(--ink);border:1px solid var(--border);}.btn-g:active{background:var(--border);}
.btn-d{background:#fee2e2;color:var(--red);border:1px solid #fca5a5;}
.btn-sm{padding:6px 11px;font-size:.76rem;}.btn-full{width:100%;justify-content:center;}
.fg{display:flex;flex-direction:column;gap:4px;margin-bottom:12px;}
.fl{font-size:.7rem;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;}
input,select,textarea{padding:11px 12px;border:1.5px solid var(--border);border-radius:var(--rs);font-size:.93rem;font-family:'Nunito',sans-serif;background:var(--white);color:var(--ink);width:100%;-webkit-appearance:none;}
input:focus,select:focus{outline:none;border-color:var(--green);box-shadow:0 0 0 3px rgba(26,102,65,.12);}
.tog-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);}
.tog-row:last-child{border-bottom:none;}
.tog{position:relative;width:44px;height:26px;background:var(--border);border-radius:20px;cursor:pointer;border:none;flex-shrink:0;transition:background .2s;}
.tog.on{background:var(--green);}
.tog::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;background:white;border-radius:50%;transition:transform .2s;box-shadow:0 1px 4px rgba(0,0,0,.2);}
.tog.on::after{transform:translateX(18px);}
.sheet-ov{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:300;display:flex;align-items:flex-end;}
.sheet{background:var(--white);border-radius:20px 20px 0 0;width:100%;max-height:92vh;display:flex;flex-direction:column;}
.sh-handle{width:40px;height:4px;background:var(--border);border-radius:4px;margin:12px auto 0;flex-shrink:0;}
.sh-hdr{padding:14px 18px 12px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.sh-title{font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:1px;color:var(--gd);}
.sh-body{padding:16px 18px;overflow-y:auto;-webkit-overflow-scrolling:touch;flex:1;min-height:0;}
.sh-foot{padding:12px 18px calc(16px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--border);display:flex;gap:10px;flex-shrink:0;}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:11px;}
.lb-row{display:flex;align-items:center;gap:11px;padding:10px 15px;border-bottom:1px solid var(--border);}
.lb-row:last-child{border-bottom:none;}
.tc{background:var(--white);border-radius:var(--r);border:1px solid var(--border);margin-bottom:11px;overflow:hidden;box-shadow:var(--sh);}
.tch{padding:13px 16px 10px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.tct{font-family:'Bebas Neue',sans-serif;font-size:1.1rem;letter-spacing:1px;color:var(--gd);}
.tcm{font-size:.73rem;color:var(--muted);margin-top:1px;}.tcb{padding:11px 16px;}
.slbl{font-size:.67rem;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:var(--muted);padding:8px 2px 5px;}
.emp{text-align:center;padding:36px 20px;color:var(--muted);}
.emp-i{font-size:2.8rem;margin-bottom:7px;}.emp-t{font-size:.88rem;font-weight:700;}.emp-sub{font-size:.78rem;margin-top:4px;}
.chip{display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:.68rem;font-weight:800;background:var(--cream);border:1px solid var(--border);color:var(--muted);margin:2px;}
.ev-c{display:flex;align-items:center;gap:13px;padding:13px 16px;border-bottom:1px solid var(--border);}
.ev-c:last-child{border-bottom:none;}
.ev-db{background:var(--green);color:var(--white);border-radius:9px;padding:7px 9px;text-align:center;min-width:46px;flex-shrink:0;}
.ev-mo{font-size:.58rem;font-weight:800;text-transform:uppercase;letter-spacing:1px;}
.ev-dy{font-family:'Bebas Neue',sans-serif;font-size:1.5rem;line-height:1;}
.mb{height:6px;background:var(--border);border-radius:4px;overflow:hidden;margin-top:3px;}
.mbf{height:100%;background:var(--green);border-radius:4px;}
.team-row{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid var(--border);cursor:pointer;}
.team-row:last-child{border-bottom:none;}.team-row:active{background:var(--cream);}
`;

// ─── Small Components ─────────────────────────────────────────────────────────
function Toggle({value,onChange}){return <button className={`tog${value?" on":""}`} onClick={()=>onChange(!value)}/>;}
function HBadge({h}){const g=hcpGroup(h);return <span className="badge" style={{background:g.bg,color:g.color}}>{g.label}·{h}</span>;}
function Sheet({open,onClose,title,children,footer}){
  if(!open)return null;
  return(
    <div className="sheet-ov" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="sheet">
        <div className="sh-handle"/>
        <div className="sh-hdr"><span className="sh-title">{title}</span><button className="btn btn-g btn-sm" onClick={onClose}>✕</button></div>
        <div className="sh-body">{children}</div>
        {footer&&<div className="sh-foot">{footer}</div>}
      </div>
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({users,onLogin}){
  const [name,setName]=useState("");const [pin,setPin]=useState("");const [err,setErr]=useState("");
  function attempt(){
    const n=name.trim().toLowerCase(),p=pin.trim();
    if((n==="dave fuqua"||n==="dave"||n==="dfuqua")&&(p==="1234"||p==="director1")){onLogin({id:2,name:"Dave Fuqua",role:"admin",pin:"1234",password:"director1"});return;}
    const u=users.find(x=>(x.name.toLowerCase()===n||x.username===n)&&(String(x.pin)===p||x.password===p));
    if(u){setErr("");onLogin(u);}else setErr("Name or PIN not found");
  }
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--gd)",padding:20}}>
      <div style={{background:"white",borderRadius:16,padding:28,width:"100%",maxWidth:360,boxShadow:"0 8px 32px rgba(0,0,0,.2)"}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"2.2rem",color:"var(--green)",textAlign:"center",marginBottom:2}}>⛳ TURNEE GOLF</div>
        <div style={{textAlign:"center",color:"var(--muted)",fontSize:".85rem",fontWeight:700,marginBottom:20}}>Tournament Manager</div>
        <div className="fg"><label className="fl">Name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Dave Fuqua" onKeyDown={e=>e.key==="Enter"&&attempt()}/></div>
        <div className="fg"><label className="fl">PIN / Password</label><input type="password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="1234" onKeyDown={e=>e.key==="Enter"&&attempt()}/></div>
        {err&&<div style={{color:"var(--red)",fontSize:".82rem",fontWeight:700,marginBottom:8}}>⚠️ {err}</div>}
        <button className="btn btn-p btn-full" style={{marginBottom:8}} onClick={attempt}>Sign In →</button>
        <button onClick={()=>onLogin({id:2,name:"Dave Fuqua",role:"admin",pin:"1234",password:"director1"})}
          style={{display:"block",width:"100%",padding:"11px",background:"#f0fdf4",border:"2px solid var(--green)",borderRadius:8,color:"var(--green)",fontSize:".9rem",fontWeight:900,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>
          ⚡ Sign In as Dave Fuqua (Admin)
        </button>
        <div style={{textAlign:"center",marginTop:10,fontSize:".72rem",color:"var(--muted)"}}>Dave Fuqua · PIN 1234</div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({golfers,tournaments,teams}){
  const byTeam={};golfers.forEach(g=>{byTeam[g.team]=(byTeam[g.team]||0)+1;});
  const months=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return(
    <div>
      <div className="stat-row">
        <div className="stat-tile"><div className="sn">{golfers.length}</div><div className="sl">Golfers</div></div>
        <div className="stat-tile"><div className="sn">{tournaments.length}</div><div className="sl">Events</div></div>
        <div className="stat-tile"><div className="sn">{Object.keys(byTeam).length}</div><div className="sl">Schools</div></div>
        <div className="stat-tile"><div className="sn">{tournaments.reduce((a,t)=>Math.max(a,(t.checkedIn||[]).length),0)}</div><div className="sl">Top Field</div></div>
      </div>
      <div className="slbl">Upcoming Events</div>
      <div className="card">
        {tournaments.map(t=>{const p=(t.date||"").split("/");return(
          <div className="ev-c" key={t.id}>
            <div className="ev-db"><div className="ev-mo">{months[parseInt(p[0])]||""}</div><div className="ev-dy">{p[1]||""}</div></div>
            <div><div style={{fontWeight:800,fontSize:".92rem"}}>{t.name}</div><div style={{fontSize:".73rem",color:"var(--muted)"}}>{t.course} · {t.holes||18}H</div></div>
          </div>
        );})}
        {!tournaments.length&&<div className="emp"><div className="emp-i">📅</div><div className="emp-t">No events yet</div></div>}
      </div>
      <div className="slbl">Roster by School</div>
      <div className="card"><div className="cb">
        {Object.entries(byTeam).sort((a,b)=>b[1]-a[1]).map(([s,n])=>(
          <div key={s} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:".82rem",marginBottom:3}}><span style={{fontWeight:700}}>{s}</span><span style={{color:"var(--muted)"}}>{n}</span></div>
            <div className="mb"><div className="mbf" style={{width:`${Math.min(100,(n/6)*100)}%`}}/></div>
          </div>
        ))}
      </div></div>
    </div>
  );
}

// ─── Golfers Page ─────────────────────────────────────────────────────────────
function GolfersPage({golfers,setGolfers,teams,setTournaments}){
  const [search,setSearch]=useState("");const [editing,setEditing]=useState(null);const [form,setForm]=useState({});
  const schoolList=[...new Set(golfers.map(g=>g.team).filter(Boolean))].sort();
  const filtered=golfers.filter(g=>!search||g.name.toLowerCase().includes(search.toLowerCase())||(g.team||"").toLowerCase().includes(search.toLowerCase())).sort((a,b)=>a.name.localeCompare(b.name));
  function openEdit(g){setEditing(g);setForm({...g});}
  function saveEdit(){setGolfers(prev=>prev.map(g=>g.id===editing.id?{...g,...form}:g));setEditing(null);}
  return(
    <div>
      <div style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search ${golfers.length} players…`}
          style={{flex:1,padding:"9px 12px",border:"1.5px solid var(--border)",borderRadius:"var(--rs)",fontFamily:"'Nunito',sans-serif",fontSize:".9rem",fontWeight:700,outline:"none"}}/>
        {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",fontSize:"1.2rem",cursor:"pointer",color:"var(--muted)"}}>✕</button>}
      </div>
      <div style={{fontSize:".72rem",color:"var(--muted)",fontWeight:700,padding:"4px 2px 8px"}}>{filtered.length} players · tap to edit</div>
      <div className="card">
        {filtered.map(g=>(
          <div key={g.id} onClick={()=>openEdit(g)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderBottom:"1px solid var(--border)",cursor:"pointer"}}>
            <div style={{flex:1}}><div style={{fontWeight:800,fontSize:".92rem"}}>{g.name}</div><div style={{fontSize:".72rem",color:"var(--muted)",marginTop:1}}>{g.team||"No team"} · HCP {g.handicap}</div></div>
            <HBadge h={g.handicap}/><span style={{color:"var(--muted)",fontSize:".8rem"}}>✏️</span>
          </div>
        ))}
        {!filtered.length&&<div className="emp"><div className="emp-i">🔍</div><div className="emp-t">No players found</div></div>}
      </div>
      {editing&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:300,display:"flex",alignItems:"flex-end"}} onClick={e=>{if(e.target===e.currentTarget)setEditing(null);}}>
          <div style={{background:"white",width:"100%",borderRadius:"16px 16px 0 0",padding:"20px 16px 32px"}}>
            <div style={{fontWeight:900,fontSize:"1rem",marginBottom:14}}>Edit Player</div>
            <div className="fg"><label className="fl">Name</label><input value={form.name||""} onChange={e=>setForm(p=>({...p,name:e.target.value}))}/></div>
            <div className="fg"><label className="fl">Team / School</label>
              <select value={form.team||""} onChange={e=>setForm(p=>({...p,team:e.target.value}))}>
                <option value="">-- Select --</option>{schoolList.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="fg"><label className="fl">Handicap</label><input type="number" min="0" max="54" value={form.handicap||""} onChange={e=>setForm(p=>({...p,handicap:parseInt(e.target.value)||0}))}/></div>
            <div style={{display:"flex",gap:10,marginTop:8}}>
              <button className="btn btn-g" style={{flex:1}} onClick={()=>setEditing(null)}>Cancel</button>
              <button className="btn btn-d" style={{flex:1}} onClick={()=>{const n=editing.name;setGolfers(prev=>prev.filter(g=>g.id!==editing.id));setTournaments(prev=>prev.map(t=>({...t,registrants:(t.registrants||[]).filter(r=>r!==n),checkedIn:(t.checkedIn||[]).filter(r=>r!==n)})));setEditing(null);}}>🗑</button>
              <button className="btn btn-p" style={{flex:2}} onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Teams Page ───────────────────────────────────────────────────────────────
function TeamsPage({golfers,teams,setTeams}){
  const [sheet,setSheet]=useState(false);const [form,setForm]=useState({name:"",type:"school",color:"#166534",gender:"boys"});const [editT,setEditT]=useState(null);
  function openAdd(){setForm({name:"",type:"school",color:"#166534",gender:"boys"});setEditT(null);setSheet(true);}
  function openEdit(t){setForm({...t});setEditT(t);setSheet(true);}
  function save(){if(!form.name.trim())return;if(editT)setTeams(p=>p.map(t=>t.id===editT.id?{...t,...form}:t));else setTeams(p=>[...p,{...form,id:uuid(),aliases:[]}]);setSheet(false);}
  const schools=teams.filter(t=>t.type==="school"),clubs=teams.filter(t=>t.type==="club");
  return(
    <div>
      <button className="btn btn-p btn-full" style={{marginBottom:12}} onClick={openAdd}>+ Add Team / Club</button>
      {schools.length>0&&<><div className="slbl">Schools ({schools.length})</div><div className="card">{schools.map(t=>(
        <div key={t.id} className="team-row" onClick={()=>openEdit(t)}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:10,height:10,borderRadius:"50%",background:t.color,flexShrink:0}}/><div><div style={{fontWeight:700}}>{t.name}</div><div style={{fontSize:".72rem",color:"var(--muted)"}}>{golfers.filter(g=>g.team===t.name).length} golfers · {t.gender}</div></div></div>
          <span style={{fontSize:".8rem",color:"var(--muted)"}}>✏️</span>
        </div>
      ))}</div></>}
      {clubs.length>0&&<><div className="slbl">Clubs ({clubs.length})</div><div className="card">{clubs.map(t=>(
        <div key={t.id} className="team-row" onClick={()=>openEdit(t)}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:10,height:10,borderRadius:"50%",background:t.color,flexShrink:0}}/><div><div style={{fontWeight:700}}>{t.name}</div><div style={{fontSize:".72rem",color:"var(--muted)"}}>{t.gender}</div></div></div>
          <span style={{fontSize:".8rem",color:"var(--muted)"}}>✏️</span>
        </div>
      ))}</div></>}
      <Sheet open={sheet} onClose={()=>setSheet(false)} title={editT?"Edit Team":"New Team"}
        footer={<><button className="btn btn-g" style={{flex:1}} onClick={()=>setSheet(false)}>Cancel</button>{editT&&<button className="btn btn-d" style={{flex:1}} onClick={()=>{setTeams(p=>p.filter(t=>t.id!==editT.id));setSheet(false);}}>Delete</button>}<button className="btn btn-p" style={{flex:2}} onClick={save}>Save</button></>}>
        <div className="fg"><label className="fl">Name</label><input value={form.name||""} onChange={e=>setForm(p=>({...p,name:e.target.value}))}/></div>
        <div className="g2">
          <div className="fg"><label className="fl">Type</label><select value={form.type||"school"} onChange={e=>setForm(p=>({...p,type:e.target.value}))}><option value="school">School</option><option value="club">Club</option></select></div>
          <div className="fg"><label className="fl">Gender</label><select value={form.gender||"boys"} onChange={e=>setForm(p=>({...p,gender:e.target.value}))}><option value="boys">Boys</option><option value="girls">Girls</option><option value="mixed">Mixed</option></select></div>
        </div>
        <div className="fg"><label className="fl">Color</label><input type="color" value={form.color||"#166534"} onChange={e=>setForm(p=>({...p,color:e.target.value}))} style={{height:44,padding:4}}/></div>
      </Sheet>
    </div>
  );
}

// ─── Courses Page ─────────────────────────────────────────────────────────────
function CoursesPage({courses,setCourses}){
  const [sheet,setSheet]=useState(false);const [editC,setEditC]=useState(null);const [form,setForm]=useState({});
  function openAdd(){setForm({name:"",rating:72,greens:18,teeBoxes:18,holes:18,par:Array(18).fill(4)});setEditC(null);setSheet(true);}
  function openEdit(c){setForm({...c,par:[...(c.par||Array(18).fill(4))]});setEditC(c);setSheet(true);}
  function changePar(i,v){setForm(p=>{const par=[...p.par];par[i]=parseInt(v)||4;return{...p,par};});}
  function save(){if(!form.name.trim())return;if(editC)setCourses(p=>p.map(c=>c.name===editC.name?{...c,...form}:c));else setCourses(p=>[...p,{...form}]);setSheet(false);}
  return(
    <div>
      <button className="btn btn-p btn-full" style={{marginBottom:12}} onClick={openAdd}>+ Add Course</button>
      {courses.map(c=>(
        <div key={c.name} className="card" style={{cursor:"pointer"}} onClick={()=>openEdit(c)}>
          <div className="ch"><div><div className="ct">{c.name}</div><div style={{fontSize:".75rem",color:"var(--muted)"}}>Rating {c.rating} · Par {(c.par||[]).reduce((a,b)=>a+b,0)} · {c.greens} greens</div></div><button className="btn btn-g btn-sm">Edit</button></div>
          <div style={{display:"flex",padding:"8px 14px",overflowX:"auto"}}>
            {(c.par||[]).map((p,i)=><div key={i} style={{textAlign:"center",minWidth:28,padding:"2px 0"}}><div style={{fontSize:".58rem",color:"var(--muted)",fontWeight:700}}>{i+1}</div><div style={{fontWeight:800,fontSize:".82rem"}}>{p}</div></div>)}
          </div>
        </div>
      ))}
      <Sheet open={sheet} onClose={()=>setSheet(false)} title={editC?"Edit Course":"New Course"}
        footer={<><button className="btn btn-g" style={{flex:1}} onClick={()=>setSheet(false)}>Cancel</button><button className="btn btn-p" style={{flex:2}} onClick={save}>Save</button></>}>
        <div className="fg"><label className="fl">Course Name</label><input value={form.name||""} onChange={e=>setForm(p=>({...p,name:e.target.value}))}/></div>
        <div className="g2">
          <div className="fg"><label className="fl">Rating</label><input type="number" step=".1" value={form.rating||72} onChange={e=>setForm(p=>({...p,rating:parseFloat(e.target.value)}))}/></div>
          <div className="fg"><label className="fl">Greens</label><select value={form.greens||18} onChange={e=>setForm(p=>({...p,greens:parseInt(e.target.value)}))}><option value={9}>9</option><option value={18}>18</option></select></div>
        </div>
        <div style={{fontSize:".72rem",fontWeight:800,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"1px",margin:"10px 0 6px"}}>Front 9 Par</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(9,1fr)",gap:4,marginBottom:12}}>
          {Array.from({length:9},(_,i)=><div key={i} style={{textAlign:"center"}}><div style={{fontSize:".58rem",fontWeight:800,color:"var(--muted)",marginBottom:2}}>H{i+1}</div><input type="number" min={3} max={6} value={(form.par||[])[i]||4} onChange={e=>changePar(i,e.target.value)} style={{padding:"6px 2px",textAlign:"center",fontSize:".9rem",fontWeight:800}}/></div>)}
        </div>
        {(form.greens||18)===18&&<>
          <div style={{fontSize:".72rem",fontWeight:800,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 6px"}}>Back 9 Par</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(9,1fr)",gap:4}}>
            {Array.from({length:9},(_,i)=><div key={i} style={{textAlign:"center"}}><div style={{fontSize:".58rem",fontWeight:800,color:"var(--muted)",marginBottom:2}}>H{i+10}</div><input type="number" min={3} max={6} value={(form.par||[])[i+9]||4} onChange={e=>changePar(i+9,e.target.value)} style={{padding:"6px 2px",textAlign:"center",fontSize:".9rem",fontWeight:800}}/></div>)}
          </div>
        </>}
        <div style={{marginTop:10,fontSize:".78rem",color:"var(--muted)",fontWeight:700}}>Total Par: {(form.par||[]).reduce((a,b)=>a+b,0)} · Out: {(form.par||[]).slice(0,9).reduce((a,b)=>a+b,0)} · In: {(form.par||[]).slice(9).reduce((a,b)=>a+b,0)}</div>
      </Sheet>
    </div>
  );
}

// ─── Users Page ───────────────────────────────────────────────────────────────
function UsersPage({users,setUsers,courses}){
  const [sheet,setSheet]=useState(false);const [editU,setEditU]=useState(null);const [form,setForm]=useState({});
  function openEdit(u){setForm({...u});setEditU(u);setSheet(true);}
  function openAdd(){setForm({name:"",username:"",password:"",role:"golfer",email:"",pin:""});setEditU(null);setSheet(true);}
  function save(){if(!form.name?.trim())return;if(editU)setUsers(p=>p.map(u=>u.id===editU.id?{...u,...form}:u));else setUsers(p=>[...p,{...form,id:uuid()}]);setSheet(false);}
  const RC={admin:{bg:"#dcfce7",c:"#166534"},director:{bg:"#dbeafe",c:"#1e40af"},golfer:{bg:"#fef9c3",c:"#92400e"}};
  return(
    <div>
      <button className="btn btn-p btn-full" style={{marginBottom:12}} onClick={openAdd}>+ Add User</button>
      <div className="card">
        {users.map(u=>{const rc=RC[u.role]||RC.golfer;return(
          <div key={u.id} onClick={()=>openEdit(u)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderBottom:"1px solid var(--border)",cursor:"pointer"}}>
            <div style={{flex:1}}><div style={{fontWeight:800}}>{u.name}</div><div style={{fontSize:".72rem",color:"var(--muted)"}}>{u.email||u.username} · PIN {u.pin||"—"}</div></div>
            <span className="badge" style={{background:rc.bg,color:rc.c}}>{u.role}</span>
          </div>
        );})}
      </div>
      <Sheet open={sheet} onClose={()=>setSheet(false)} title={editU?"Edit User":"New User"}
        footer={<><button className="btn btn-g" style={{flex:1}} onClick={()=>setSheet(false)}>Cancel</button>{editU&&<button className="btn btn-d" style={{flex:1}} onClick={()=>{setUsers(p=>p.filter(u=>u.id!==editU.id));setSheet(false);}}>Delete</button>}<button className="btn btn-p" style={{flex:2}} onClick={save}>Save</button></>}>
        <div className="fg"><label className="fl">Full Name</label><input value={form.name||""} onChange={e=>setForm(p=>({...p,name:e.target.value}))}/></div>
        <div className="g2">
          <div className="fg"><label className="fl">Username</label><input value={form.username||""} onChange={e=>setForm(p=>({...p,username:e.target.value}))}/></div>
          <div className="fg"><label className="fl">PIN</label><input value={form.pin||""} onChange={e=>setForm(p=>({...p,pin:e.target.value}))}/></div>
        </div>
        <div className="fg"><label className="fl">Password</label><input type="password" value={form.password||""} onChange={e=>setForm(p=>({...p,password:e.target.value}))}/></div>
        <div className="fg"><label className="fl">Email</label><input value={form.email||""} onChange={e=>setForm(p=>({...p,email:e.target.value}))}/></div>
        <div className="fg"><label className="fl">Role</label><select value={form.role||"golfer"} onChange={e=>setForm(p=>({...p,role:e.target.value}))}>{["admin","director","golfer"].map(r=><option key={r} value={r}>{r}</option>)}</select></div>
        {form.role==="director"&&<div className="fg"><label className="fl">Course Scope</label><select value={form.courseScope||""} onChange={e=>setForm(p=>({...p,courseScope:e.target.value||null}))}><option value="">All Courses</option>{(courses||[]).map(c=><option key={c.name} value={c.name}>{c.name}</option>)}</select></div>}
      </Sheet>
    </div>
  );
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────
function LeaderboardPage({golfers,tournaments,courses,activeTid}){
  const [tid,setTid]=useState(String(activeTid||tournaments[0]?.id||""));
  const [tab,setTab]=useState("individual");
  const [printView,setPrintView]=useState(false);
  useEffect(()=>{if(activeTid)setTid(String(activeTid));},[activeTid]);
  const tournament=tournaments.find(t=>String(t.id)===String(tid));
  const course=tournament?findCourse(courses,tournament.course):null;
  const coursePar=course?.par||Array(18).fill(4);
  const holeCount=tournament?.holes||18;
  const scores=tournament?.scores||{};
  const ciNames=tournament?.checkedIn||[];
  const holes=Array.from({length:holeCount},(_,i)=>i+1);
  const ranked=ciNames.map(name=>{
    const g=golfers.find(x=>x.name===name)||{name,handicap:18,team:""};
    const s=scores[name]||{};
    const gross=holes.reduce((a,h)=>a+(s[h]||0),0);
    return{...g,gross,net:gross-g.handicap,scored:gross>0};
  }).filter(g=>g.scored).sort((a,b)=>a.gross-b.gross);
  const schoolMap={};
  ranked.forEach(g=>{if(!schoolMap[g.team])schoolMap[g.team]=[];schoolMap[g.team].push(g);});
  const teamRanked=Object.entries(schoolMap).map(([school,players])=>{
    const sorted=[...players].sort((a,b)=>a.gross-b.gross);const top4=sorted.slice(0,4);
    return{school,players:sorted,top4,total:top4.reduce((a,g)=>a+g.gross,0),qualified:top4.length>=4};
  }).sort((a,b)=>{if(a.qualified&&!b.qualified)return -1;if(!a.qualified&&b.qualified)return 1;return a.total-b.total;});

  function saveTeamPdf(){
    const rows=teamRanked.map((t,i)=>{
      const medal=i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`;
      const headerBg=i===0?"#c8a84b":i===1?"#94a3b8":i===2?"#b45309":"#0d3d26";
      const headerColor=i<3?"#1c1c1e":"white";
      const playerRows=t.players.map((g,pi)=>`<tr style="background:${pi<4?"rgba(26,102,65,.05)":"#fef2f2"}"><td style="padding:6px 12px;font-weight:${pi<4?800:400};color:${pi<4?"#1c1c1e":"#999"}">${pi+1}. ${g.name}${pi>=4?" <em style='font-size:10px;color:#dc2626'>(not counted)</em>":""}</td><td style="padding:6px 12px;color:#666;font-size:12px">${g.team}</td><td style="padding:6px 12px;text-align:center;color:#666;font-size:12px">HCP ${g.handicap}</td><td style="padding:6px 12px;text-align:center;font-weight:${pi<4?900:400};color:${pi<4?"#1c1c1e":"#999"}">${g.gross}</td></tr>`).join("");
      return`<div style="margin-bottom:20px;border:2px solid #333;border-radius:8px;overflow:hidden;page-break-inside:avoid"><div style="background:${headerBg};color:${headerColor};padding:10px 16px;display:flex;justify-content:space-between;align-items:center"><div><div style="font-weight:900;font-size:16px">${medal} ${t.school}</div><div style="font-size:11px;opacity:.85">${t.qualified?`${t.top4.length} scores counted`:`Only ${t.players.length}/4 scored`}</div></div><div style="text-align:right"><div style="font-weight:900;font-size:22px">${t.qualified?t.total:"–"}</div><div style="font-size:11px;opacity:.85">team gross</div></div></div><table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif"><thead><tr style="background:#f4f0e8"><th style="padding:5px 12px;text-align:left;font-size:11px;color:#666">Player</th><th style="padding:5px 12px;text-align:left;font-size:11px;color:#666">School</th><th style="padding:5px 12px;text-align:center;font-size:11px;color:#666">HCP</th><th style="padding:5px 12px;text-align:center;font-size:11px;color:#666">Gross</th></tr></thead><tbody>${playerRows}</tbody></table></div>`;
    }).join("");
    const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Team Scores – ${tournament?.name||""}</title><style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:Arial,sans-serif;padding:20px;background:white;}h1{font-size:20px;margin-bottom:4px;}p{font-size:13px;color:#666;margin-bottom:16px;}@media print{body{padding:10px;}}</style></head><body><h1>Team Scores — ${tournament?.name||""}</h1><p>${tournament?.date||""} · ${tournament?.course||""} · Best 4 scores per team</p>${rows}</body></html>`;
    const blob=new Blob([html],{type:"text/html"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=`team_scores_${(tournament?.name||"").replace(/\s+/g,"_")}.html`;
    a.click();URL.revokeObjectURL(url);
  }

  if(printView){return(
    <div style={{position:"fixed",inset:0,background:"white",zIndex:400,display:"flex",flexDirection:"column"}}>
      <div style={{background:"var(--gd)",color:"white",padding:"12px 16px",display:"flex",gap:10,alignItems:"center",flexShrink:0}}>
        <button onClick={()=>setPrintView(false)} style={{background:"rgba(255,255,255,.2)",border:"none",color:"white",fontWeight:800,padding:"6px 14px",borderRadius:6,cursor:"pointer"}}>← Back</button>
        <div style={{flex:1,fontWeight:900,textAlign:"center"}}>Team Scores — {tournament?.name}</div>
        <button onClick={saveTeamPdf} style={{background:"var(--gold)",border:"none",color:"#1c1c1e",fontWeight:900,padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:".82rem"}}>⬇ Save PDF</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:16}}>
        {teamRanked.map((t,i)=>(
          <div key={t.school} style={{marginBottom:16,border:"2px solid #333",borderRadius:8,overflow:"hidden"}}>
            <div style={{background:i===0?"var(--gold)":i===1?"#94a3b8":i===2?"#b45309":"var(--gd)",color:i<3?"#1c1c1e":"white",padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div><div style={{fontWeight:900,fontSize:"1.1rem"}}>#{i+1} {t.school}</div><div style={{fontSize:".78rem",opacity:.85}}>{t.qualified?`${t.top4.length} scores counted`:`⚠️ Only ${t.players.length}/4 scored`}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontWeight:900,fontSize:"1.4rem"}}>{t.qualified?t.total:"–"}</div><div style={{fontSize:".75rem",opacity:.85}}>team gross</div></div>
            </div>
            {t.players.map((g,pi)=>(
              <div key={g.name} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 16px",borderBottom:"1px solid var(--border)",background:pi<4?"rgba(26,102,65,.04)":"#fef2f2"}}>
                <div style={{width:22,height:22,borderRadius:"50%",flexShrink:0,fontSize:".75rem",fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",background:pi<4?"var(--green)":"#e5e7eb",color:pi<4?"white":"var(--muted)"}}>{pi+1}</div>
                <div style={{flex:1}}><div style={{fontWeight:800,fontSize:".88rem"}}>{g.name}</div><div style={{fontSize:".7rem",color:"var(--muted)"}}>HCP {g.handicap}</div></div>
                <div style={{fontWeight:900}}>{g.gross}</div>
                {pi>=4&&<div style={{fontSize:".65rem",color:"#dc2626",fontWeight:700}}>not counted</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );}

  return(
    <div>
      <div className="card" style={{marginBottom:12}}><div style={{padding:"10px 14px"}}>
        <select value={tid} onChange={e=>setTid(e.target.value)} style={{width:"100%",padding:"9px 8px",border:"1.5px solid var(--border)",borderRadius:"var(--rs)",fontFamily:"'Nunito',sans-serif",fontSize:".9rem",fontWeight:700}}>
          {tournaments.map(t=><option key={t.id} value={String(t.id)}>{t.name} — {t.date}</option>)}
        </select>
      </div></div>
      <div style={{display:"flex",marginBottom:12,borderRadius:"var(--rs)",overflow:"hidden",border:"1.5px solid var(--border)"}}>
        {[["individual","👤 Individual"],["team","🏫 Team"]].map(([v,l])=>(
          <button key={v} onClick={()=>setTab(v)} style={{flex:1,padding:"10px",border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:".85rem",background:tab===v?"var(--green)":"white",color:tab===v?"white":"var(--muted)"}}>{l}</button>
        ))}
      </div>
      {tab==="individual"&&(ranked.length===0?<div className="emp card"><div className="emp-i">🏆</div><div className="emp-t">No scores yet</div></div>:
        <div className="card">
          {ranked.map((g,i)=>(
            <div key={g.name} className="lb-row" style={{background:i===0?"rgba(26,102,65,.04)":"white"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"1.35rem",color:i===0?"var(--gold)":i===1?"#94a3b8":i===2?"#b45309":"var(--muted)",width:26,flexShrink:0}}>{i+1}</div>
              <div style={{flex:1}}><div style={{fontWeight:800}}>{g.name}</div><div style={{fontSize:".72rem",color:"var(--muted)"}}>{g.team} · HCP {g.handicap}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontWeight:800,fontSize:"1.1rem"}}>{g.gross}</div></div>
            </div>
          ))}
        </div>
      )}
      {tab==="team"&&(
        <div>
          <button onClick={()=>setPrintView(true)} style={{width:"100%",marginBottom:12,padding:"11px",background:"var(--green)",color:"white",border:"none",borderRadius:"var(--rs)",fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:".9rem",cursor:"pointer"}}>🖨 Print Team Scores</button>
          {teamRanked.length===0?<div className="emp card"><div className="emp-i">🏫</div><div className="emp-t">No team scores yet</div></div>:
            teamRanked.map((t,i)=>(
              <div key={t.school} className="card" style={{marginBottom:12}}>
                <div style={{background:"var(--gd)",color:"white",padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div><div style={{fontWeight:900,fontSize:".95rem"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`} {t.school}</div>
                    {!t.qualified&&<div style={{fontSize:".7rem",background:"#dc2626",borderRadius:4,padding:"1px 6px",marginTop:2,display:"inline-block"}}>⚠️ Need {4-t.players.length} more</div>}
                  </div>
                  <div style={{textAlign:"right"}}><div style={{fontWeight:900,fontSize:"1.2rem"}}>{t.qualified?t.total:"–"}</div><div style={{fontSize:".7rem",opacity:.8}}>best 4 gross</div></div>
                </div>
                {t.top4.map((g,pi)=>(
                  <div key={g.name} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderBottom:"1px solid var(--border)",background:"rgba(26,102,65,.02)"}}>
                    <div style={{width:20,height:20,borderRadius:"50%",background:"var(--green)",color:"white",fontWeight:900,fontSize:".72rem",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{pi+1}</div>
                    <div style={{flex:1}}><div style={{fontWeight:800,fontSize:".88rem"}}>{g.name}</div><div style={{fontSize:".7rem",color:"var(--muted)"}}>HCP {g.handicap}</div></div>
                    <div style={{fontWeight:900}}>{g.gross}</div>
                  </div>
                ))}
                {t.players.length>4&&t.players.slice(4).map((g,pi)=>(
                  <div key={g.name} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",borderBottom:"1px solid var(--border)",background:"#fef2f2",opacity:.7}}>
                    <div style={{width:20,height:20,borderRadius:"50%",background:"#e5e7eb",color:"var(--muted)",fontWeight:900,fontSize:".72rem",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{pi+5}</div>
                    <div style={{flex:1}}><div style={{fontWeight:700,fontSize:".85rem"}}>{g.name}</div><div style={{fontSize:".7rem",color:"var(--muted)"}}>HCP {g.handicap}</div></div>
                    <div style={{fontSize:".8rem",color:"var(--muted)",fontWeight:700}}>{g.gross} <span style={{fontSize:".65rem"}}>not counted</span></div>
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

// ─── Scorecard Entry ──────────────────────────────────────────────────────────
function ScoreRow({holes,label,labelPar,coursePar,gs,setScore,total}){
  const scoredPar=holes.reduce((acc,h)=>{const v=gs(h);return acc+(v>0?(coursePar[h-1]||4):0);},0);
  const vp=total?total-scoredPar:null;
  function cellBg(gross,par){if(!gross)return"#fff";const d=gross-par;if(d<=-2)return"#dbeafe";if(d===-1)return"#dcfce7";if(d===0)return"#fff";if(d===1)return"#fef9c3";return"#fee2e2";}
  return(
    <div style={{display:"flex",overflowX:"auto",WebkitOverflowScrolling:"touch",borderTop:"1px solid var(--border)"}}>
      {holes.map(h=>{const v=gs(h),par=coursePar[h-1]||4;return(
        <div key={h} style={{flexShrink:0,width:36,textAlign:"center",borderRight:"1px solid var(--border)",background:v?cellBg(v,par):"#fff"}}>
          <div style={{fontSize:".55rem",fontWeight:800,color:"var(--muted)",padding:"2px 0",borderBottom:"1px solid var(--border)",background:"#f8f6f1"}}>{h}<br/><span style={{fontWeight:400}}>P{par}</span></div>
          <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={2} value={v} onChange={e=>setScore(h,e.target.value)}
            style={{display:"block",width:"100%",height:36,textAlign:"center",border:"none",background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:"1rem",fontWeight:900,outline:"none",padding:0,color:"var(--ink)",WebkitAppearance:"none"}}/>
        </div>
      );})}
      <div style={{flexShrink:0,width:44,textAlign:"center",borderRight:"1px solid var(--border)",background:"#f0ece4"}}>
        <div style={{fontSize:".55rem",fontWeight:800,color:"var(--muted)",padding:"2px 0",borderBottom:"1px solid var(--border)",background:"#e8e4dc"}}>{label}<br/><span style={{fontWeight:400}}>{labelPar}</span></div>
        <div style={{padding:"4px 2px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:36}}>
          <div style={{fontWeight:900,fontSize:".95rem",lineHeight:1}}>{total||""}</div>
          {vp!=null&&<div style={{fontSize:".6rem",fontWeight:800,color:vp<0?"var(--green)":vp>0?"var(--red)":"var(--ink)",lineHeight:1,marginTop:1}}>{vp===0?"E":vp>0?"+"+vp:vp}</div>}
        </div>
      </div>
    </div>
  );
}

function PlayerScoreRows({playerName,isCaptain,handicap,team,holeCount,coursePar,front9Par,back9Par,scores,setScore,onMove}){
  function gs(hole){const s=scores[playerName]||{};return s[hole]??s[String(hole)]??"";}
  function total(from,to){let s=0;const sc=scores[playerName]||{};for(let h=from;h<=to;h++)s+=((sc[h]??sc[String(h)])||0);return s||"";}
  const ptot=total(1,holeCount);
  const scoredPar=()=>{let p=0;const sc=scores[playerName]||{};for(let h=1;h<=holeCount;h++){const v=sc[h]??sc[String(h)];if(v>0)p+=(coursePar[h-1]||4);}return p;};
  const pvp=ptot?ptot-scoredPar():null;
  return(
    <div style={{borderBottom:"1px solid var(--border)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"5px 12px",background:"var(--cream)"}}>
        <div style={{display:"flex",alignItems:"center",gap:5,flex:1,minWidth:0}}>
          {isCaptain&&<span style={{fontSize:".6rem",background:"var(--gold)",color:"var(--ink)",borderRadius:4,padding:"1px 5px",fontWeight:800}}>⭐</span>}
          <div style={{minWidth:0}}>
            <div style={{fontWeight:800,fontSize:".85rem",display:"flex",alignItems:"center",gap:4}}>{playerName}<HBadge h={handicap}/></div>
            {team&&<div style={{fontSize:".68rem",color:"var(--muted)",fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{team}</div>}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          {ptot>0&&<span style={{fontWeight:800,fontSize:".85rem",color:pvp<0?"var(--green)":pvp>0?"var(--red)":"var(--ink)"}}>{ptot} ({pvp===0?"E":pvp>0?"+"+pvp:pvp})</span>}
          {onMove&&<button onClick={onMove} style={{fontSize:".65rem",fontWeight:800,padding:"2px 8px",border:"1px solid var(--border)",borderRadius:4,background:"white",cursor:"pointer",color:"var(--muted)"}}>⇄</button>}
        </div>
      </div>
      <ScoreRow holes={Array.from({length:Math.min(9,holeCount)},(_,i)=>i+1)} label="OUT" labelPar={front9Par} coursePar={coursePar} gs={gs} setScore={(h,v)=>setScore(playerName,h,v)} total={total(1,Math.min(9,holeCount))}/>
      {holeCount>9&&<ScoreRow holes={Array.from({length:9},(_,i)=>i+10)} label="IN" labelPar={back9Par} coursePar={coursePar} gs={gs} setScore={(h,v)=>setScore(playerName,h,v)} total={total(10,18)}/>}
    </div>
  );
}

function InlineScorecard({sel,golfers,courses,scores,setScores,setTournaments,teams,onMovePlayer}){
  const course=findCourse(courses,sel.course);
  const coursePar=course?.par||Array(18).fill(4);
  const holeCount=sel.holes||18;
  const ciGolfers=buildCiGolfers(sel,golfers);
  const pairings=sel.pairings?.length>0?sel.pairings:buildPairings(ciGolfers,sel,course,teams);
  const saveTimer=useRef(null);const scoreCache=useRef({});
  useEffect(()=>{scoreCache.current=scores;},[scores]);
  const setScore=useCallback((name,hole,raw)=>{
    const clean=String(raw).replace(/[^0-9]/g,"").slice(0,2);
    const val=clean===""?"":parseInt(clean);
    scoreCache.current={...scoreCache.current,[name]:{...(scoreCache.current[name]||{}),[parseInt(hole)]:val}};
    setScores({...scoreCache.current});
    clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(()=>setTournaments(prev=>prev.map(t=>t.id===sel.id?{...t,scores:scoreCache.current}:t)),300);
  },[sel.id]);
  const front9Par=Array.from({length:Math.min(9,holeCount)},(_,i)=>i+1).reduce((a,h)=>a+(coursePar[h-1]||4),0);
  const back9Par=holeCount>9?Array.from({length:9},(_,i)=>i+10).reduce((a,h)=>a+(coursePar[h-1]||4),0):0;
  if(!pairings.length)return<div className="emp card"><div className="emp-i">✏️</div><div className="emp-t">Build pairings first (Step 5)</div></div>;
  return(
    <div>
      {pairings.map((group,gi)=>{
        const players=group.players||[];if(!players.length)return null;
        const captain=getCaptain(players);
        return(
          <div key={group.holeName+gi} style={{marginBottom:14,border:"1.5px solid var(--border)",borderRadius:"var(--r)",overflow:"hidden",boxShadow:"var(--sh)"}}>
            <div style={{background:"var(--gd)",color:"white",padding:"9px 14px"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"1.1rem",letterSpacing:"1px"}}>Hole {group.holeName}</div>
              <div style={{fontSize:".7rem",opacity:.65,marginTop:1}}>⭐ {captain.name}{players.filter(p=>p.name!==captain.name).length>0&&" · "+players.filter(p=>p.name!==captain.name).map(p=>p.name).join(" · ")}</div>
            </div>
            {players.map(p=><PlayerScoreRows key={p.name} playerName={p.name} isCaptain={p.name===captain.name} handicap={p.handicap} team={p.team||""} holeCount={holeCount} coursePar={coursePar} front9Par={front9Par} back9Par={back9Par} scores={scores} setScore={setScore} onMove={onMovePlayer?()=>onMovePlayer({player:p,fromGi:gi}):null}/>)}
          </div>
        );
      })}
    </div>
  );
}

// ─── Print Scorecards ─────────────────────────────────────────────────────────
function PrintScorecardsSheet({sel,pairings,courses,onClose}){
  const course=findCourse(courses,sel?.course);
  const par=course?.par||Array(18).fill(4);
  const holes=sel?.holes||18;
  const FRONT=Array.from({length:Math.min(9,holes)},(_,i)=>i+1);
  const BACK=holes>9?Array.from({length:holes-9},(_,i)=>i+10):[];
  const FP=FRONT.reduce((a,h)=>a+(par[h-1]||4),0),BP=BACK.reduce((a,h)=>a+(par[h-1]||4),0);
  const allCards=[];pairings.forEach(g=>(g.players||[]).forEach(p=>allCards.push({player:p,group:g})));
  const [selected,setSelected]=useState(allCards.map(c=>c.player.name));

  function download(){
    const cards=allCards.filter(c=>selected.includes(c.player.name));
    const sub=`width:30pt;text-align:center;border:1pt solid #999;padding:2pt 0;font-size:8pt;background:#e8e8e8;font-weight:800`;
    const cw="26pt";
    function mk({player:p,group:g}){
      const sh=g.hole||1;
      const playerIdx=(g.players||[]).findIndex(x=>x.name===p.name);const scorer=(g.players||[])[((playerIdx>=0?playerIdx:0)+1)%(g.players||[{name:"—"}]).length]||{name:"—"};
      const fH=FRONT.map(h=>`<th style="width:${cw};text-align:center;border:1pt solid #bbb;padding:2pt 0;font-size:8pt;background:${h===sh?"#fde047":"#f0f0f0"};font-weight:900">${h}${h===sh?"★":""}</th>`).join("");
      const bH=BACK.map(h=>`<th style="width:${cw};text-align:center;border:1pt solid #bbb;padding:2pt 0;font-size:8pt;background:${h===sh?"#fde047":"#f0f0f0"};font-weight:900">${h}${h===sh?"★":""}</th>`).join("");
      const fP=FRONT.map(h=>`<td style="width:${cw};text-align:center;border:1pt solid #bbb;padding:2pt 0;font-size:8pt;color:#666;background:#f8f8f8">${par[h-1]||4}</td>`).join("");
      const bP=BACK.map(h=>`<td style="width:${cw};text-align:center;border:1pt solid #bbb;padding:2pt 0;font-size:8pt;color:#666;background:#f8f8f8">${par[h-1]||4}</td>`).join("");
      const fSc=FRONT.map(()=>`<td style="width:${cw};border:1pt solid #90caf9;height:28pt;background:#e8f4fd"></td>`).join("");
      const bSc=BACK.map(()=>`<td style="width:${cw};border:1pt solid #90caf9;height:28pt;background:#e8f4fd"></td>`).join("");
      const fPl=FRONT.map(()=>`<td style="width:${cw};border:1pt solid #ddd;height:28pt;background:#f5f5f5"></td>`).join("");
      const bPl=BACK.map(()=>`<td style="width:${cw};border:1pt solid #ddd;height:28pt;background:#f5f5f5"></td>`).join("");
      return`<div style="border:2pt solid #333;padding:8pt 10pt;font-family:Arial,sans-serif;background:white;flex:1;display:flex;flex-direction:column;justify-content:space-between;margin:6pt 10pt;">
  <div style="text-align:center;border-bottom:2pt solid #333;padding-bottom:5pt;margin-bottom:5pt">
    <div style="font-weight:900;font-size:9pt;color:#555">${sel?.name||""} · ${sel?.date||""} · ${sel?.course||""}</div>
    <div style="font-weight:900;font-size:20pt;margin-top:3pt;line-height:1.1">${p.name}</div>
    <div style="font-weight:700;font-size:10pt;color:#444;margin-top:2pt">${p.team||""} · HCP ${p.handicap} · Start Hole ${g.holeName}★</div>
  </div>
  <table style="border-collapse:collapse;width:100%;margin-bottom:4pt"><thead>
    <tr><th style="width:44pt;text-align:left;padding:2pt 4pt;background:#f0f0f0;font-size:8pt;border:1pt solid #bbb">Hole</th>${fH}<th style="${sub}">OUT</th>${bH}<th style="${sub}">IN</th><th style="${sub}">TOT</th></tr>
    <tr><td style="width:44pt;text-align:left;padding:2pt 4pt;background:#f8f8f8;font-weight:700;color:#555;font-size:8pt;border:1pt solid #bbb">Par</td>${fP}<td style="${sub}">${FP}</td>${bP}<td style="${sub}">${BP}</td><td style="${sub}">${FP+BP}</td></tr>
  </thead><tbody>
    <tr><td style="width:44pt;text-align:left;padding:2pt 4pt;font-weight:900;color:#1565c0;font-size:8pt;border:1pt solid #bbb;background:#e8f4fd">📝 ${scorer.name.split(" ")[0]} records</td>${fSc}<td style="${sub};height:28pt;background:#bbdefb"></td>${bSc}<td style="${sub};height:28pt;background:#bbdefb"></td><td style="${sub};height:28pt;background:#90caf9"></td></tr>
    <tr><td colspan="22" style="padding:0;height:3pt;background:#333"></td></tr>
    <tr><td style="width:44pt;text-align:left;padding:2pt 4pt;font-weight:700;color:#555;font-size:8pt;border:1pt solid #bbb;background:#f5f5f5">✓ ${p.name.split(" ").pop()}</td>${fPl}<td style="${sub};height:28pt;background:#f5f5f5"></td>${bPl}<td style="${sub};height:28pt;background:#f5f5f5"></td><td style="${sub};height:28pt;background:#f5f5f5"></td></tr>
  </tbody></table>
  <div style="font-size:7pt;background:#fff8e1;padding:2pt 6pt;border-left:3pt solid #f59e0b;margin-bottom:4pt">${p.name.split(" ")[0]} gives this card to <strong>${scorer.name}</strong> &middot; <strong>${scorer.name.split(" ")[0]}</strong> records ${p.name.split(" ")[0]}'s score on the blue line (📝) &middot; ${p.name.split(" ")[0]} verifies and signs below (✓)</div>
  <div style="display:flex;gap:8pt;border-top:1pt solid #ccc;padding-top:4pt">
    <div style="flex:1"><div style="border-bottom:1pt solid #333;height:16pt"></div><div style="font-size:7pt;color:#666;text-align:center;margin-top:2pt">Golfer signature</div></div>
    <div style="flex:1"><div style="border-bottom:1pt solid #333;height:16pt"></div><div style="font-size:7pt;color:#666;text-align:center;margin-top:2pt">Scorer signature</div></div>
    <div style="flex:1.5"><div style="border-bottom:1pt solid #333;height:16pt"></div><div style="font-size:7pt;color:#666;text-align:center;margin-top:2pt">Scorer printed name</div></div>
  </div>
</div>`;
    }
    const pages=[];
    for(let i=0;i<cards.length;i+=2){
      const c1=mk(cards[i]),c2=cards[i+1]?mk(cards[i+1]):"";
      pages.push(`<div class="page"><div class="half">${c1}</div>${c2?`<div class="cut"></div><div class="half">${c2}</div>`:""}</div>`);
    }
    const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Scorecards – ${sel?.name||""}</title>
<style>*{box-sizing:border-box;margin:0;padding:0;}body{background:white;font-family:Arial,sans-serif;}
@page{size:11in 8.5in;margin:0;}.page{width:11in;height:8.5in;display:flex;flex-direction:column;page-break-after:always;}
.half{flex:1;display:flex;flex-direction:column;}.cut{border-top:2pt dashed #bbb;margin:0 10pt;flex-shrink:0;}
</style></head><body>${pages.join("")}</body></html>`;
    const blob=new Blob([html],{type:"text/html"});const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;a.download=`scorecards_${(sel?.name||"").replace(/\s+/g,"_")}.html`;a.click();URL.revokeObjectURL(url);
  }

  return(
    <div style={{position:"fixed",inset:0,zIndex:400,display:"flex",flexDirection:"column",background:"white"}}>
      <div style={{background:"var(--gd)",color:"white",padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"1.3rem",letterSpacing:"1px"}}>Print Scorecards</div>
        <button onClick={onClose} style={{background:"rgba(255,255,255,.15)",border:"none",color:"white",fontWeight:900,fontSize:"1.1rem",width:32,height:32,borderRadius:8,cursor:"pointer"}}>✕</button>
      </div>
      <div style={{padding:"10px 16px",borderBottom:"1px solid var(--border)",display:"flex",gap:8,flexShrink:0}}>
        <button className="btn btn-g btn-sm" onClick={()=>setSelected(allCards.map(c=>c.player.name))}>All</button>
        <button className="btn btn-g btn-sm" onClick={()=>setSelected([])}>None</button>
        <span style={{marginLeft:"auto",fontSize:".78rem",color:"var(--muted)",fontWeight:700,alignSelf:"center"}}>{selected.length} selected</span>
      </div>
      <div style={{flex:1,overflowY:"auto"}}>
        {allCards.map(({player:p,group:g})=>{const on=selected.includes(p.name);return(
          <div key={p.name} onClick={()=>setSelected(prev=>prev.includes(p.name)?prev.filter(n=>n!==p.name):[...prev,p.name])}
            style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",borderBottom:"1px solid var(--border)",cursor:"pointer",background:on?"rgba(26,102,65,.06)":"white"}}>
            <div style={{width:22,height:22,borderRadius:"50%",flexShrink:0,border:`2px solid ${on?"var(--green)":"var(--border)"}`,background:on?"var(--green)":"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {on&&<div style={{width:8,height:8,borderRadius:"50%",background:"white"}}/>}
            </div>
            <div style={{flex:1}}><div style={{fontWeight:800}}>{p.name}</div><div style={{fontSize:".72rem",color:"var(--muted)"}}>{p.team} · HCP {p.handicap} · Hole {g.holeName}</div></div>
          </div>
        );})}
      </div>
      <div style={{padding:"12px 16px",borderTop:"2px solid var(--border)",flexShrink:0}}>
        <button className="btn btn-p btn-full" style={{padding:"14px",fontSize:".95rem",fontWeight:900}} disabled={selected.length===0} onClick={download}>
          ⬇ Download {selected.length} Scorecard{selected.length!==1?"s":""} (open in Chrome → Ctrl+P)
        </button>
      </div>
    </div>
  );
}

// ─── Tournaments Page ─────────────────────────────────────────────────────────
function TournamentsPage({tournaments,setTournaments,courses,teams,golfers,setGolfers,activeTid,setActiveTid}){
  const [selId,setSelId]=useState(null);const [step,setStep]=useState(1);
  const [scores,setScores]=useState({});const [sheet,setSheet]=useState(null);const [form,setForm]=useState({});
  const [confirmDel,setConfirmDel]=useState(null);const [printSheet,setPrintSheet]=useState(false);
  const [movePlayer,setMovePlayer]=useState(null);
  const [wiName,setWiName]=useState("");const [wiHcp,setWiHcp]=useState(18);const [wiTeam,setWiTeam]=useState("");
  const [showPast,setShowPast]=useState(false);
  const tRef=useRef(tournaments);tRef.current=tournaments;
  useEffect(()=>{if(activeTid&&activeTid!==selId)setSelId(activeTid);},[activeTid]);
  useEffect(()=>{if(sel?.scores&&Object.keys(sel.scores).length>0)setScores(sel.scores);},[selId]);
  const sel=tournaments.find(t=>t.id===selId);
  const ff=(k,v)=>setForm(p=>({...p,[k]:v}));
  function updateSel(fn){setTournaments(p=>{const next=p.map(t=>t.id===selId?fn(t):t);store(SK.tournaments,next);return next;});}
  const blank={name:"",date:"",tournamentType:"lhsaa18",holes:18,birdies:false,minPerHole:3,maxPerHole:4,pairingMethod:"bracket",course:courses[0]?.name||"",entryFee:0,scatEnabled:false,scatFee:0,status:"open",registrants:[],checkedIn:[],pairings:[]};
  function saveForm(){
    if(!form.name?.trim())return;const d={...form};delete d._r;
    if(sheet==="add"){const newT={...d,id:Date.now(),registrants:[],checkedIn:[],pairings:[],scores:{}};const next=[...tRef.current,newT];setTournaments(next);store(SK.tournaments,next);setSelId(newT.id);setActiveTid&&setActiveTid(newT.id);setStep(1);}
    else{const next=tRef.current.map(t=>t.id===(form._r?.id||d.id)?{...t,...d,id:t.id}:t);setTournaments(next);store(SK.tournaments,next);}
    setSheet(null);
  }
  function doDelete(){if(!confirmDel)return;const next=tRef.current.filter(x=>x.id!==confirmDel.id);setTournaments(next);store(SK.tournaments,next);if(selId===confirmDel.id){setSelId(null);setStep(1);}setConfirmDel(null);}
  const checkedInNames=sel?.checkedIn||[];const regNames=sel?.registrants||[];const pairings=sel?.pairings||[];
  function toggleCheckIn(name){updateSel(t=>{const ci=t.checkedIn||[];return{...t,checkedIn:ci.includes(name)?ci.filter(n=>n!==name):[...ci,name]};});}
  function addWalkIn(){if(!wiName.trim())return;const g={id:uuid(),name:wiName.trim(),handicap:parseInt(wiHcp)||18,team:wiTeam,gender:"boys",clubs:[],phone:"",email:"",dob:""};if(!golfers.find(x=>x.name===g.name))setGolfers(p=>[...p,g]);updateSel(t=>({...t,registrants:[...(t.registrants||[]).filter(n=>n!==g.name),g.name],checkedIn:[...(t.checkedIn||[]).filter(n=>n!==g.name),g.name]}));setWiName("");setWiHcp(18);setWiTeam("");}
  function runBuildPairings(){const liveSel=tRef.current.find(t=>t.id===selId);if(!liveSel)return;const course=findCourse(courses,liveSel.course);const ci=buildCiGolfers(liveSel,golfers);if(!ci.length)return;const result=buildPairings(ci,liveSel,course,teams);updateSel(t=>({...t,pairings:result}));setStep(6);}
  const STEPS=[{n:1,icon:"📋",label:"Setup"},{n:2,icon:"✍️",label:"Register"},{n:3,icon:"✅",label:"Check-In"},{n:4,icon:"🚶",label:"Walk-Ins"},{n:5,icon:"👥",label:"Pairings"},{n:6,icon:"⛳",label:"Holes"},{n:7,icon:"✏️",label:"Scores"}];
  const now=new Date();now.setHours(0,0,0,0);
  const sorted=[...tournaments].sort((a,b)=>new Date(a.date||"9999")-new Date(b.date||"9999"));
  const upcoming=sorted.filter(t=>new Date(t.date||"9999")>=now);
  const past=sorted.filter(t=>new Date(t.date||"9999")<now);

  function TCard({t}){
    const ci=(t.checkedIn||[]).length,reg=(t.registrants||[]).length,pr=(t.pairings||[]).length;
    const meta=T_TYPE_META[t.tournamentType]||T_TYPE_META.lhsaa18;
    return(
      <div className="tc" style={{cursor:"pointer"}} onClick={()=>{setSelId(t.id);setActiveTid&&setActiveTid(t.id);setStep(pr>0?6:ci>0?5:reg>0?3:1);}}>
        <div className="tch">
          <div><div className="tct">{t.name}</div><div className="tcm">{t.date} · {t.course}</div></div>
          <div style={{display:"flex",gap:6}}>
            <button className="btn btn-g btn-sm" onClick={e=>{e.stopPropagation();setForm({...t,_r:t});setSheet("edit");}}>Edit</button>
            <button className="btn btn-d btn-sm" onClick={e=>{e.stopPropagation();setConfirmDel(t);}}>✕</button>
          </div>
        </div>
        <div className="tcb"><div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          <span className="badge" style={{background:meta.bg,color:meta.color}}>{meta.label}</span>
          {t.entryFee>0&&<span className="chip" style={{background:"#dcfce7",color:"#166534"}}>Entry ${t.entryFee}</span>}
          {t.scatEnabled&&<span className="chip" style={{background:"#f3e8ff",color:"#6b21a8"}}>Scat ${t.scatFee||0}</span>}
          {reg>0&&<span className="chip" style={{background:"#dbeafe",color:"#1e40af"}}>✍️ {reg}</span>}
          {ci>0&&<span className="chip" style={{background:"#dcfce7",color:"#166534"}}>✅ {ci}</span>}
          {pr>0&&<span className="chip" style={{background:"#fef9c3",color:"#92400e"}}>⛳ {pr} groups</span>}
        </div></div>
      </div>
    );
  }

  return(
    <div>
      {!selId&&(
        <div>
          <button className="btn btn-p btn-full" style={{marginBottom:12}} onClick={()=>{setForm(blank);setSheet("add");}}>+ New Tournament</button>
          {upcoming.map(t=><TCard key={t.id} t={t}/>)}
          {!upcoming.length&&!past.length&&<div className="emp card"><div className="emp-i">📅</div><div className="emp-t">No tournaments yet</div></div>}
          {past.length>0&&<div>
            <button onClick={()=>setShowPast(p=>!p)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"10px 14px",background:"var(--cream)",border:"1.5px solid var(--border)",borderRadius:"var(--rs)",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:".82rem",color:"var(--muted)",marginBottom:showPast?8:0}}>
              <span>📁 Past ({past.length})</span><span>{showPast?"−":"+"}</span>
            </button>
            {showPast&&past.map(t=><TCard key={t.id} t={t}/>)}
          </div>}
        </div>
      )}

      {selId&&sel&&(
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <button className="btn btn-g btn-sm" onClick={()=>{setSelId(null);setStep(1);}}>← Back</button>
            <div style={{flex:1}}><div style={{fontWeight:900,fontSize:"1rem"}}>{sel.name}</div><div style={{fontSize:".73rem",color:"var(--muted)"}}>{sel.date} · {sel.course}</div></div>
            <button className="btn btn-g btn-sm" onClick={()=>{setForm({...sel,_r:sel});setSheet("edit");}}>Edit</button>
          </div>
          <div style={{display:"flex",marginBottom:14,borderRadius:"var(--rs)",overflow:"hidden",border:"1.5px solid var(--border)"}}>
            {STEPS.map(s=><button key={s.n} onClick={()=>setStep(s.n)} style={{flex:1,padding:"7px 1px",border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:".58rem",background:step===s.n?"var(--green)":s.n<step?"rgba(26,102,65,.1)":"transparent",color:step===s.n?"white":s.n<step?"var(--green)":"var(--muted)",borderRight:s.n<7?"1px solid var(--border)":"none",textAlign:"center",lineHeight:1.3}}>
              <div style={{fontSize:".85rem"}}>{s.icon}</div><div style={{marginTop:1}}>{s.label}</div>
            </button>)}
          </div>

          {step===1&&<div>
            <div className="card" style={{marginBottom:12}}>
              {[["Format",(T_TYPE_META[sel.tournamentType]||T_TYPE_META.lhsaa18).label],["Course",sel.course],["Date",sel.date],["Holes",`${sel.holes||18}H`],["Groups",`${sel.minPerHole}–${sel.maxPerHole}/hole`],["Entry",sel.entryFee>0?`$${sel.entryFee}`:"Free"],["Scat",sel.scatEnabled?`$${sel.scatFee||0}`:"No"]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px 16px",borderBottom:"1px solid var(--border)",fontSize:".88rem"}}>
                  <span style={{color:"var(--muted)",fontWeight:700}}>{k}</span><span style={{fontWeight:800}}>{v}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-p btn-full" onClick={()=>setStep(2)}>Next: Register →</button>
          </div>}

          {step===2&&<div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div className="slbl">{regNames.length} registered</div>
              <button className="btn btn-g btn-sm" onClick={()=>updateSel(t=>({...t,registrants:golfers.map(g=>g.name)}))}>All</button>
            </div>
            {golfers.filter(g=>regNames.includes(g.name)).length>0&&<div className="card" style={{marginBottom:12}}>
              <div className="ch"><span className="ct">Registered ✓ ({golfers.filter(g=>regNames.includes(g.name)).length})</span></div>
              {golfers.filter(g=>regNames.includes(g.name)).sort((a,b)=>a.name.localeCompare(b.name)).map(g=>(
                <div key={g.name} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderBottom:"1px solid var(--border)"}}>
                  <div style={{flex:1}}><div style={{fontWeight:800}}>{g.name}</div><div style={{fontSize:".73rem",color:"var(--muted)"}}>{g.team} · HCP {g.handicap}</div></div>
                  <HBadge h={g.handicap}/><button className="btn btn-d btn-sm" onClick={()=>updateSel(t=>({...t,registrants:(t.registrants||[]).filter(n=>n!==g.name)}))}>−</button>
                </div>
              ))}
            </div>}
            {golfers.filter(g=>!regNames.includes(g.name)).length>0&&<div className="card" style={{marginBottom:12}}>
              <div className="ch"><span className="ct">Add Players ({golfers.filter(g=>!regNames.includes(g.name)).length})</span></div>
              {golfers.filter(g=>!regNames.includes(g.name)).sort((a,b)=>a.name.localeCompare(b.name)).map(g=>(
                <div key={g.name} onClick={()=>updateSel(t=>({...t,registrants:[...(t.registrants||[]),g.name]}))} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderBottom:"1px solid var(--border)",cursor:"pointer"}}>
                  <div style={{flex:1}}><div style={{fontWeight:800}}>{g.name}</div><div style={{fontSize:".73rem",color:"var(--muted)"}}>{g.team} · HCP {g.handicap}</div></div>
                  <HBadge h={g.handicap}/><span style={{color:"var(--green)",fontWeight:900,fontSize:"1.2rem"}}>+</span>
                </div>
              ))}
            </div>}
            <button className="btn btn-p btn-full" disabled={!regNames.length} onClick={()=>setStep(3)}>Next: Check-In ({regNames.length}) →</button>
          </div>}

          {step===3&&<div>
            <div style={{background:"var(--border)",borderRadius:8,height:8,marginBottom:10,overflow:"hidden"}}><div style={{height:"100%",background:"var(--green)",width:`${regNames.length?Math.round(checkedInNames.length/regNames.length*100):0}%`,transition:"width .3s",borderRadius:8}}/></div>
            <div style={{fontSize:".78rem",color:"var(--muted)",fontWeight:700,marginBottom:10,textAlign:"center"}}>{checkedInNames.length} / {regNames.length} checked in</div>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <button className="btn btn-g btn-sm" style={{flex:1}} onClick={()=>updateSel(t=>({...t,checkedIn:[...(t.registrants||[])]}))}>All In</button>
              <button className="btn btn-g btn-sm" style={{flex:1}} onClick={()=>updateSel(t=>({...t,checkedIn:[]}))}>Clear</button>
            </div>
            <div className="card" style={{marginBottom:12}}>
              {golfers.filter(g=>regNames.includes(g.name)).sort((a,b)=>a.name.localeCompare(b.name)).map(g=>{const on=checkedInNames.includes(g.name);return(
                <div key={g.name} onClick={()=>toggleCheckIn(g.name)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 16px",borderBottom:"1px solid var(--border)",cursor:"pointer",background:on?"rgba(26,102,65,.04)":"white"}}>
                  <div style={{width:26,height:26,borderRadius:7,flexShrink:0,border:`2px solid ${on?"var(--green)":"var(--border)"}`,background:on?"var(--green)":"white",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:900}}>{on?"✓":""}</div>
                  <div style={{flex:1}}><div style={{fontWeight:800}}>{g.name}</div><div style={{fontSize:".73rem",color:"var(--muted)"}}>{g.team} · HCP {g.handicap}</div></div>
                  <HBadge h={g.handicap}/>
                </div>
              );})}
            </div>
            <button className="btn btn-p btn-full" onClick={()=>setStep(4)}>Next: Walk-Ins →</button>
          </div>}

          {step===4&&<div>
            <div className="card" style={{marginBottom:12}}>
              <div className="ch"><span className="ct">Add Walk-In</span></div>
              <div style={{padding:"12px 16px"}}>
                <div className="fg"><label className="fl">Full Name</label><input value={wiName} onChange={e=>setWiName(e.target.value)} placeholder="Player name" onKeyDown={e=>e.key==="Enter"&&addWalkIn()}/></div>
                <div className="g2">
                  <div className="fg"><label className="fl">Handicap</label><input type="number" min={1} max={54} value={wiHcp} onChange={e=>setWiHcp(e.target.value)}/></div>
                  <div className="fg"><label className="fl">School</label><input value={wiTeam} onChange={e=>setWiTeam(e.target.value)} placeholder="Optional"/></div>
                </div>
                <button className="btn btn-p btn-full" onClick={addWalkIn} disabled={!wiName.trim()}>+ Add Walk-In</button>
              </div>
            </div>
            <div className="slbl">{checkedInNames.length} total checked in</div>
            <div className="card" style={{marginBottom:12}}>
              {golfers.filter(g=>checkedInNames.includes(g.name)).sort((a,b)=>a.handicap-b.handicap).map(g=>(
                <div key={g.name} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderBottom:"1px solid var(--border)"}}>
                  <div style={{flex:1}}><div style={{fontWeight:800}}>{g.name}</div><div style={{fontSize:".73rem",color:"var(--muted)"}}>{g.team||"Walk-in"} · HCP {g.handicap}</div></div>
                  <HBadge h={g.handicap}/>
                </div>
              ))}
              {!checkedInNames.length&&<div className="emp"><div className="emp-i">👥</div><div className="emp-t">No one checked in</div></div>}
            </div>
            <button className="btn btn-p btn-full" disabled={checkedInNames.length<2} onClick={()=>setStep(5)}>Next: Build Pairings ({checkedInNames.length}) →</button>
          </div>}

          {step===5&&<div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
              {["A","B","C","D"].map(br=>{const ranges={A:[0,18],B:[19,22],C:[23,26],D:[27,99]};const[lo,hi]=ranges[br];const count=golfers.filter(g=>checkedInNames.includes(g.name)&&g.handicap>=lo&&g.handicap<=hi).length;if(!count)return null;const st={A:{bg:"#dcfce7",c:"#166534"},B:{bg:"#dbeafe",c:"#1e40af"},C:{bg:"#fef9c3",c:"#92400e"},D:{bg:"#fee2e2",c:"#991b1b"}};return<span key={br} style={{fontSize:".78rem",fontWeight:800,background:st[br].bg,color:st[br].c,borderRadius:6,padding:"4px 12px"}}>{br}: {count}</span>;})}
            </div>
            {(()=>{const pairingNames=[...new Set((pairings||[]).flatMap(g=>(g.players||[]).map(p=>p.name)))];const stale=pairings.length>0&&(checkedInNames.some(n=>!pairingNames.includes(n))||pairingNames.some(n=>!checkedInNames.includes(n)));return stale?<div style={{background:"#fef3c7",border:"1px solid #f59e0b",borderRadius:"var(--rs)",padding:"10px 14px",marginBottom:10,fontSize:".82rem",fontWeight:700,color:"#92400e"}}>⚠️ Check-in changed — rebuild pairings to apply</div>:null;})()}
            <button className="btn btn-p btn-full" style={{marginBottom:8,padding:"14px",fontSize:"1rem"}} onClick={runBuildPairings} disabled={checkedInNames.length<2}>⛳ Build Teams &amp; Assign Holes</button>
            {pairings.length>0&&<div>
              <div className="slbl" style={{marginBottom:6}}>{pairings.length} teams · {checkedInNames.length} players</div>
              {pairings.map((g,i)=>{const cap=getCaptain(g.players||[]);return(
                <div key={i} style={{padding:"8px 14px",background:"var(--cream)",borderRadius:"var(--rs)",marginBottom:6,fontSize:".82rem",border:"1px solid var(--border)"}}>
                  <span style={{fontWeight:800,color:"var(--muted)",marginRight:8}}>Hole {g.holeName}</span>
                  {(g.players||[]).map((p,pi)=><span key={pi} style={{marginRight:6}}>{p.name===cap?.name&&<span style={{fontSize:".6rem",background:"var(--gold)",color:"var(--ink)",borderRadius:3,padding:"0 4px",fontWeight:800,marginRight:3}}>⭐</span>}{p.name}{pi<(g.players||[]).length-1&&<span style={{color:"var(--border)"}}> · </span>}</span>)}
                </div>
              );})}
            </div>}
          </div>}

          {step===6&&<div>
            {!pairings.length?<div><div className="emp card"><div className="emp-i">⛳</div><div className="emp-t">No pairings yet</div></div><button className="btn btn-g btn-full" onClick={()=>setStep(5)}>← Build Pairings</button></div>
            :pairings.map((group,gi)=>{const cap=getCaptain(group.players||[]);return(
              <div key={gi} className="card" style={{marginBottom:8}}>
                <div style={{background:"var(--gd)",color:"white",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"1.15rem",letterSpacing:"1px"}}>Hole {group.holeName}</div>
                  <span style={{fontSize:".72rem",opacity:.7}}>{(group.players||[]).length}-ball</span>
                </div>
                <div style={{padding:"6px 14px 8px"}}>
                  {(group.players||[]).map((p,pi)=>{const br=hcpGroup(p.handicap);return(
                    <div key={pi} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0",borderBottom:pi<(group.players||[]).length-1?"1px solid var(--border)":"none"}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:br.color,flexShrink:0}}/>
                      <div style={{flex:1}}><div style={{fontWeight:800,fontSize:".88rem",display:"flex",alignItems:"center",gap:4}}>{p.name}{p.name===cap.name&&<span style={{fontSize:".6rem",background:"var(--gold)",color:"var(--ink)",borderRadius:3,padding:"0 3px",fontWeight:800}}>⭐</span>}</div>{p.team&&<div style={{fontSize:".68rem",color:"var(--muted)"}}>{p.team}</div>}</div>
                      <span className="badge" style={{background:br.bg,color:br.color,fontSize:".65rem"}}>{br.label}·{p.handicap}</span>
                      <button onClick={()=>setMovePlayer({player:p,fromGi:gi})} style={{fontSize:".65rem",fontWeight:800,padding:"2px 8px",border:"1px solid var(--border)",borderRadius:4,background:"white",cursor:"pointer",color:"var(--muted)"}}>Move</button>
                    </div>
                  );})}
                </div>
              </div>
            );})}
            {pairings.length>0&&<button className="btn btn-p btn-full" style={{marginTop:8}} onClick={()=>setStep(7)}>Next: Enter Scores →</button>}
          </div>}

          {step===7&&sel&&<div>
            <div style={{display:"flex",gap:8,marginBottom:12,alignItems:"center"}}>
              <button className="btn btn-g btn-sm" onClick={()=>setStep(6)}>← Back</button>
              <div style={{flex:1}}/>
              <button className="btn btn-g btn-sm" onClick={()=>setPrintSheet(true)}>🖨 Cards</button>
            </div>
            <InlineScorecard sel={sel} golfers={golfers} courses={courses} scores={scores} setScores={setScores} setTournaments={setTournaments} teams={teams} onMovePlayer={setMovePlayer}/>
          </div>}
        </div>
      )}

      <Sheet open={!!movePlayer} onClose={()=>setMovePlayer(null)} title={movePlayer?`Move ${movePlayer.player.name}`:"Move Player"} footer={<button className="btn btn-g btn-full" onClick={()=>setMovePlayer(null)}>Cancel</button>}>
        {movePlayer&&pairings.map((g,gi)=>{if(gi===movePlayer.fromGi)return null;return(
          <div key={gi} style={{padding:"12px 14px",borderBottom:"1px solid var(--border)",cursor:"pointer"}} onClick={()=>{const next=pairings.map((grp,gri)=>{if(gri===movePlayer.fromGi)return{...grp,players:grp.players.filter(p=>p.name!==movePlayer.player.name)};if(gri===gi)return{...grp,players:[...grp.players,movePlayer.player]};return grp;}).filter(grp=>(grp.players||[]).length>0);updateSel(t=>({...t,pairings:next}));setMovePlayer(null);}}>
            <div style={{fontWeight:800}}>Hole {g.holeName}</div>
            <div style={{fontSize:".73rem",color:"var(--muted)"}}>{(g.players||[]).map(p=>p.name).join(" · ")}</div>
          </div>
        );})}
      </Sheet>

      {printSheet&&<PrintScorecardsSheet sel={sel} pairings={pairings} courses={courses} onClose={()=>setPrintSheet(false)}/>}

      {confirmDel&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:200,display:"flex",alignItems:"flex-end"}} onClick={e=>{if(e.target===e.currentTarget)setConfirmDel(null);}}>
          <div style={{background:"white",width:"100%",borderRadius:"var(--r) var(--r) 0 0",padding:"24px 20px 32px"}}>
            <div style={{fontWeight:800,fontSize:"1rem",marginBottom:6}}>Delete Tournament?</div>
            <div style={{fontSize:".85rem",color:"var(--muted)",marginBottom:20}}><strong>{confirmDel.name}</strong> will be permanently removed.</div>
            <div style={{display:"flex",gap:10}}><button className="btn btn-g" style={{flex:1}} onClick={()=>setConfirmDel(null)}>Cancel</button><button className="btn btn-d" style={{flex:1,background:"var(--red)",color:"white"}} onClick={doDelete}>Delete</button></div>
          </div>
        </div>
      )}

      <Sheet open={!!sheet} onClose={()=>setSheet(null)} title={sheet==="add"?"New Tournament":"Edit Tournament"}
        footer={<><button className="btn btn-g" style={{flex:1}} onClick={()=>setSheet(null)}>Cancel</button><button className="btn btn-p" style={{flex:2}} onClick={saveForm}>Save</button></>}>
        <div className="fg"><label className="fl">Name</label><input value={form.name||""} onChange={e=>ff("name",e.target.value)} placeholder="e.g. District Tournament"/></div>
        <div className="g2">
          <div className="fg"><label className="fl">Date</label><input value={form.date||""} onChange={e=>ff("date",e.target.value)} placeholder="MM/DD/YYYY"/></div>
          <div className="fg"><label className="fl">Course</label><select value={form.course||""} onChange={e=>ff("course",e.target.value)}>{courses.map(c=><option key={c.name}>{c.name}</option>)}</select></div>
        </div>
        <div className="fg"><label className="fl">Format</label><select value={form.tournamentType||"lhsaa18"} onChange={e=>ff("tournamentType",e.target.value)}>{TTYPE_OPTIONS.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
        <div className="fg"><label className="fl">Pairing Method</label><select value={form.pairingMethod||"bracket"} onChange={e=>ff("pairingMethod",e.target.value)}>{PAIRING_METHODS.map(m=><option key={m.value} value={m.value}>{m.icon} {m.label}</option>)}</select></div>
        <div className="g2">
          <div className="fg"><label className="fl">Holes</label><div style={{display:"flex",border:"1.5px solid var(--border)",borderRadius:"var(--rs)",overflow:"hidden"}}>{[9,18].map(h=><button key={h} onClick={()=>ff("holes",h)} style={{flex:1,padding:"10px",border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:".88rem",background:(form.holes||18)===h?"var(--green)":"transparent",color:(form.holes||18)===h?"white":"var(--muted)"}}>{h}H</button>)}</div></div>
          <div className="fg"><label className="fl">Entry Fee $</label><input type="number" min={0} value={form.entryFee||0} onChange={e=>ff("entryFee",parseFloat(e.target.value)||0)}/></div>
        </div>
        <div className="g2">
          <div className="fg"><label className="fl">Min/Group</label><input type="number" min={2} max={6} value={form.minPerHole||3} onChange={e=>ff("minPerHole",parseInt(e.target.value))}/></div>
          <div className="fg"><label className="fl">Max/Group</label><input type="number" min={2} max={6} value={form.maxPerHole||4} onChange={e=>ff("maxPerHole",parseInt(e.target.value))}/></div>
        </div>
        <div className="tog-row"><div style={{fontWeight:700}}>Scat</div><Toggle value={!!form.scatEnabled} onChange={v=>ff("scatEnabled",v)}/></div>
        {form.scatEnabled&&<div className="fg" style={{marginTop:8}}><label className="fl">Scat Fee $</label><input type="number" min={0} value={form.scatFee||0} onChange={e=>ff("scatFee",parseFloat(e.target.value)||0)}/></div>}
        <div className="tog-row"><div style={{fontWeight:700}}>Count Birdies</div><Toggle value={!!form.birdies} onChange={v=>ff("birdies",v)}/></div>
      </Sheet>
    </div>
  );
}

// ─── Misc Pages ───────────────────────────────────────────────────────────────
function SideMatchesPage(){return<div><div className="emp card"><div className="emp-i">🎯</div><div className="emp-t">Side Games</div><div className="emp-sub">Nassau, skins, and best ball coming soon</div></div></div>;}
function LeaguePage({tournaments}){return<div><div className="emp card"><div className="emp-i">📆</div><div className="emp-t">League Management</div><div className="emp-sub">Schedules and standings coming soon</div></div><div className="slbl">League Tournaments</div><div className="card">{tournaments.filter(t=>t.leagueId).map(t=><div key={t.id} style={{padding:"12px 16px",borderBottom:"1px solid var(--border)"}}><div style={{fontWeight:800}}>{t.name}</div><div style={{fontSize:".75rem",color:"var(--muted)"}}>{t.date} · League {t.leagueId}</div></div>)}{!tournaments.filter(t=>t.leagueId).length&&<div className="emp"><div className="emp-i">📋</div><div className="emp-t">No league events</div></div>}</div></div>;}
function FormatsPage(){return<div><div className="slbl">Scoring Formats</div><div className="card">{TTYPE_OPTIONS.map(f=><div key={f.value} style={{padding:"12px 16px",borderBottom:"1px solid var(--border)"}}><div style={{fontWeight:800}}>{f.label}</div><div style={{fontSize:".75rem",color:"var(--muted)",marginTop:2}}>{f.desc}</div></div>)}</div><div className="slbl">Pairing Methods</div><div className="card">{PAIRING_METHODS.map(m=><div key={m.value} style={{padding:"12px 16px",borderBottom:"1px solid var(--border)"}}><div style={{fontWeight:800}}>{m.icon} {m.label}</div><div style={{fontSize:".75rem",color:"var(--muted)",marginTop:2}}>{m.desc}</div></div>)}</div></div>;}

// ─── RBAC ─────────────────────────────────────────────────────────────────────
const ROLE_CAPS={
  admin:   {pages:["tournaments","leaderboard","dashboard","golfers","teams","courses","users","sidematches","league","formats"],label:"Admin",   color:"#166534",bg:"#dcfce7"},
  director:{pages:["tournaments","leaderboard","dashboard","teams","courses","sidematches","league","formats"],                   label:"Director",color:"#1e40af",bg:"#dbeafe"},
  golfer:  {pages:["leaderboard","sidematches"],                                                                                  label:"Golfer",  color:"#92400e",bg:"#fef9c3"},
};
const ALL_NAV=[
  {id:"tournaments",icon:"📅",label:"Events",  primary:true, roles:["admin","director"]},
  {id:"leaderboard",icon:"🏆",label:"Leaders", primary:true, roles:["admin","director","golfer"]},
  {id:"dashboard",  icon:"🏠",label:"Home",    primary:false,roles:["admin","director"]},
  {id:"golfers",    icon:"🏌️",label:"Golfers", primary:false,roles:["admin","director"]},
  {id:"teams",      icon:"🏫",label:"Teams",   primary:false,roles:["admin","director"]},
  {id:"courses",    icon:"⛳",label:"Courses", primary:false,roles:["admin","director"]},
  {id:"users",      icon:"👥",label:"Users",   primary:false,roles:["admin"]},
  {id:"sidematches",icon:"🎯",label:"Side Games",primary:false,roles:["admin","director","golfer"]},
  {id:"league",     icon:"📆",label:"League",  primary:false,roles:["admin","director"]},
  {id:"formats",    icon:"📋",label:"Formats", primary:false,roles:["admin","director"]},
];
const TITLES={tournaments:"Tournaments",leaderboard:"Leaderboard",dashboard:"Dashboard",golfers:"Golfers",teams:"Teams",courses:"Courses",users:"Users",sidematches:"Side Games",league:"League",formats:"Formats"};

// ─── Seed version guard ────────────────────────────────────────────────────────
const SEED_VERSION="v2026-04-20";
if(typeof window!=="undefined"){
  if(localStorage.getItem("dg:seedVersion")!==SEED_VERSION){
    ["dg:golfers","dg:tournaments"].forEach(k=>localStorage.removeItem(k));
    localStorage.setItem("dg:seedVersion",SEED_VERSION);
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [users,      setUsers]      =useState(()=>load(SK.users,      USERS_SEED));
  const [golfers,    setGolfers]    =useState(()=>load(SK.golfers,    GOLFERS_SEED));
  const [teams,      setTeams]      =useState(()=>load(SK.teams,      SCHOOLS_SEED));
  const [tournaments,setTournaments]=useState(()=>{
    const saved=load(SK.tournaments,TOURNAMENTS_SEED);
    return saved.map(t=>{const seed=TOURNAMENTS_SEED.find(s=>s.id===t.id);if(seed?.scores&&Object.keys(seed.scores).length>0)return{...t,scores:seed.scores};return t;});
  });
  const [courses,    setCourses]    =useState(()=>load(SK.courses,    COURSES_SEED));
  const [leagues,    setLeagues]    =useState(()=>load(SK.leagues||"dg:leagues",    []));
  const [currentUser,setCU]         =useState(null);
  const [page,       setPage]       =useState("tournaments");
  const [showMore,   setShowMore]   =useState(false);
  const [activeTid,  setActiveTid]  =useState(null);

  const mkSetter=(setter,key)=>useCallback((valOrFn)=>{setter(prev=>{const next=typeof valOrFn==="function"?valOrFn(prev):valOrFn;store(key,next);return next;});},[]); // eslint-disable-line
  const wSetGolfers     =mkSetter(setGolfers,    SK.golfers);
  const wSetTeams       =mkSetter(setTeams,      SK.teams);
  const wSetTournaments =mkSetter(setTournaments,SK.tournaments);
  const wSetCourses     =mkSetter(setCourses,    SK.courses);
  const wSetUsers       =mkSetter(setUsers,      SK.users);

  function login(user){setCU(user);setPage("tournaments");}
  function logout(){setCU(null);setPage("tournaments");setShowMore(false);}
  function nav(p){setPage(p);setShowMore(false);}

  if(!currentUser)return<><style>{CSS}</style><LoginScreen users={users} onLogin={login}/></>;

  const roleCap=ROLE_CAPS[currentUser.role]||ROLE_CAPS.golfer;
  const accessIds=roleCap.pages;
  const activePage=accessIds.includes(page)?page:(accessIds[0]||"leaderboard");
  const tabItems=ALL_NAV.filter(n=>n.primary&&n.roles.includes(currentUser.role)&&accessIds.includes(n.id));
  const moreItems=ALL_NAV.filter(n=>!n.primary&&n.roles.includes(currentUser.role));

  return(
    <>
      <style>{CSS}</style>
      <div className="app">
        <div className="hdr">
          <div className="hdr-logo">⛳ Turnee Golf</div>
          <div style={{fontWeight:800,fontSize:".78rem",color:"rgba(255,255,255,.6)",letterSpacing:"1px",textTransform:"uppercase"}}>{TITLES[activePage]||""}</div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span className="badge" style={{background:roleCap.bg,color:roleCap.color,fontSize:".6rem"}}>{roleCap.label}</span>
            <button onClick={logout} style={{background:"rgba(255,255,255,.1)",border:"none",borderRadius:7,padding:"5px 10px",color:"rgba(255,255,255,.7)",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:".72rem",cursor:"pointer"}}>{currentUser.name.split(" ")[0]} ↩</button>
          </div>
        </div>

        <div className="scroll">
          {activePage==="tournaments" &&<TournamentsPage tournaments={tournaments} setTournaments={wSetTournaments} courses={courses} teams={teams} golfers={golfers} setGolfers={wSetGolfers} activeTid={activeTid} setActiveTid={setActiveTid}/>}
          {activePage==="leaderboard" &&<LeaderboardPage golfers={golfers} tournaments={tournaments} courses={courses} activeTid={activeTid}/>}
          {activePage==="dashboard"   &&<Dashboard golfers={golfers} tournaments={tournaments} teams={teams}/>}
          {activePage==="golfers"     &&<GolfersPage golfers={golfers} setGolfers={wSetGolfers} teams={teams} setTournaments={wSetTournaments}/>}
          {activePage==="teams"       &&<TeamsPage golfers={golfers} teams={teams} setTeams={wSetTeams}/>}
          {activePage==="courses"     &&<CoursesPage courses={courses} setCourses={wSetCourses}/>}
          {activePage==="users"       &&<UsersPage users={users} setUsers={wSetUsers} courses={courses}/>}
          {activePage==="sidematches" &&<SideMatchesPage/>}
          {activePage==="league"      &&<LeaguePage leagues={leagues} setLeagues={setLeagues} tournaments={tournaments}/>}
          {activePage==="formats"     &&<FormatsPage/>}
        </div>

        {showMore&&<>
          <div className="more-bd" onClick={()=>setShowMore(false)}/>
          <div className="more-menu" style={{overflowY:"auto",maxHeight:"70vh"}}>
            {moreItems.map(item=><div key={item.id} className={`more-item${activePage===item.id?" on":""}`} onClick={()=>nav(item.id)}><span className="more-ico">{item.icon}</span><span>{item.label}</span></div>)}
            <div style={{borderTop:"1px solid var(--border)",padding:"13px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,color:"var(--red)",fontWeight:700}} onClick={logout}><span className="more-ico">↩</span><span>Sign Out ({currentUser.name.split(" ")[0]})</span></div>
          </div>
        </>}

        <div className="tabbar">
          {tabItems.map(tab=>(
            <button key={tab.id} className={`tab-btn${activePage===tab.id?" on":""}`} onClick={()=>nav(tab.id)}>
              <span className="tab-ico">{tab.icon}</span><span className="tab-lbl">{tab.label}</span>
            </button>
          ))}
          {moreItems.length>0&&<button className={`tab-btn${showMore?" on":""}`} onClick={()=>setShowMore(p=>!p)}><span className="tab-ico">☰</span><span className="tab-lbl">More</span></button>}
        </div>
      </div>
    </>
  );
}
