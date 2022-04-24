# Mrksman

Its been a long ass while since I've made a post to this godforsaken blog. Mainly cause I didn't have anything to post about. I still dont have anything to post about persay. But I thought to myself that I cannot let this shitty site become another one of my forgotten projects. By which I mean I cannot let it die like half my other projects. 

Therefore in this post im gonna talk about **Mrksman**. Mrksman is the latest Discord bot that I made. The main gist of the bot is that it saves the most recently edited or deleted message. The bot can save deleted attachments too. But only the first one in the case that there was a group attachment send. I wanna essentially detail the process through which i pulled this shit off. 

## The Basics
So the TLDR of the bot is that it saves the most recently deleted or edited message in a JSON file. Discord JS has events which fire in the case of a `messageUpdate` (Message Edit) or `messageDelete` (Self Explanatory) like so.

```js
client.on('messageUpdate', (oldMessage, newMessage) => {
  console.log({ old: oldMessage, new: newMessage });
});

client.on('messageDelete', (message) => {
  console.log(message);
})
```

Instead of logging those objects my code just stringifies that shit and writes it a json file. And like you can see where im going with this. When a new message gets edited or deleted the old data just gets rewritten. 

## Attachments
In order to save the attachments I used a module called `download`. Essentially how it works is that when a message is deleted. My code checks the attachments collection which is a param in the `message` object provided by Discord JS. In the case that the collection contains a value my bot just downloads the first attachment. Now I could manage a way to save all of the attachments but Im too lazy so I decided that I will do that later (yeah fuck that i wont). 

```js
client.on("messageDelete", async (message) => {

  fs.readdir("./temp/attachments", (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join("./temp/attachments", file), (err) => {
        if (err) throw err;
      });
    }
  });

  if (message.attachments.first()) {
    await download(message.attachments.first().url, "./temp/attachments");
  }

  fs.writeFile("./temp/delete.json", JSON.stringify(message), "utf-8", () => {
    console.log("\x1b[31m", "DELETE Detected and Cached");
  });

});
```

Thats literally all the code that I use to save the deleted message. As you can see I clear the `attachments` directory before i save the new deleted attachment. It works the same as overwriting the old JSON data. 

I didnt implement anything related to attachments in the edit part. The code behind the edit part of my bot is boring so I wont talk about that.

## Its always the dates
Yeah so the `message` object returned by the event had a certain property called `createdTimestamp`. The timestamp is  in [UNIX EPOCH](https://en.wikipedia.org/wiki/Unix_time). Now theres nothing wrong with that and like you can convert epoch time to normal date time very easily. The issue lied in the fact that unix epoch is calculated as the number of seconds since 1970. You can convert into milliseconds by just multiplying it with a 1000 and put that into a `Date()` to get the current date. The thing is discord already fucking multiplied it stock. I did not have to multiply it. 

The thing was. I didnt know that. Which meant I kept getting the wrong fucking time. I spend 6 hours trying to fix that shit. Only to notice the fact that discord already multiplied it. 


## Firends
My friends somehow managed to break the bot on countless occaisions. But its getting late and I dont wanna type anymore. Im gonna end the post right here. If you read upto this point. Get a life.

*(PS: ignore any grammatical or spelling mistakes, I was too lazy to spellcheck.)*