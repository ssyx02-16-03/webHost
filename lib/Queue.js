/*

Queue.js

A function to represent a queue

Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode


EDIT: modified for NodeJS /Oskar
*/

/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */
define([], function(){
    //static vars goes here
    return function Queue(){
    // initialise the queue and offset
      var queue  = [];
      var offset = 0;
      // Returns the length of the queue.
      function getLength(){
        return (queue.length - offset);
      }

      // Returns true if the queue is empty, and false otherwise.
      function isEmpty(){
        return (queue.length == 0);
      }

      /* Enqueues the specified item. The parameter is:
       *
       * item - the item to enqueue
       */
      function enqueue(item){
        queue.push(item);
      }

      /* Dequeues an item and returns it. If the queue is empty, the value
       * 'undefined' is returned.
       */
      function dequeue(){
        // if the queue is empty, return immediately
        if (queue.length == 0) return undefined;

        // store the item at the front of the queue
        var item = queue[offset];

        // increment the offset and remove the free space if necessary
        if (++ offset * 2 >= queue.length){
          queue  = queue.slice(offset);
          offset = 0;
        }

        return item; // return the dequeued item
      }

      /* Returns the item at the front of the queue (without dequeuing it). If the
       * queue is empty then undefined is returned.
       */
      function peek(){
        return (queue.length > 0 ? queue[offset] : undefined);
      }

      return{ 
        Queue : Queue,
        isEmpty : isEmpty,
        enqueue : enqueue,
        dequeue : dequeue,
        peek : peek
      };
  };//QUEUE instance

});
