go get github.com/lib/pq

cd C:\Program Files\PostgreSQL\pg11\bin
createuser.exe --createdb --username postgres --no-createrole --pwprompt mopack.chiou
createdb chitchat
cd C:\Users\mopack.chiou\Desktop\Code\GoWeb\chitchat\data
psql -f C:\GitHub\ChatRoomProgram\HW1\DBSetting\setup.sql -d chitchat
