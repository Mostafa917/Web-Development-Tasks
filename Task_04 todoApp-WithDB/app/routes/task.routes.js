const task = require("../controller/taskController");
const router = require("express").Router();

router.get("/",task.main);
router.get("/singleTask/:id",task.single);


router.get("/addTask",task.add);
router.post("/addPost",task.addPost);

router.get("/del/:id",task.del);
router.get("/delAll",task.delAll);

router.get("/status/:id",task.changeActiveStatus);
router.get("/completeStatus/:id",task.completeStatus);

router.get("/search/",task.search);
router.get("/searchLogic/",task.searchLogic);

router.get("/editTask/:id",task.edit);
router.get("/editLogic/:id",task.editLogic);

module.exports=router;
