# MASTERSINDIA_INTERN_2025
### Working with REDDIS 
![image](https://github.com/user-attachments/assets/ed7386cf-7eba-4445-b016-7df5a5dd6cc0)
![image](https://github.com/user-attachments/assets/34ee0242-7057-4f38-99c0-9fbf83b199ca)
![image](https://github.com/user-attachments/assets/826ea04f-ae65-40aa-b2b9-52689b8790bb)


### performing crud operation using reddis (JUST SAMPLE AND LEARNINGS)
## NOT THE DATA OF COMPANY!!!
#### 1)POST (Create user)
Method: POST

URL: http://localhost:3000/user/1

![image](https://github.com/user-attachments/assets/b46417e6-156e-47be-bfda-23ec0133236c)
#### 2) GET (READ USER)
Read User (GET)
Method: GET

URL: http://localhost:3000/user/1
![image](https://github.com/user-attachments/assets/79d19faf-e07a-4e48-ac3f-eacbb975b0da)
#### 3) PUT (UPDATE USER)
Update User (PUT)
Method: PUT

URL: http://localhost:3000/user/1
![image](https://github.com/user-attachments/assets/946d37b5-8077-41e7-869e-1d9eab452471)
#### 4) Delete User (DELETE USER)
Method: DELETE

URL: http://localhost:3000/user/1
![image](https://github.com/user-attachments/assets/da76e13c-e32d-42b6-8a4d-2d2638cef1d8)


-Now, user deleted<br>
![image](https://github.com/user-attachments/assets/0629be5c-dcdd-4c75-9df2-60fe9314974e)



## In reference to New.js,
PROBLEM :- 
You have a list of IDs (["a", "b", "d"]) stored in Redis

That list is also stored in memory in your code (like a variable)

You want to add new IDs via an API — it will go to Redis only

Every 1 minute, your code should sync from Redis to the code's memory using a cron job

### 🔄 Redis-Based ID Cache with Auto-Sync via Cron
This Node.js application manages a list of IDs stored in Redis and automatically syncs it with an in-memory cache in the code every 1 minute using a cron job.

#### ✨ Features
🚀 REST API to add new IDs to Redis (POST /add-id)

🔍 Endpoint to fetch in-memory cached IDs (GET /ids)

🔁 Auto-refreshes in-memory list from Redis every 1 minute via node-cron

🧠 In-memory caching improves performance and avoids unnecessary Redis reads

#### 🛠 Tech Stack
Node.js

Express

async-redis

node-cron

Redis (as cache DB)

#### 🧪 Sample Flow
###### Redis pre-populated with ["a", "b", "d"]

![image](https://github.com/user-attachments/assets/1a1e981a-0ce1-4452-a08e-07b730fcbbb7)


###### New ID ("c") added via API

![image](https://github.com/user-attachments/assets/6b4fc506-7ef1-4953-b1e3-bbd27f73c238)


###### After 1 minute, cron job updates in-memory list to ["a", "b", "d", "c"]

![image](https://github.com/user-attachments/assets/a0cbeeaa-7689-4bc6-8f79-cdbd8de8054c)
