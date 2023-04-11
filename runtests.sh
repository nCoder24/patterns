for FILE in $(ls test)
do
  node "test/$FILE"
done
