# key-emit
This module is primarily developed for easy-to-use key handling in electron or nw.  It handles creates node.js event emitters for the key down, key up, and key press events and reformats the events so you can listen specifically for certain keys.  

The module also turns all key events into easier to digest/remember key strings, using a familiar format.   Basically, it removed some of the annoyances of dealing with key codes...

# Examples
The module returns a constructor that takes the dom element to listen on for key events.

```js
ke = require('key-emit')(document);
```

## Responding to key press events

Key press events can be captured using standard printable strings.  So if you want to register a handler for the ! character, you just do this:

```js
ke.pressed.on('!', function() {
    console.log("Pressed -> Hurrary!");
});
```

Upper and lower case letters are distinct:

```js
ke.pressed.on('A', function() {
	console.log("Capital A");
})
ke.pressed.on('a', function(){
	console.log("Lower case a");
})
```

See the listings of character string below for details about special characters.

## Responding to key down and up events
There is literally no difference when using key down and key up events, however there are more events fired (for instance, the Ctrl key doesn't generate a key press, but it does generate and up/down event).

** Note - you don't need to worry about character codes or anything like that...**  In addition, it does away with the differences between keys that really print the same.  For example, the `+` sign will always generate the '+' event, no matter if it is the result of the number pad key or the shift+= key.  Same with upper/lower case as well.

```js
ke.down.on('!', function() {
    console.log("Down -> Hurrary!");
});
ke.up.on('A', function() {
	console.log("Capital A released");
})
ke.up.on('a', function(){
	console.log("Lower case a released");
})
```

## Special Characters

The following are a list of events that can be listened for on the down/up/pressed event emitters.  You just register handlers for these strings - no mess no fuss.  Your event handler will be called no matter how the user managed to enter the character.

```
backspace
tab
enter
shift
ctrl
alt
pause/break
capslock
escape
space
pageup
pagedown
end
home
left
up
right
down
insert
delete
leftwindow
rightwindow
select
numlock
scrolllock
f1
f2
f3
f4
f5
f6
f7
f8
f9
f10
f11
f12
0
1
2
3
4
5
6
7
8
9
a
b
c
d
e
f
g
h
i
j
k
l
m
n
o
p
q
r
s
t
u
v
w
x
y
z
A
B
C
D
E
F
G
H
I
J
K
L
M
N
O
P
Q
R
S
T
U
V
W
X
Y
Z
*
+
-
.
/
:
<
_
>
?
~
{
|
}
\
;
=
,
`
[
]
'
)
!
@
#
$
%
^
&
(
```