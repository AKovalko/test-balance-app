Requirements: 
- Node 22
- Postgres 13 and higher
- PNPM 10

How to run:
- pnpm install
- mv .env.example .env  // configure .env file
- pnpm run start

curl  -X POST \
  'http://localhost:3000/users/1' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client' \
  --header 'Content-Type: application/json' \
  --data-raw '{
   "amount": -2
}'