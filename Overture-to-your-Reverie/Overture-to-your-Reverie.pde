/*
Overture to your Reverie
Saskia Freeke
2021

Github Bellevue Mural

Created with Processing
*/


/* variables */
int count;
Shp[] shps;
color[] palette = {#857fbc,#736cb2,#348aa7,#53adca,#ffc53f,#FCDD95};
int[] shapes = {1,2,3};

void setup(){
  size(4126,1246);
  noStroke();
  rectMode(CENTER);
  strokeCap(ROUND);
  strokeJoin(ROUND);

  count = 580;
  shps = new Shp[count];

  int index = 0;
  for (int i = 0; i < count; i++){
      shps[index++] = new Shp(i);
  }
}


void draw(){
  background(#E8E7EB);

  for (int i = 0; i < count; i++){
    shps[i].display();
  }

}



void keyPressed() {
  if (key == 'r'){
    for (int i = 0; i < count; i++){
      shps[i].reset();
    }
  }
}


class Shp{

  int dim, dimS;
  float grid_x, grid_y;
  float grid_size, grid_space;
  int num_shape, ns;
  int num_color,rot;
  int nPos;
  color strokeCol;

  Shp(float _num){
    /* grid setup */
    reset();
    }

  void reset(){

    // Position of the shapes
    nPos = int(random(1,3));

    if (nPos == 1){
      grid_x = (-20+((int)random(1,13)*320));
      grid_y = (-20+((int)random(1,4)*320));
    } else {
      grid_x = (140+((int)random(1,12)*320));
      grid_y = (140+((int)random(1,3)*320));
    }


    grid_size = ((int)random(1,1))*50;
    grid_space = ((int)random(1,10))*50;
    dim = ((int)random(1,3)*25);
    dimS = ((int)random(1,1)*3);
    ns = ((int)random(shapes.length));
    num_shape = shapes[ns];
    rot = int(random(1,5));
    num_color = ((int)random(palette.length));
    strokeCol = #000000;
  }

  void display(){
    pushMatrix();
    translate(grid_x,grid_y);

    float n_grid_size = (grid_size/2);

    rotate(radians((180*rot)));
    rotate(radians(-45));

    for (float x = -n_grid_size; x <= n_grid_size; x += grid_space){
      for (float y = -n_grid_size; y <= n_grid_size; y += grid_space){

        /* fill & strokes */
          fill(palette[num_color]);
          strokeWeight(dimS);
          stroke(strokeCol);
          rectMode(CENTER);
          strokeCap(ROUND);
          strokeJoin(ROUND);

        if (num_shape == 1){

          pushMatrix();
          translate(x,y);
          rotate((radians(90))*rot);
          beginShape();
          vertex(0-dim,0-dim);
          vertex(0,0-dim);
          vertex(0,0);
          vertex(0-dim,0);
          endShape(CLOSE);
          popMatrix();

        } else if (num_shape == 2){

          pushMatrix();
          translate(x,y);

          beginShape();
          vertex(0, 0);
          vertex(0+dim, 0+dim);
          vertex(0-dim, 0+dim);
          endShape(CLOSE);

          popMatrix();

        } else if (num_shape == 3){

          pushMatrix();
          translate(x,y);

          beginShape();
          vertex(0,0-dim);
          vertex(0+dim,0);
          vertex(0,0+dim);
          endShape(CLOSE);

          popMatrix();

        }

      }
    }
    popMatrix();

  }
}
