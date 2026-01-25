# ACTIVITY 1

- This is **Activity 1** ...

## Ordered List
1. Apples
     1. red
     2. yellow
     3. green
2. Bananas
3. Oranges
   1. Indented Item 1
   2. Indented Item 2
   3. Indented Item 3
4. Item 4

- [google](https://google.com/)
- [Grand Canyon University](https://www.gcu.edu/)

![America's Flagship Seal](https://gitlab.com/bobby.estey/wikibob/-/raw/master/docs/icons/cv64AmericasFlagShip100x100.png)
![America's Flagship Seal](https://gitlab.com/bobby.estey/wikibob/-/raw/master/docs/icons/cv64AmericasFlagShip100x100.png "America's Flag Ship")

## Tables
|First Name|Last Name|
|--|--|
|John|Doe|
|Jane|Doe|


```java
// Java Example
public class CodeBlock {
    public static void main(String[] args) {
        System.out.println("Code Block Example");
    }
}
```

```mermaid
---
title: MermaidJS - Class Diagram - Animal example
---
classDiagram
    note "From Duck till Zebra"
    Animal <|-- Duck
    note for Duck "can fly\ncan swim\ncan dive\ncan help in debugging"
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat()
    }
    class Zebra{
        +bool is_wild
        +run()
    }
```